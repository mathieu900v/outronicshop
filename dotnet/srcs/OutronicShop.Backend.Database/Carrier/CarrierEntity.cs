using System;
using System.ComponentModel.DataAnnotations.Schema;
using OutronicShop.Backend.Database.Context;
using OutronicShop.Backend.Database.Generic;

namespace OutronicShop.Backend.Database.Carrier
{
    [Table("carrier", Schema = DatabaseSchemas.PRODUCTS)]
    public class CarrierEntity : IUuidEntity
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