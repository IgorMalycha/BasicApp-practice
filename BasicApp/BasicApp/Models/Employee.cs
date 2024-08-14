using System.ComponentModel.DataAnnotations;

namespace BasicApp.Models;

public class Employee
{
    [Key] 
    public int EmployeeId { get; set; }

    public string? Name { get; set; }
    public int? Age { get; set; }
    public bool IsActive { get; set; }
}