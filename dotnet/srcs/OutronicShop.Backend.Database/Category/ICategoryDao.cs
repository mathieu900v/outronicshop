using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Category;

namespace OutronicShop.Backend.Database.Category
{
    public interface ICategoryDao : IGenericAsyncUuidRepository<CategoryDto>
    {
        Task<CategoryDto> GetCategoryByNameAsync(string name);
    }
}