using System;
using System.ComponentModel.DataAnnotations;

namespace OutronicShop.Backend.Models.Product
{
    public class ProductForms
    {
        public class ProductCreationForm
        {
            [Required(ErrorMessage = "SKU is needed")]
            public string Sku { get; set; }
            [Required(ErrorMessage = "Title can't be null")]
            public string Title { get; set; }
            [Required(ErrorMessage = "Image Url can't be null")]
            public string ImgUrl { get; set; }
            [Required(ErrorMessage = "Description can't be null")]
            public string Description { get; set; }
            [Required(ErrorMessage = "Features can't be null")]
            public string Features { get; set; }
            [Required(ErrorMessage = "Price can't be null")]
            public decimal Price { get; set; }
        
            public int Weight { get; set; }
            public decimal DeliveryFees { get; set; }
            public bool Highlighted { get; set; }

            public DateTime CreatedOn { get; set; }
            public DateTime UpdatedOn { get; set; }
        }

        public class ProductDeletionForm
        {
            [Required(ErrorMessage = "SKU can't be null")]
            public string Sku { get; set; }
        }
    }
}