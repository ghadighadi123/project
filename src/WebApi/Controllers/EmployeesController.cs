using Microsoft.AspNetCore.Mvc;
//using Payroll.Domain;
using Payroll.Infrastructure;


namespace Payroll.WebApi.Controllers
{
    [ApiController]
    [Route("employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly DatabaseConnector _dbConnector;

        public EmployeesController(DatabaseConnector dbConnector)
        {
            _dbConnector = dbConnector;
        }

        [Route("get")]
        [HttpGet]
        public IActionResult GetEmployees()


        {

            return StatusCode(500, new { error = "Error getting employees" });
            /*

            using (var connection = _dbConnector.GetConnection())
            {
                connection.Open();
                var command = connection.CreateCommand();
                command.CommandText = "SELECT * FROM Employees";

                using (var reader = command.ExecuteReader())
                {
                    var employees = new List<Employee>();

                    while (reader.Read())
                    {
                        var employee = new Employee
                        {
                            employee_id = Convert.ToInt32(reader["employee_id"]),
                            fullName = reader["fullName"].ToString(),
                            // Populate other properties
                        };
                        employees.Add(employee);
                    }

                    return Ok(employees);
                }
            }
            */
        }

        // You can add more methods for handling other HTTP verbs (POST, PUT, DELETE) to manipulate employee data
    }
}
