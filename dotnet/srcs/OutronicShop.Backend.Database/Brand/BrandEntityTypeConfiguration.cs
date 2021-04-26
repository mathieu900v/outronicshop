using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OutronicShop.Backend.Database.Brand
{
    public class BrandEntityTypeConfiguration : IEntityTypeConfiguration<BrandEntity>
    {
        public void Configure(EntityTypeBuilder<BrandEntity> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasMany(x => x.ProductEntities)
                .WithOne(x => x.Brand)
                .HasForeignKey(x => x.BrandId);
        }
    }
}