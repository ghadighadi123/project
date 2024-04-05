// Infrastructure Class
namespace Payroll.Infrastructure
{
    using MySql.Data.MySqlClient;

    public class DatabaseConnector
    {
        private string connectionString;

        public DatabaseConnector(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public MySqlConnection GetConnection()
        {
            return new MySqlConnection(connectionString);
        }


    }
}