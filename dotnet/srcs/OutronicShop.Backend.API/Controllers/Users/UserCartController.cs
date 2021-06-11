using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Cart;
using OutronicShop.Backend.Database.Product;
using OutronicShop.Backend.Domain.Cart;
using OutronicShop.Backend.Domain.Product;
using OutronicShop.Backend.Models.Cart;

namespace OutronicShop.Backend.API.Controllers.Users
{
    [Route("users/cart")]
    [ApiController]
    public class UserCartController : ControllerBase
    {
        private static readonly SemaphoreSlim Semaphore = new(1);
        private readonly ICartDao _cartDao;
        private readonly IProductDao _productDao;
        private readonly ILogger<UserCartController> _logger;
        public UserCartController(ICartDao cartDao, IProductDao productDao, ILogger<UserCartController> logger)
        {
            _cartDao = cartDao;
            _productDao = productDao;
            _logger = logger;
        }
        

        [HttpGet("{accountId:guid}")]
        public async Task<ActionResult<CartDto>> GetCartByAccountIdAsync([FromQuery]Guid accountId)
        {
            if (string.IsNullOrWhiteSpace(Request.QueryString.Value))
            {
                return BadRequest("Query is invalid");
            }
            CartDto cartDto = await _cartDao.GetByAccountIdAsync(accountId);
            if (cartDto != null)
            {
                cartDto = await _cartDao.SaveAsync(new CartDto
                {
                    AccountId = accountId,
                    Content = new List<(ProductDto Product, int Quantity)>()
                });
            }

            return Ok(cartDto);
        }

        [HttpPatch]
        public async Task<ActionResult<CartDto>> AddProductsToCartAsync([FromBody] AddProductToCartForm form)
        {
            CartDto cartDto = await _cartDao.GetByIdAsync(form.CartId);
            if (cartDto == null)
            {
                return BadRequest("CartId is invalid");
            }

            ProductDto productDto = await _productDao.GetByIdAsync(form.ProductId);
            if (productDto == null)
            {
                return BadRequest("ProductId is invalid");
            }
            if (form.Quantity <= 0)
            {
                return BadRequest("Quantity can not be under 1");
            }

            try
            {
                await Semaphore.WaitAsync();
                var content = cartDto.Content.Find(x => x.Product == productDto);
                if (content != default(ValueTuple<ProductDto, int>))
                {
                    content.Quantity += form.Quantity;
                    cartDto.Content.RemoveAll(x => x.Product == productDto);
                    cartDto.Content.Add((productDto, content.Quantity));
                }
                else
                {
                    cartDto.Content.Add((productDto, form.Quantity));
                }

                await _cartDao.SaveAsync(cartDto);
                return Ok(cartDto);
            }
            catch (Exception e)
            {
                _logger.LogError($"[{nameof(AddProductsToCartAsync)}] {e.Message}");
                throw;
            }
            finally
            {
                Semaphore.Release();
            }
            
        }
    }
}