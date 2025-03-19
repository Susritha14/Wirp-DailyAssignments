using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using ProductAPI.Data;
using ProductAPI.Models;
using System.Text.Json;

namespace ProductAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IMemoryCache _cache;

        public ProductsController(ApplicationDbContext context, IMemoryCache cache)
        {
            _context = context;
            _cache = cache;
        }

    
        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            // Ensure valid paging parameters.
            if (page < 1)
                page = 1;
            if (size < 1)
                size = 10;

            // Create a unique cache key based on page and size.
            var cacheKey = $"Products_page{page}_size{size}";

            // Try to retrieve the paginated response from the cache.
            if (!_cache.TryGetValue(cacheKey, out object cachedResponse))
            {
                // Get the total record count.
                var totalRecords = await _context.Products.CountAsync();
                // Calculate total pages.
                var totalPages = (int)Math.Ceiling((double)totalRecords / size);

                // Fetch products for the current page using async methods.
                var products = await _context.Products
                    .OrderBy(p => p.Id)
                    .Skip((page - 1) * size)
                    .Take(size)
                    .ToListAsync();

                // Build pagination metadata.
                var pagination = new
                {
                    currentPage = page,
                    totalPages = totalPages,
                    totalRecords = totalRecords
                };

                // Construct response containing both data and metadata.
                var responseObj = new
                {
                    data = products,
                    pagination = pagination
                };

                // Add pagination metadata to the response headers.
                Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(pagination));

                // Cache the response for 60 seconds with sliding expiration.
                var cacheEntryOptions = new MemoryCacheEntryOptions()
                    .SetSlidingExpiration(TimeSpan.FromSeconds(60));
                _cache.Set(cacheKey, responseObj, cacheEntryOptions);

                return Ok(responseObj);
            }
            else
            {
                // If cache exists, simply return the cached response.
                return Ok(cachedResponse);
            }
        }
    }
}
