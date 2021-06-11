using Mapster;
using OutronicShop.Backend.Database.Product;
using OutronicShop.Backend.Domain.Product;

namespace OutronicShop.Backend.Database.Utils
{
    public static class MapsterConfiguration
    {
        public static void InitMappingConfiguration()
        {
            TypeAdapterConfig<ProductEntity, ProductDto>.NewConfig().PreserveReference(true);
        }
    }
}