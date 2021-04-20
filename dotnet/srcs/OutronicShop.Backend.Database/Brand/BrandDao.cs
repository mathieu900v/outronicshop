using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Brand;

namespace OutronicShop.Backend.Database.Brand
{
    public class BrandDao : IBrandDao
    {
        private readonly IGenericMapper<BrandEntity, BrandDto> _mapper;
        private readonly IDbContextFactory<WebContext> _context;
        private readonly IGenericAsyncUuidRepository<BrandDto> _repository;
        private readonly ILogger<BrandDao> _logger;

        public BrandDao(IGenericMapper<BrandEntity, BrandDto> mapper, IDbContextFactory<WebContext> context, IGenericAsyncUuidRepository<BrandDto> repository, ILogger<BrandDao> logger)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<BrandDto>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<BrandDto> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<BrandDto>> GetByIdsAsync(IEnumerable<Guid> ids) => await _repository.GetByIdsAsync(ids);
        public async Task<BrandDto> SaveAsync(BrandDto obj) => await _repository.SaveAsync(obj);
        public async Task<IEnumerable<BrandDto>> SaveAsync(IReadOnlyList<BrandDto> objs) => await _repository.SaveAsync(objs);
        public async Task DeleteByIdAsync(Guid id) => await _repository.DeleteByIdAsync(id);
        public async Task DeleteByIdsAsync(IEnumerable<Guid> ids) => await _repository.DeleteByIdsAsync(ids);

        //Tests et relations
        public async Task<BrandDto> GetBrandByNameAsync(string name)
        {
            try
            {
                await using WebContext context = _context.CreateDbContext();
                var tmp = await context.Brands.FirstOrDefaultAsync(x => x.Name.ToLower().Equals(name.ToLower()));
                return _mapper.Map(tmp);
            }
            catch (Exception e)
            {
                _logger.LogDebug($"[GetBrandByNameAsync] {e.Message}");
                return null;
            }
        }
    }
}