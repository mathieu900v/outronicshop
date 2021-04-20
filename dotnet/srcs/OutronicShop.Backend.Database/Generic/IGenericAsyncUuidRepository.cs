using System;
using OutronicShop.Backend.Domain;

namespace OutronicShop.Backend.Database.Generic
{
    public interface IGenericAsyncUuidRepository<TDto> : IGenericAsyncRepository<TDto, Guid> 
        where TDto : class, IUuidDto
    { }
}