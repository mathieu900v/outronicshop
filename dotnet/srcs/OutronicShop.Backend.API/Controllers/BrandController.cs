using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Domain.Brand;
using OutronicShop.Backend.Models.Brand;
using OutronicShop.Backend.Models.Generic;

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
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<BrandDto>> CreateBrandAsync([FromBody] BrandCreationForm form)
        {
            if (string.IsNullOrWhiteSpace(form.Name) || string.IsNullOrWhiteSpace(form.ImgUrl))
            {
                return BadRequest("Fields can't be empty");
            }
            BrandDto brandDto = await _brandDao.GetBrandByNameAsync(form.Name);
            if (brandDto != null)
            {
                return BadRequest("Brand name already exist");
            }

            return Created(Request.GetDisplayUrl(), await _brandDao.SaveAsync(form.Adapt<BrandDto>()));
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

        [HttpGet("count")]
        public async Task<ActionResult<CountModel>> CountBrandsAsync()
        {
            return Ok(new CountModel
            {
                Count = await _brandDao.CountAsync()
            });
        }
        
        [HttpPatch("update")]
        public async Task<ActionResult<BrandDto>> UpdateBrandAsync([FromBody] BrandUpdateForm form)
        {
            BrandDto brandDto = await _brandDao.GetByIdAsync(form.Id);
            if (brandDto == null)
            {
                return NotFound("Brand ID doesn't exist");
            }

            if (string.IsNullOrEmpty(form.Name))
            {
                return BadRequest("Name can't be empty");
            }
            brandDto = await _brandDao.GetBrandByNameAsync(form.Name);
            if (brandDto != null && brandDto.Id != form.Id)
            {
                return BadRequest("Brand Name already exists");
            }
            if (string.IsNullOrEmpty(form.ImgUrl))
            {
                return BadRequest("ImgUrl can't be empty");
            }

            return Ok(await _brandDao.SaveAsync(form.Adapt<BrandDto>()));
        }
    }
}