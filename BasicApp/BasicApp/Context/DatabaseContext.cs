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
                Name = "Igor",
                Age = 21,
                IsActive = true
            },
            new Employee() {
                Name = "Szymon",
                Age = 19,
                IsActive = false
            },
            new Employee() {
                Name = "Magdalena",
                Age = 45,
                IsActive = true
            },
            new Employee() {
                Name = "Michał",
                Age = 48,
                IsActive = false
            }
        });
        
    }
    
}