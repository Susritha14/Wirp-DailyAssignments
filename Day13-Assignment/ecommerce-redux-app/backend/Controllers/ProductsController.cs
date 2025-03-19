using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EcommerceReduxApp.Data;
using backend.Models;

namespace EcommerceReduxApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Injecting the ApplicationDbContext dependency.
        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/products
        // Fetch all products from the database.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // POST: api/products
        // Add a new product to the database.
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct([FromBody] Product product)
        {
            // Add product to DB context and save changes.
            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Return created product with 201 HTTP code.
            return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
        }

        // DELETE: api/products/{id}
        // Delete a product by its ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            // Find the product with the provided id.
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            // Remove product from DB context and save changes.
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            // Return 204 No Content response.
            return NoContent();
        }
    }
}
