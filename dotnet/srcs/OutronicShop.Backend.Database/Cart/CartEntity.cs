using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;
using OutronicShop.Backend.Database.Product;

namespace OutronicShop.Backend.Database.Cart
{
    [Table("cart", Schema = DatabaseSchemas.USERS)]
    public class CartEntity : IUuidEntity
    {
        public Guid Id { get; set; }
        public Guid AccountId { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
        
        [Column(TypeName = "jsonb")]
        public List<(ProductEntity Product, int Quantity)> Content { get; set; }
    }
}