using System;
using System.ComponentModel.DataAnnotations.Schema;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Category;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;

namespace OutronicShop.Backend.Database.Product
{
    [Table("product", Schema = DatabaseSchemas.PRODUCTS)]
    public class ProductEntity : IUuidEntity
    {
        public Guid Id { get; set; }
        public string Sku { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public string Features { get; set; }
        public decimal Price { get; set; }
        public int Weight { get; set; }
        public decimal DeliveryFees { get; set; }
        public bool Highlighted { get; set; }
        public Guid BrandId { get; set; }
        public Guid CategoryId { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public virtual CategoryEntity Category { get; set; }
        public virtual BrandEntity Brand { get; set; }
    }
}