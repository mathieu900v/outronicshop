using Microsoft.EntityFrameworkCore;
using OutronicShop.Backend.Database.Brand;
using OutronicShop.Backend.Database.Carrier;
using OutronicShop.Backend.Database.Category;
using OutronicShop.Backend.Database.Product;

namespace OutronicShop.Backend.Database.Context
{
    public class WebContext : DbContext
    {
        public WebContext(DbContextOptions<WebContext> options) : base(options) {}
        public DbSet<BrandEntity> Brands { get; set; }
        public DbSet<CategoryEntity> Categories { get; set; }
        public DbSet<ProductEntity> Products { get; set; }
        public DbSet<CarrierEntity> Carriers { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new BrandEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CategoryEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new ProductEntityTypeConfiguration());
            modelBuilder.ApplyConfiguration(new CarrierEntityTypeConfiguration());
        }
        
        
    }
}