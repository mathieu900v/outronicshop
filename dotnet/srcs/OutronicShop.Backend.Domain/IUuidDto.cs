using System;

namespace OutronicShop.Backend.Domain
{
    public interface IUuidDto : IDto
    {
        public Guid Id { get; set; }
    }

    public interface IDto
    {
    }
}