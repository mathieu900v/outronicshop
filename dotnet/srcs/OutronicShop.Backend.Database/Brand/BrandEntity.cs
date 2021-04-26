using System;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Database.Product;

namespace OutronicShop.Backend.Database.Brand
{
    [Table("brand", Schema = DatabaseSchemas.PRODUCTS)]
    public class BrandEntity : IUuidEntity
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual IEnumerable<ProductEntity> ProductEntities { get; set; }
    }
}