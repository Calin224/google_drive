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

            modelBuilder.Entity<Item>()
                .HasMany(e => e.Photos)
                .WithOne(e => e.Item)
                .HasForeignKey(e => e.ItemId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            modelBuilder.Entity<Item>()
                .HasMany(e => e.Pdfs)
                .WithOne(e => e.Item)
                .HasForeignKey(e => e.ItemId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            modelBuilder.Entity<Folder>()
                .HasOne(e => e.AppUser)
                .WithMany(u => u.Folders)
                .HasForeignKey(e => e.AppUserId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();

            modelBuilder.Entity<Item>()
                .HasOne(e => e.Folder)
                .WithMany(e => e.Items)
                .HasForeignKey(e => e.FolderId)
                .OnDelete(DeleteBehavior.Cascade)
                .IsRequired();
        }
    }
}
