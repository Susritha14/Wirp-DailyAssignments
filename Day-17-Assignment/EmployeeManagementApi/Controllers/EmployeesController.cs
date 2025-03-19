using EmployeeManagementApi.Data;
using EmployeeManagementApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManagementApi.Controllers
{
    /// <summary>
    /// Controller to handle CRUD operations for Employees.
    /// This API is secured using JWT ([Authorize] attribute).
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeeContext _context;

        public EmployeesController(EmployeeContext context)
        {
            _context = context;
        }

        /// <summary>
        /// GET: api/Employees?params
        /// Retrieves paginated, sorted, and filtered list of employees.
        /// </summary>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees(
            [FromQuery] int pageNumber = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string sortBy = "Id",
            [FromQuery] bool isAscending = true,
            [FromQuery] string search = "")
        {
            // Build queryable for employees
            var query = _context.Employees.AsQueryable();

            // Apply filtering by employee name if search string provided.
            if (!string.IsNullOrEmpty(search))
            {
                query = query.Where(e => e.Name.Contains(search));
            }

            // Apply sorting based on query parameters.
            query = sortBy.ToLower() switch
            {
                "name" => (isAscending ? query.OrderBy(e => e.Name) : query.OrderByDescending(e => e.Name)),
                "position" => (isAscending ? query.OrderBy(e => e.Position) : query.OrderByDescending(e => e.Position)),
                "salary" => (isAscending ? query.OrderBy(e => e.Salary) : query.OrderByDescending(e => e.Salary)),
                _ => (isAscending ? query.OrderBy(e => e.Id) : query.OrderByDescending(e => e.Id)),
            };

            // Apply pagination.
            var employees = await query
                                .Skip((pageNumber - 1) * pageSize)
                                .Take(pageSize)
                                .ToListAsync();

            return Ok(employees);
        }

        /// <summary>
        /// GET: api/Employees/{id}
        /// Retrieves a single employee by ID.
        /// </summary>
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            return Ok(employee);
        }

        /// <summary>
        /// POST: api/Employees
        /// Creates a new employee record.
        /// </summary>
        [HttpPost]
        public async Task<ActionResult<Employee>> CreateEmployee(Employee employee)
        {
            _context.Employees.Add(employee);
            await _context.SaveChangesAsync();
            // Return HTTP 201 with the created employee's URI.
            return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employee);
        }

        /// <summary>
        /// PUT: api/Employees/{id}
        /// Updates an existing employee record.
        /// </summary>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(int id, Employee employee)
        {
            if (id != employee.Id)
            {
                return BadRequest("Employee ID mismatch.");
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            // Return HTTP 204 No Content to indicate a successful update.
            return NoContent();
        }

        /// <summary>
        /// DELETE: api/Employees/{id}
        /// Deletes an employee record.
        /// </summary>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            // Return HTTP 204 No Content.
            return NoContent();
        }

        // Helper method to check if an employee exists.
        private bool EmployeeExists(int id)
        {
            return _context.Employees.Any(e => e.Id == id);
        }
    }
}
