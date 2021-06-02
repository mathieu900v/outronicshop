using System;

namespace OutronicShop.Backend.Models.Product
{

    public class ProductCreationForm
    {
        public string Sku { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public string Features { get; set; }
        public decimal Price { get; set; }
        
        public Guid BrandId { get; set; }
        public Guid CategoryId { get; set; }

        public int Weight { get; set; }
        public decimal DeliveryFees { get; set; }
        public bool Highlighted { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }

    public class ProductDeletionForm
    {
        public string Sku { get; set; }
    }

    public class ProductUpdateForm
    {
        public Guid Id { get; set; }
        public string Sku { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public string Description { get; set; }
        public string Features { get; set; }
        public decimal Price { get; set; }
        
        public Guid BrandId { get; set; }
        public Guid CategoryId { get; set; }

        public int Weight { get; set; }
        public decimal DeliveryFees { get; set; }
        public bool Highlighted { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}