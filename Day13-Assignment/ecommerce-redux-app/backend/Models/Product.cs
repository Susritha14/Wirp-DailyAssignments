using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    // Model representing a product in the e-commerce application
    public class Product
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? Name { get; set; }

        // Optional description for the product
        public string? Description { get; set; }

        // Price of the product
        public decimal Price { get; set; }
    }
}
