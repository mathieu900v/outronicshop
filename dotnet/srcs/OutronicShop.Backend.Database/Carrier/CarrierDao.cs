using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Carrier;

namespace OutronicShop.Backend.Database.Carrier
{
    public class CarrierDao : ICarrierDao
    {
        private readonly IGenericMapper<CarrierEntity, CarrierDto> _mapper;
        private readonly IDbContextFactory<WebContext> _context;
        private readonly IGenericAsyncUuidRepository<CarrierDto> _repository;
        private readonly ILogger<CarrierDao> _logger;

        public CarrierDao(IGenericMapper<CarrierEntity, CarrierDto> mapper, IDbContextFactory<WebContext> context, IGenericAsyncUuidRepository<CarrierDto> repository, ILogger<CarrierDao> logger)
        {
            _mapper = mapper;
            _context = context;
            _repository = repository;
            _logger = logger;
        }
        
        public async Task<IEnumerable<CarrierDto>> GetAllAsync() => await _repository.GetAllAsync();
        public async Task<CarrierDto> GetByIdAsync(Guid id) => await _repository.GetByIdAsync(id);
        public async Task<IEnumerable<CarrierDto>> GetByIdsAsync(IEnumerable<Guid> ids) => await _repository.GetByIdsAsync(ids);
        public async Task<CarrierDto> SaveAsync(CarrierDto obj) => await _repository.SaveAsync(obj);
        public async Task<IEnumerable<CarrierDto>> SaveAsync(IReadOnlyList<CarrierDto> objs) => await _repository.SaveAsync(objs);
        public async Task DeleteByIdAsync(Guid id) => await _repository.DeleteByIdAsync(id);
        public async Task DeleteByIdsAsync(IEnumerable<Guid> ids) => await _repository.DeleteByIdsAsync(ids);
        public async Task<int> CountAsync() => await _repository.CountAsync();
        
        //Tests et relations
        public async Task<CarrierDto> GetCarrierByTitleAsync(string title)
        {
            try
            {
                await using WebContext context = _context.CreateDbContext();
                var tmp = await context.Carriers.FirstOrDefaultAsync(x => x.Title.ToLower().Equals(title.ToLower()));
                return _mapper.Map(tmp);
            }
            catch (Exception e)
            {
                _logger.LogDebug($"[GetCarrierByTitleAsync] {e.Message}");
                return null;
            }
        }
    }
}