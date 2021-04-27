using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Product;
using OutronicShop.Backend.Database.Product;
using OutronicShop.Backend.Domain.Product;
using OutronicShop.Backend.Models.Generic;
using OutronicShop.Backend.Models.Product;

namespace OutronicShop.Backend.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductDao _productDao;
        public ProductController(IProductDao productDao)
        {
            _productDao = productDao;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsAsync()
        {
            return Ok(await _productDao.GetAllAsync());
        }
        
        [HttpPost("create")]
        public async Task<ActionResult<ProductDto>> CreateProductAsync([FromBody] ProductForms.ProductCreationForm form)
        {
            ProductDto productDto = await _productDao.GetProductBySkuAsync(form.Sku);
            if (productDto != null)
            {
                return BadRequest("Product Sku already exist");
            }

            return Ok(await _productDao.SaveAsync(form.Adapt<ProductDto>()));
        }
        
        [HttpGet("count")]
        public async Task<ActionResult<CountModel>> CountProductsAsync()
        {
            return Ok(new CountModel
            {
                Count = await _productDao.CountAsync()
            });
        }
    }
}