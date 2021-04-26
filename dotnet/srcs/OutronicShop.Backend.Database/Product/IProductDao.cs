using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Product;

namespace OutronicShop.Backend.Database.Product
{
    public interface IProductDao : IGenericAsyncUuidRepository<ProductDto>
    {
        Task<ProductDto> GetProductBySkuAsync(string sku);
    }
}