using BasicApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BasicApp.Context;

public class DatabaseContext : DbContext
{
    protected DatabaseContext()
    {
    }

    public DatabaseContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<Employee> Employees { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        modelBuilder.Entity<Employee>().HasData(new List<Employee>
        {
            new Employee() {
                EmployeeId = 1,
                Name = "Igor",
                Age = 21,
                IsActive = true
            },
            new Employee() {
                EmployeeId = 2,
                Name = "Szymon",
                Age = 19,
                IsActive = false
            },
            new Employee() {
                EmployeeId = 3,
                Name = "Magdalena",
                Age = 45,
                IsActive = true
            },
            new Employee() {
                EmployeeId = 4,
                Name = "Michał",
                Age = 48,
                IsActive = false
            }
        });
        
    }
    
}