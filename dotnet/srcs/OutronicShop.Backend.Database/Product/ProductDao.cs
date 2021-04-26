using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Product;

namespace OutronicShop.Backend.Database.Product
{
    public class ProductDao : IProductDao
    {
        private readonly IGenericMapper<ProductEntity, ProductDto> _mapper;
        private readonly IDbContextFactory<WebContext> _context;
        private readonly IGenericAsyncUuidRepository<ProductDto> _repository;
        private readonly ILogger<ProductDao> _logger;

        public ProductDao(IGenericMapper<ProductEntity, ProductDto> mapper, IDbContextFactory<WebContext> context, IGenericAsyncUuidRepository<ProductDto> repository, ILogger<ProductDao> logger)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _logger = logger;
        }

        public async Task<IEnumerable<ProductDto>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<ProductDto> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<ProductDto>> GetByIdsAsync(IEnumerable<Guid> ids) => await _repository.GetByIdsAsync(ids);
        public async Task<ProductDto> SaveAsync(ProductDto obj) => await _repository.SaveAsync(obj);
        public async Task<IEnumerable<ProductDto>> SaveAsync(IReadOnlyList<ProductDto> objs) => await _repository.SaveAsync(objs);
        public async Task DeleteByIdAsync(Guid id) => await _repository.DeleteByIdAsync(id);
        public async Task DeleteByIdsAsync(IEnumerable<Guid> ids) => await _repository.DeleteByIdsAsync(ids);
        
        //Relations a faire
        public async Task<ProductDto> GetProductBySkuAsync(string sku)
        {
            try
            {
                await using WebContext context = _context.CreateDbContext();
                var tmp = await context.Products.FirstOrDefaultAsync(x => x.Sku.ToLower().Equals(sku.ToLower()));
                return _mapper.Map(tmp);
            }
            catch (Exception e)
            {
                _logger.LogDebug($"[GetProductBySkuAsync] {e.Message}");
                return null;
            }
        }
    }
}