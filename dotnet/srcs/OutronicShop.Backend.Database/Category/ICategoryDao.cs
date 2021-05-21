using System.Collections.Generic;
using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain.Category;
using OutronicShop.Backend.Models.Category;

namespace OutronicShop.Backend.Database.Category
{
    public interface ICategoryDao : IGenericAsyncUuidRepository<CategoryDto>
    {
        Task<CategoryDto> GetCategoryByNameAsync(string name);
        Task<IEnumerable<CategoryDto>> GetAllCategoriesByQueriesAsync(CategoryRequestQuery query);
    }
}