using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Domain.Brand;
using OutronicShop.Backend.Models.Brand;

namespace OutronicShop.Backend.API.Controllers
{
    [Route("api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandDao _brandDao;
        public BrandController(IBrandDao brandDao)
        {
            _brandDao = brandDao;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BrandDto>>> GetBrandsAsync()
        {
            return Ok(await _brandDao.GetAllAsync());
        }

        [HttpPost("create")]
        public async Task<ActionResult<BrandDto>> CreateBrandAsync([FromBody] BrandCreationForm form)
        {
            BrandDto brandDto = await _brandDao.GetBrandByNameAsync(form.Name);
            if (brandDto != null)
            {
                return BadRequest("Brand name already exist");
            }

            return Ok(await _brandDao.SaveAsync(form.Adapt<BrandDto>()));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteBrandAsync([FromBody] BrandDeletionForm form)
        {
            BrandDto brandDto = await _brandDao.GetByIdAsync(form.Id);
            if (brandDto == null)
            {
                return NotFound("Brand ID doesn't exist");
            }

            await _brandDao.DeleteByIdAsync(brandDto.Id);
            return Ok("Brand has been deleted");
        }
    }
}