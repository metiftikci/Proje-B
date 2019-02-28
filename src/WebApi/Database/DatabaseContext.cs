using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using WebApi.Infrastructure;
using WebApi.Models;

namespace WebApi.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Log> Logs { get; private set; }
        public DbSet<Raspberry> Raspberries { get; private set; }
        public DbSet<Teacher> Teachers { get; private set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            SqlConnectionStringBuilder csb = new SqlConnectionStringBuilder();
            csb.DataSource = Settings.MSSQL_SERVER;
            csb.InitialCatalog = Settings.MSSQL_DATABASE;
            csb.UserID = Settings.MSSQL_USERNAME;
            csb.Password = Settings.MSSQL_PASSWORD;

            optionsBuilder.UseSqlServer(csb.ConnectionString);
        }
    }
}
