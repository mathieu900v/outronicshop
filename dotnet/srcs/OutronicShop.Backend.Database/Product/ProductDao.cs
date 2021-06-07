using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Product;
using OutronicShop.Backend.Models.Product;

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
        public async Task<int> CountAsync() => await _repository.CountAsync();
        
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

        public async Task<IEnumerable<ProductDto>> GetProductsByQueryAsync(ProductRequestQuery query)
        {
            try
            {
                await using WebContext context = _context.CreateDbContext();
                IQueryable<ProductEntity> highlightedQuery = context.Products.Where(x => x.Highlighted == query.IsHighlighted);
                List<ProductEntity> result = new();
                List<ProductEntity> category = new();
                List<ProductEntity> brand = new();
                List<ProductEntity> search = new();
                if (query.CategoryId != null)
                {
                    category = await highlightedQuery.Where(x => x.CategoryId == query.CategoryId).ToListAsync();
                }

                if (query.BrandId != null)
                {
                    brand = await highlightedQuery.Where(x => x.BrandId == query.BrandId).ToListAsync();
                }

                if (query.Search != null)
                {
                    var searchLowered = query.Search.ToLowerInvariant();
                    var sku = highlightedQuery.Where(x => x.Sku.ToLower().Contains(searchLowered));
                    var title = highlightedQuery.Where(x => x.Title.ToLower().Contains(searchLowered));
                    search = await sku.Union(title).ToListAsync();
                }
                // DOUBLE
                if (query.Search == null && query.CategoryId != null && query.BrandId != null)
                {
                    result = brand.Intersect(category).ToList();
                }
                if (query.CategoryId == null && query.BrandId != null && query.Search != null)
                {
                    result = brand.Intersect(search).ToList();
                }
                if (query.BrandId == null && query.CategoryId != null && query.Search != null)
                {
                    result = category.Intersect(search).ToList();
                }
                // SIMPLE
                if (query.BrandId == null && query.CategoryId == null && query.Search != null)
                {
                    result = search.ToList();
                }
                if (query.BrandId == null && query.CategoryId != null && query.Search == null)
                {
                    result = category.ToList();
                }
                if (query.BrandId != null && query.CategoryId == null && query.Search == null)
                {
                    result = brand.ToList();
                }
                // TRIPLE
                if (query.BrandId != null && query.CategoryId != null && query.Search != null)
                {
                    result = search.Union(brand).Intersect(category).ToList();
                }

                
                return _mapper.Map(result);
            }
            catch (Exception e)
            {
                _logger.LogDebug($"[GetProductsByAsync] {e.Message}");
                return null;
            }
        }
    }
}