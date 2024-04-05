/*using Microsoft.Extensions.DependencyInjection;

namespace Presentation;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        return services;
    }
}

*/

// Presentation Class
namespace Payroll.Presentation
{
    using MySql.Data.MySqlClient;
    using Payroll.Domain;
    using Payroll.Infrastructure;
    using System;

    public class PayrollPresenter
    {
        private DatabaseConnector dbConnector;

        public PayrollPresenter(DatabaseConnector dbConnector)
        {
            this.dbConnector = dbConnector;
        }

        /*
        public void DisplayEmployeeDetails(int employeeId)
        {
            using (var connection = dbConnector.GetConnection())
            {
                connection.Open();

                // Fetch employee details from the database
                MySqlCommand command = new MySqlCommand("SELECT * FROM Employees WHERE employee_id = 9", connection);
                command.Parameters.AddWithValue("@EmployeeId", 9);

                using (var reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        Employee employee = new Employee
                        {
                            employee_id = Convert.ToInt32(reader["employee_id"]),
                            fullName = reader["fullName"].ToString(),
                            // Populate other properties
                        };

                        Console.WriteLine($"Employee ID: {employee.employee_id}, Name: {employee.fullName}");
                        // Display other employee details
                    }
                    else
                    {
                        Console.WriteLine("Employee not found.");
                    }
                }
            }
        }
        */
    }
}
