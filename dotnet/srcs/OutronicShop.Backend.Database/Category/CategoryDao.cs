using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Category;

namespace OutronicShop.Backend.Database.Category
{
    public class CategoryDao : ICategoryDao
    {
        private readonly IGenericMapper<CategoryEntity, CategoryDto> _mapper;
        private readonly IDbContextFactory<WebContext> _context;
        private readonly IGenericAsyncUuidRepository<CategoryDto> _repository;
        private readonly ILogger<CategoryDao> _logger;

        public CategoryDao(IGenericMapper<CategoryEntity, CategoryDto> mapper, IDbContextFactory<WebContext> context, IGenericAsyncUuidRepository<CategoryDto> repository, ILogger<CategoryDao> logger)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<CategoryDto> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<CategoryDto>> GetByIdsAsync(IEnumerable<Guid> ids) => await _repository.GetByIdsAsync(ids);
        public async Task<CategoryDto> SaveAsync(CategoryDto obj) => await _repository.SaveAsync(obj);
        public async Task<IEnumerable<CategoryDto>> SaveAsync(IReadOnlyList<CategoryDto> objs) => await _repository.SaveAsync(objs);
        public async Task DeleteByIdAsync(Guid id) => await _repository.DeleteByIdAsync(id);
        public async Task DeleteByIdsAsync(IEnumerable<Guid> ids) => await _repository.DeleteByIdsAsync(ids);
        
        //Relations
        public async Task<CategoryDto> GetCategoryByNameAsync(string name)
        {
            try
            {
                await using WebContext context = _context.CreateDbContext();
                var tmp = await context.Categories.FirstOrDefaultAsync(x => x.Title.ToLower().Equals(name.ToLower()));
                return _mapper.Map(tmp);
            }
            catch (Exception e)
            {
                _logger.LogDebug($"[GetCategoryByNameAsync] {e.Message}");
                return null;
            }
        }
    }
}