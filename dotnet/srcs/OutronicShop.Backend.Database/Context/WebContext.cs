using Microsoft.EntityFrameworkCore;
using OutronicShop.Backend.Database.Brand;

namespace OutronicShop.Backend.Database.Context
{
    public class WebContext : DbContext
    {
        public WebContext(DbContextOptions<WebContext> options) : base(options) {}
        public DbSet<BrandEntity> Brands { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new BrandEntityTypeConfiguration());
        }
    }
}