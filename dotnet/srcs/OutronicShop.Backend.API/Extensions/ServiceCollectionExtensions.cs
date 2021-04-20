using Microsoft.Extensions.DependencyInjection;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Domain;
using OutronicShop.Backend.Database.Utils;

namespace OutronicShop.Backend.API.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static void TryAddMappedAsyncUuidRepository<TEntity, TDto>(this IServiceCollection services)
            where TEntity : class, IUuidEntity
            where TDto : class, IUuidDto
        {
            services.AddTransient<IGenericMapper<TEntity, TDto>, MapsterMapper<TEntity, TDto>>();
            services.AddTransient<IGenericAsyncUuidRepository<TDto>, GenericMappedAsyncUuidRepository<TEntity, TDto>>();
        }
    }
}