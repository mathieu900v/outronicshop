using System;

namespace OutronicShop.Backend.Models.Cart
{
    public class AddProductToCartForm
    {
        public Guid CartId { get; set; }
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
}