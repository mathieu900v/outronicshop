using System;

namespace OutronicShop.Backend.Domain.Brand
{
    public class BrandDto : IUuidDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
        
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}