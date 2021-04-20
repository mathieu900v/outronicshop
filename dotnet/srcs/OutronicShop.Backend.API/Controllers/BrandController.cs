using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Models.Brand;

namespace OutronicShop.Backend.API.Controllers
{
    [Route("/api/brands")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<BrandModel>> GetBrandsAsync(Guid id)
        {
            return Ok(new BrandModel
            {
                Id = Guid.NewGuid(),
                ImgUrl = "wow",
                Name = "test"
            });
        }
    }
}