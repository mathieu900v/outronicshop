using System;

namespace OutronicShop.Backend.Models.Product
{
    public class ProductRequestQuery
    {
        public Guid? CategoryId { get; set; }
        public Guid? BrandId { get; set; }
        public string Search { get; set; }
        public bool IsHighlighted { get; set; }
    }
}