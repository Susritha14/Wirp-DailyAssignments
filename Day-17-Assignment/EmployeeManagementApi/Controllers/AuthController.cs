using EmployeeManagementApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace EmployeeManagementApi.Controllers
{
    /// <summary>
    /// Controller to handle authentication.
    /// Exposes a login endpoint to obtain a JWT token.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        
        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        
        /// <summary>
        /// POST: api/Auth/login  
        /// Validates login credentials and returns a JWT token.  
        /// Accepts two sets of credentials:  
        /// - Username: ManiGoud / Password: Mani@123  
        /// - Username: Manikanth / Password: test@123  
        /// </summary>
        [HttpPost("login")]
        public IActionResult Login([FromBody] UserLogin userLogin)
        {
            // Validate login credentials against hardcoded values.
            if ((userLogin.Username == "ManiGoud" && userLogin.Password == "Mani@123") ||
                (userLogin.Username == "Manikanth" && userLogin.Password == "test@123"))
            {
                var token = GenerateJwtToken(userLogin.Username);
                return Ok(new { token });
            }
            return Unauthorized("Invalid credentials.");
        }
        
        /// <summary>
        /// Generates a JWT token using settings from appsettings.json.
        /// </summary>
        private string GenerateJwtToken(string username)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var secretKey = jwtSettings["SecretKey"];
            var issuer = jwtSettings["Issuer"];
            var audience = jwtSettings["Audience"];
            var expiryInMinutes = Convert.ToDouble(jwtSettings["ExpiryInMinutes"]);

            // Define token claims.
            var claims = new[]
            {
                new Claim(ClaimTypes.Name, username)
            };

            // Generate signing credentials.
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Create and return the token.
            var token = new JwtSecurityToken(
                issuer: issuer,
                audience: audience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(expiryInMinutes),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
