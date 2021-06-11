using System;
using System.Threading.Tasks;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Database.Product;
using OutronicShop.Backend.Domain.Cart;

namespace OutronicShop.Backend.Database.Cart
{
    public interface ICartDao : IGenericAsyncUuidRepository<CartDto>
    {
        Task<CartDto> GetByAccountIdAsync(Guid accountId);
    }
}