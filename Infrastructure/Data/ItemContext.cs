using Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ItemContext(DbContextOptions options) : IdentityDbContext<AppUser>(options)
    {
        public DbSet<Item> Items { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<AppUser>()
            //     .HasMany(e => e.Items)
            //     .WithOne(e => e.AppUser)
            //     .HasForeignKey(e => e.AppUserId)
            //     .IsRequired();

            modelBuilder.Entity<Item>()
                .HasMany(e => e.Photos)
                .WithOne(e => e.Item)
                .HasForeignKey(e => e.ItemId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            // modelBuilder.Entity<Item>()
            //     .HasOne(i => i.AppUser)
            //     .WithMany(u => u.Items)
            //     .HasForeignKey(i => i.AppUserId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<Item>()
            //     .Navigation(i => i.AppUser)
            //     .AutoInclude();

            modelBuilder.Entity<Item>()
                .HasMany(e => e.Photos)
                .WithOne(e => e.Item)
                .HasForeignKey(e => e.ItemId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        }
    }
}
