using System;

namespace OutronicShop.Backend.Database.Generic
{
    public interface IUuidEntity : IEntity
    {
        public Guid Id { get; set; }
    }
}