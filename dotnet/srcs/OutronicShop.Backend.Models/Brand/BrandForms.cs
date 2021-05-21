using System;

namespace OutronicShop.Backend.Models.Brand
{
    public class BrandCreationForm
    {
        public string Name { get; set; }
        public string ImgUrl { get; set; }
    }
    public class BrandDeletionForm
    {
        public Guid Id { get; set; }
    }

    public class BrandUpdateForm
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string ImgUrl { get; set; }
    }
}