using System;

namespace OutronicShop.Backend.Models.Carrier
{
    public class CarrierCreationForm
    {
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public int MinGrams { get; set; }
        public int MaxGrams { get; set; }
        public string Countries { get; set; }
        public decimal Price { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }

    public class CarrierDeletionForm
    {
        public Guid Id { get; set; }
    }

    public class CarrierUpdateForm
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string ImgUrl { get; set; }
        public int MinGrams { get; set; }
        public int MaxGrams { get; set; }
        public string Countries { get; set; }
        public decimal Price { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}