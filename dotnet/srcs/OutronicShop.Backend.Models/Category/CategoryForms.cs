﻿using System;
using System.ComponentModel.DataAnnotations;

namespace OutronicShop.Backend.Models.Category
{
    public class CategoryCreationForm
    {
        [Required(ErrorMessage = "Title can't be null")]
        public string Title { get; set; }
        [Required(ErrorMessage = "Description can't be null")]
        public string Description { get; set; }
        [Required(ErrorMessage = "IdParent can't be null but can be empty")]
        public Guid IdParent { get; set; }
    }
    public class CategoryDeletionForm
    {
        [Required(ErrorMessage = "Title can't be null")]
        public string Title { get; set; }
    }
}