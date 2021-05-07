using System;
using System.ComponentModel.DataAnnotations;

namespace OutronicShop.Backend.Models.Brand
{
    public class BrandCreationForm
    {
        [Required(ErrorMessage = "Name can't be null")]
        public string Name { get; set; }
        [Required(ErrorMessage = "ImgUrl can't be null")]
        public string ImgUrl { get; set; }
    }
    public class BrandDeletionForm
    {
        [Required(ErrorMessage = "Id can't be null")]
        public Guid Id { get; set; }
    }

    public class BrandUpdateForm
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
    }
}