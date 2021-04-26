using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Database.Product;

namespace OutronicShop.Backend.Database.Category
{
    [Table("category", Schema = DatabaseSchemas.PRODUCTS)]
    public class CategoryEntity : IUuidEntity
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid IdParent { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        
        public virtual IEnumerable<ProductEntity> ProductEntities { get; set; }
    }
}