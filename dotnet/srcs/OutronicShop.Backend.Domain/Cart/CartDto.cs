using System;
using System.Collections.Generic;
using OutronicShop.Backend.Domain.Product;

namespace OutronicShop.Backend.Domain.Cart
{
    public class CartDto : IUuidDto
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        
        public List<(ProductDto Product, int Quantity)> Content { get; set; }
    }
}