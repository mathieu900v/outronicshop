using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Cart;

namespace OutronicShop.Backend.Database.Cart
{
    public class CartDao : ICartDao
    {
        private readonly IGenericMapper<CartEntity, CartDto> _mapper;
        private readonly IDbContextFactory<WebContext> _context;
        private readonly IGenericAsyncUuidRepository<CartDto> _repository;
        private readonly ILogger<CartDao> _logger;

        public CartDao(IGenericMapper<CartEntity, CartDto> mapper, IDbContextFactory<WebContext> context, IGenericAsyncUuidRepository<CartDto> repository, ILogger<CartDao> logger)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _logger = logger;
        }
        public async Task<IEnumerable<CartDto>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<CartDto> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<CartDto>> GetByIdsAsync(IEnumerable<Guid> ids) => await _repository.GetByIdsAsync(ids);
        public async Task<CartDto> SaveAsync(CartDto obj) => await _repository.SaveAsync(obj);
        public async Task<IEnumerable<CartDto>> SaveAsync(IReadOnlyList<CartDto> objs) => await _repository.SaveAsync(objs);
        public async Task DeleteByIdAsync(Guid id) => await _repository.DeleteByIdAsync(id);
        public async Task DeleteByIdsAsync(IEnumerable<Guid> ids) => await _repository.DeleteByIdsAsync(ids);
        public async Task<int> CountAsync() => await _repository.CountAsync();
        public async Task<CartDto> GetByAccountIdAsync(Guid accountId)
        {
            try
            {
                await using WebContext context = _context.CreateDbContext();
                var tmp = await context.Carts.FirstOrDefaultAsync(x => x.AccountId.Equals(accountId));
                return _mapper.Map(tmp);
            }
            catch (Exception e)
            {
                _logger.LogDebug($"[{nameof(GetByAccountIdAsync)}] {e.Message}");
                return null;
            }
        }
    }
}