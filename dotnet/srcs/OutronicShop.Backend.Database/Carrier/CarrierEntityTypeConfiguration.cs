using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace OutronicShop.Backend.Database.Carrier
{
    public class CarrierEntityTypeConfiguration : IEntityTypeConfiguration<CarrierEntity>
    {
        public void Configure(EntityTypeBuilder<CarrierEntity> builder)
        {
            builder.HasKey(x => x.Id);
        }
    }
}