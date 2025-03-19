// ProductInventoryApi/Models/Product.cs
using System.ComponentModel.DataAnnotations;

namespace ProductInventoryApi.Models
{
    // Represents a product in the inventory.
    public class Product
    {
        public int Id { get; set; }  // Primary key

        [Required]
        public string Name { get; set; }  // Product name

        [Required]
        public decimal Price { get; set; }  // Product price
    }
}
