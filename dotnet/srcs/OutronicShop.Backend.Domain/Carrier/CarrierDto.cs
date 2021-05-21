using System;

namespace OutronicShop.Backend.Domain.Carrier
{
    public class CarrierDto : IUuidDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string imgUrl { get; set; }
        public int minGrams { get; set; }
        public int maxGrams { get; set; }
        public string countries { get; set; }
        public decimal price { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}