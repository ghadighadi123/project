using Microsoft.AspNetCore.Mvc;
using Payroll.Infrastructure;
using MySql.Data.MySqlClient;
using Payroll.Domain;


namespace Payroll.WebApi.Controllers
{
    [ApiController]
    [Route("users")]
    public class AuthController : ControllerBase
    {
        private readonly DatabaseConnector _dbConnector;
         private readonly ILogger<AuthController> _logger;

        public AuthController(DatabaseConnector dbConnector, ILogger<AuthController> logger)
        {
            _dbConnector = dbConnector;
            _logger = logger;
        }

        [Route("register")]
        [HttpPost]
        public async Task<IActionResult> SignUp(UserSignUp user)
        {


         using (var connection = _dbConnector.GetConnection())
                        {
                            await connection.OpenAsync();

                            string sql = "INSERT INTO users (name, email, password) VALUES (@name, @email, @password)";
                            var command = new MySqlCommand(sql, connection);
                            command.Parameters.AddWithValue("@name", user.name);
                            command.Parameters.AddWithValue("@email", user.email);
                            command.Parameters.AddWithValue("@password", user.password);

                            try
                            {
                                await command.ExecuteNonQueryAsync();
                                return Ok(new { message = "User signed up successfully" });
                            }
                            catch (MySqlException ex)
                            {
                                return StatusCode(500, new { error = "Error inserting user" });
                            }
        }

                      
        }

        [Route("login")]
        [HttpPost]
        public async Task<IActionResult> Login(UserLogin user)
        {
            using (var connection = _dbConnector.GetConnection())
            {
                await connection.OpenAsync();

                string sql = "SELECT * FROM users WHERE email = @email AND password = @password";
                var command = new MySqlCommand(sql, connection);
                command.Parameters.AddWithValue("@email", user.email);
                command.Parameters.AddWithValue("@password", user.password);

                using (var reader = await command.ExecuteReaderAsync())
                {
                    if (await reader.ReadAsync())
                    {
                        return Ok(new { message = "Success" });
                    }
                    else
                    {
                        return Ok(new { message = "Fail" });
                    }
                }
            }
        }
       
    }
}
