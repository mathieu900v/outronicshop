﻿using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Category;
using OutronicShop.Backend.Database.Product;
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
        public async Task<ActionResult<ProductDto>> CreateProductAsync([FromBody] ProductForms.ProductCreationForm form)
        {
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
            ProductDto productDto = await _productDao.GetProductBySkuAsync(form.Sku);
            if (productDto != null)
            {
                return BadRequest("Product Sku already exist");
            }

            var test = await _productDao.SaveAsync(form.Adapt<ProductDto>());
            return Ok(test);
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