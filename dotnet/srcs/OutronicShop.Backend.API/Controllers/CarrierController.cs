using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Carrier;
using OutronicShop.Backend.Domain.Carrier;
using OutronicShop.Backend.Models.Carrier;
using OutronicShop.Backend.Models.Generic;

namespace OutronicShop.Backend.API.Controllers
{
    [Route("api/carriers")]
    [ApiController]
    public class CarrierController : ControllerBase
    {
        private readonly ICarrierDao _carrierDao;

        public CarrierController(ICarrierDao carrierDao)
        {
            _carrierDao = carrierDao;
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarrierDto>>> GetCarriersAsync()
        {
            return Ok(await _carrierDao.GetAllAsync());
        }
        
        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CarrierDto>> CreateCarrierAsync([FromBody] CarrierCreationForm form)
        {
            if (string.IsNullOrWhiteSpace(form.Title) || string.IsNullOrWhiteSpace(form.ImgUrl) ||string.IsNullOrWhiteSpace(form.Countries))
            {
                return BadRequest("Fields can't be empty");
            }

            return Created(Request.GetDisplayUrl(), await _carrierDao.SaveAsync(form.Adapt<CarrierDto>()));
        }
        
        [HttpPost("delete")]
        public async Task<IActionResult> DeleteCarrierAsync([FromBody] CarrierDeletionForm form)
        {
            CarrierDto carrierDto = await _carrierDao.GetByIdAsync(form.Id);
            if (carrierDto == null)
            {
                return NotFound("Carrier ID doesn't exist");
            }

            await _carrierDao.DeleteByIdAsync(carrierDto.Id);
            return Ok("Carrier has been deleted");
        }
        
        [HttpGet("count")]
        public async Task<ActionResult<CountModel>> CountCarriersAsync()
        {
            return Ok(new CountModel
            {
                Count = await _carrierDao.CountAsync()
            });
        }
        
        [HttpPatch("update")]
        public async Task<ActionResult<CarrierDto>> UpdateCategoryAsync([FromBody] CarrierUpdateForm form)
        {
            CarrierDto carrierDto = await _carrierDao.GetByIdAsync(form.Id);
            if (carrierDto == null)
            {
                return NotFound("Carrier ID doesn't exist");
            }

            if (string.IsNullOrWhiteSpace(form.Title) || string.IsNullOrWhiteSpace(form.ImgUrl) ||string.IsNullOrWhiteSpace(form.Countries))
            {
                return BadRequest("Fields can't be empty");
            }

            return Ok(await _carrierDao.SaveAsync(form.Adapt<CarrierDto>()));
        }
    }
}