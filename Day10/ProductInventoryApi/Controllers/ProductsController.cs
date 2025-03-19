// ProductInventoryApi/Controllers/ProductsController.cs
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductInventoryApi.Data;
using ProductInventoryApi.Models;

namespace ProductInventoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Products
        // Returns a list of products.
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }

        // POST: api/Products
        // Adds a new product. Returns 409 Conflict if product exists.
        [HttpPost]
        public async Task<ActionResult<Product>> PostProduct(Product product)
        {
            if (string.IsNullOrWhiteSpace(product.Name) || product.Price <= 0)
            {
                return BadRequest("Invalid product data");
            }

            // Check for duplicate product name.
            bool exists = await _context.Products.AnyAsync(p => p.Name == product.Name);
            if (exists)
            {
                return Conflict("Product already exists.");
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            // Return the created product.
            return CreatedAtAction(nameof(GetProducts), new { id = product.Id }, product);
        }

        // PUT: api/Products/5
        // Updates an existing product.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProduct(int id, Product product)
        {
            if (id != product.Id)
            {
                return BadRequest("Product ID mismatch");
            }

            if (string.IsNullOrWhiteSpace(product.Name) || product.Price <= 0)
            {
                return BadRequest("Invalid product data");
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id))
                    return NotFound("Product not found");
                else
                    throw;
            }
            return NoContent();
        }

        // DELETE: api/Products/5
        // Deletes a product by ID.
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound("Product not found");
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
