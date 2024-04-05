/*using FluentValidation;
using Microsoft.Extensions.DependencyInjection;

namespace Application;
public static class DependencyInjection
 {
      public static IServiceCollection AddApplication(this IServiceCollection services) {

        var assembly = typeof(DependencyInjection).Assembly;

        services.AddMediatR(configuration => configuration.RegisterServicesFromAssembly(assembly));
        services.AddValidatorsFromAssembly(assembly);

        return services;
       }

}

*/
// Application Class
namespace Payroll.Application
{
    using Payroll.Infrastructure;
    using Payroll.Presentation;
    using System;

    class Program
    {
        static void Main(string[] args)
        {
            // Set up database connection
            string connectionString = "Your MySQL connection string";
            var dbConnector = new DatabaseConnector(connectionString);

            // Initialize presentation layer
            var presenter = new PayrollPresenter(dbConnector);

            // Example usage
            //presenter.DisplayEmployeeDetails(1);

            Console.ReadLine();
        }
    }
}