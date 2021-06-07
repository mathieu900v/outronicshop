namespace OutronicShop.Backend.Models.Category
{
    public class CategoryRequestQuery
    {
        public string Search { get; set; }
        public bool Strict { get; set; }
        public bool IsOrdered { get; set; } = false;
    }
}