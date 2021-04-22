using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Category;
using OutronicShop.Backend.Domain.Category;
using OutronicShop.Backend.Models.Category;

namespace OutronicShop.Backend.API.Controllers
{
    [Route("api/category")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryDao _categoryDao;
        public CategoryController(ICategoryDao categoryDao)
        {
            _categoryDao = categoryDao;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategorysAsync()
        {
            return Ok(await _categoryDao.GetAllAsync());
        }

        [HttpPost("create")]
        public async Task<ActionResult<CategoryDto>> CreateCategoryAsync([FromBody] CategoryCreationForm form)
        {
            CategoryDto categoryDto = await _categoryDao.GetCategoryByNameAsync(form.Title);
            if (categoryDto != null)
            {
                return BadRequest("Category title already exist");
            }

            return Ok(await _categoryDao.SaveAsync(form.Adapt<CategoryDto>()));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteCategoryAsync([FromBody] CategoryDeletionForm form)
        {
            CategoryDto categoryDto = await _categoryDao.GetCategoryByNameAsync(form.Title);
            if (categoryDto == null)
            {
                return NotFound("Category title doesn't exist");
            }

            await _categoryDao.DeleteByIdAsync(categoryDto.Id);
            return Ok("Category has been deleted");
        }
    }
}