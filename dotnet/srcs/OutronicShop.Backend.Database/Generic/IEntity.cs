using System;

namespace OutronicShop.Backend.Database.Generic
{
    public interface IEntity
    {
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}