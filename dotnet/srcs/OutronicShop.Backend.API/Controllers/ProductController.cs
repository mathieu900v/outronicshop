using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Category;
using OutronicShop.Backend.Database.Product;
using OutronicShop.Backend.Domain.Brand;
using OutronicShop.Backend.Domain.Category;
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
        private readonly ICategoryDao _categoryDao;
        private readonly IBrandDao _brandDao;
        
        public ProductController(IProductDao productDao, ICategoryDao categoryDao, IBrandDao brandDao)
        {
            _productDao = productDao;
            _categoryDao = categoryDao;
            _brandDao = brandDao;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductDto>>> GetProductsAsync()
        {
            return Ok(await _productDao.GetAllAsync());
        }
        
        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<ProductDto>> CreateProductAsync([FromBody] ProductCreationForm form)
        {
            if (string.IsNullOrEmpty(form.Sku))
            {
                return BadRequest("SKU can't be empty");
            }
            ProductDto productDto = await _productDao.GetProductBySkuAsync(form.Sku);
            if (productDto != null)
            {
                return BadRequest("Product SKU already exist");
            }
            BrandDto brandDto = await _brandDao.GetByIdAsync(form.BrandId);
            if (brandDto == null)
            {
                return BadRequest("Brand ID doesn't exist");
            }
            CategoryDto categoryDto = await _categoryDao.GetByIdAsync(form.CategoryId);
            if (categoryDto == null)
            {
                return BadRequest("Category ID doesn't exist");
            }

            var test = await _productDao.SaveAsync(form.Adapt<ProductDto>());
            return Created(Request.GetDisplayUrl(), test);
        }
        
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteProductAsync([FromBody] ProductDeletionForm form)
        {
            ProductDto productDto = await _productDao.GetProductBySkuAsync(form.Sku);
            if (productDto == null)
            {
                return NotFound("Product SKU doesn't exist");
            }

            await _productDao.DeleteByIdAsync(productDto.Id);
            return Ok("Product has been deleted");
        }
        
        [HttpGet("count")]
        public async Task<ActionResult<CountModel>> CountProductsAsync()
        {
            return Ok(new CountModel
            {
                Count = await _productDao.CountAsync()
            });
        }
        [HttpPatch("update")]
        public async Task<ActionResult<ProductDto>> UpdateProductAsync([FromBody] ProductUpdateForm form)
        {
            ProductDto productDto = await _productDao.GetByIdAsync(form.Id);
            if (productDto == null)
            {
                return NotFound("Product ID doesn't exist");
            }

            if (string.IsNullOrEmpty(form.Sku))
            {
                return BadRequest("SKU can't be empty");
            }
            productDto = await _productDao.GetProductBySkuAsync(form.Sku);
            if (productDto != null && productDto.Sku != form.Sku)
            {
                return BadRequest("SKU already exists");
            }
            if (string.IsNullOrEmpty(form.Description))
            {
                return BadRequest("Description can't be empty");
            }

            return Ok(await _productDao.SaveAsync(form.Adapt<ProductDto>()));
        }
    }
}