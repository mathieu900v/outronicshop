using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Brand;

namespace OutronicShop.Backend.Database.Brand
{
    public interface IBrandDao : IGenericAsyncUuidRepository<BrandDto>
    {
        Task<BrandDto> GetBrandByNameAsync(string name);
    }
}