using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Product;
using OutronicShop.Backend.Models.Product;

namespace OutronicShop.Backend.Database.Product
{
    public interface IProductDao : IGenericAsyncUuidRepository<ProductDto>
    {
        Task<ProductDto> GetProductBySkuAsync(string sku);
        Task<IEnumerable<ProductDto>> GetProductsByQueryAsync(ProductRequestQuery query);
    }
}