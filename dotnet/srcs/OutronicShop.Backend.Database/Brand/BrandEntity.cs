using System;
using System.ComponentModel.DataAnnotations.Schema;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;

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
    }
}