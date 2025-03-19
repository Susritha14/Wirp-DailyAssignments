// ProductInventoryApi/Data/AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using ProductInventoryApi.Models;

namespace ProductInventoryApi.Data
{
    // The EF Core database context for our application.
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Products table.
        public DbSet<Product> Products { get; set; }
    }
}
