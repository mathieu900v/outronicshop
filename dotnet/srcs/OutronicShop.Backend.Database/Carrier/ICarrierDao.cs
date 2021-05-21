using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Carrier;

namespace OutronicShop.Backend.Database.Carrier
{
    public interface ICarrierDao : IGenericAsyncUuidRepository<CarrierDto>
    {
        Task<CarrierDto> GetCarrierByTitleAsync(string title);
    }
}