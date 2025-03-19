using Microsoft.EntityFrameworkCore;
using backend.Models;

#pragma warning disable IDE0130 // Namespace does not match folder structure
namespace EcommerceReduxApp.Data
#pragma warning restore IDE0130 // Namespace does not match folder structure
{
    // Application DB context using EF Core to manage Product entities.
    public class ApplicationDbContext : DbContext
    {
        // Constructor with DbContextOptions dependency injection.
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSet to manage Product entities in the database.
        public DbSet<Product> Products { get; set; }
    }
}
