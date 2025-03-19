using EmployeeManagementApi.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApi.Data
{
    /// <summary>
    /// EF Core DbContext for handling Employee entities.
    /// </summary>
    public class EmployeeContext : DbContext
    {
        public EmployeeContext(DbContextOptions<EmployeeContext> options)
            : base(options)
        {
        }

        // DbSet representing Employee table in SQL Server.
        public DbSet<Employee> Employees { get; set; }
    }
}
