namespace EmployeeManagementApi.Models
{
    /// <summary>
    /// Model to capture user login credentials.
    /// </summary>
    public class UserLogin
    {
        public string? Username{ get; set; }
        public string Password { get; set; }
    }
}
