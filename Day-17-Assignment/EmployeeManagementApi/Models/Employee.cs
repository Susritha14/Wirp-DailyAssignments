using System.ComponentModel.DataAnnotations;

namespace EmployeeManagementApi.Models
{
    /// <summary>
    /// Employee model representing an employee record.
    /// </summary>
    public class Employee
    {
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        [Required]
        public string? Position { get; set; }

        [Required]
        public decimal Salary { get; set; }
    }
}
