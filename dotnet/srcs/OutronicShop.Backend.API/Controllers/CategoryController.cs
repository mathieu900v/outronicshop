using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Mapster;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.AspNetCore.Mvc;
using OutronicShop.Backend.Database.Category;
using OutronicShop.Backend.Domain.Category;
using OutronicShop.Backend.Models.Category;
using OutronicShop.Backend.Models.Generic;

namespace OutronicShop.Backend.API.Controllers
{
    [Route("api/categories")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryDao _categoryDao;
        public CategoryController(ICategoryDao categoryDao)
        {
            _categoryDao = categoryDao;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategoriesAsync([FromQuery] CategoryRequestQuery query)
        {
            var tmp = await _categoryDao.GetAllCategoriesByQueriesAsync(query);
            return Ok(tmp);
        }

        [HttpPost("create")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        public async Task<ActionResult<CategoryDto>> CreateCategoryAsync([FromBody] CategoryCreationForm form)
        {
            if (string.IsNullOrWhiteSpace(form.Description) || string.IsNullOrWhiteSpace(form.Title))
            {
                return BadRequest("Fields can't be empty");
            }

            CategoryDto categoryById = await _categoryDao.GetByIdAsync(form.IdParent);
            if (form.IdParent != Guid.Empty && categoryById == null)
            {
                return NotFound("Category ID does not exist");
            }
            CategoryDto categoryDto = await _categoryDao.GetCategoryByNameAsync(form.Title);
            if (categoryDto != null)
            {
                return BadRequest("Category title already exist");
            }

            return Created(Request.GetDisplayUrl(), await _categoryDao.SaveAsync(form.Adapt<CategoryDto>()));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteCategoryAsync([FromBody] CategoryDeletionForm form)
        {
            CategoryDto categoryDto = await _categoryDao.GetByIdAsync(form.Id);
            if (categoryDto == null)
            {
                return NotFound("Category ID doesn't exist");
            }

            await _categoryDao.DeleteByIdAsync(categoryDto.Id);
            return Ok("Category has been deleted");
        }
        
        [HttpGet("count")]
        public async Task<ActionResult<CountModel>> CountCategoriesAsync()
        {
            return Ok(new CountModel
            {
                Count = await _categoryDao.CountAsync()
            });
        }
        [HttpPatch("update")]
        public async Task<ActionResult<CategoryDto>> UpdateCategoryAsync([FromBody] CategoryUpdateForm form)
        {
            CategoryDto categoryDto = await _categoryDao.GetByIdAsync(form.Id);
            if (categoryDto == null)
            {
                return NotFound("Category ID doesn't exist");
            }

            if (string.IsNullOrEmpty(form.Title))
            {
                return BadRequest("Title can't be empty");
            }
            categoryDto = await _categoryDao.GetCategoryByNameAsync(form.Title);
            if (categoryDto != null && categoryDto.Id != form.Id)
            {
                return BadRequest("Brand Title already exists");
            }
            if (string.IsNullOrEmpty(form.Description))
            {
                return BadRequest("Description can't be empty");
            }

            return Ok(await _categoryDao.SaveAsync(form.Adapt<CategoryDto>()));
        }
    }
}