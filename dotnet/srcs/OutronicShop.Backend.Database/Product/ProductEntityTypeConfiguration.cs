using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OutronicShop.Backend.Database.Product
{
    public class ProductEntityTypeConfiguration : IEntityTypeConfiguration<ProductEntity>
    {
        public void Configure(EntityTypeBuilder<ProductEntity> builder)
        {
            builder.HasKey(x => x.Id);
            
            builder.HasOne(x => x.Brand)
                .WithMany(x => x.ProductEntities)
                .HasForeignKey(x => x.BrandId);
            
            builder.HasOne(x => x.Category)
                .WithMany(x => x.ProductEntities)
                .HasForeignKey(x => x.CategoryId);
        }
    }
}