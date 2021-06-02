using System;
using OutronicShop.Backend.Models.Enums;

namespace OutronicShop.Backend.Models.Product
{
    public class ProductRequestQuery
    {
        public ProductSearchType SearchType { get; set; }
        public Guid? CategoryId { get; set; }
        public Guid? BrandId { get; set; }
        public string Search { get; set; }
        public bool IsHighlighted { get; set; }
    }
}