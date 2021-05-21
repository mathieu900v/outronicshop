using System;
using System.ComponentModel.DataAnnotations;

namespace OutronicShop.Backend.Models.Category
{
    public class CategoryCreationForm
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid IdParent { get; set; }
    }
    public class CategoryDeletionForm
    {
        public Guid Id { get; set; }
    }
    public class CategoryUpdateForm
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid IdParent { get; set; }
    }
}