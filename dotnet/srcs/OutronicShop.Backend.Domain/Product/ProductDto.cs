using System;

namespace OutronicShop.Backend.Domain.Product
{
    public class ProductDto : IUuidDto
    {
        public Guid Id { get; set; }
        public string Sku { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public string Features { get; set; }
        public decimal Price { get; set; }
        public int Weight { get; set; }
        
        public Guid BrandId { get; set; }
        public Guid CategoryId { get; set; }
        
        public decimal DeliveryFees { get; set; }
        public bool Highlighted { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}