using BasicApp.Context;
using BasicApp.DTos;
using BasicApp.Models;
using Microsoft.EntityFrameworkCore;

namespace BasicApp.Repositories;

public class Employeesrepository : IEmployeesrepository
{
    
    private readonly DatabaseContext _context;
    public Employeesrepository(DatabaseContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Employee>> GetEmployees()
    {
        return await _context.Employees.ToListAsync();
    }

    public async Task AddNewEmployee(EmployeeAddDTO newEmployee)
    {
        Employee newEmployeeObj = new Employee()
        {
            Name = newEmployee.Name,
            Age = newEmployee.Age,
            IsActive = newEmployee.IsActive
        };
        await _context.Employees.AddAsync(newEmployeeObj);
        await _context.SaveChangesAsync();
    }

    public async Task UpdateEmployee(Employee updatedEmployee)
    {
        Employee oldEmplyee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == updatedEmployee.EmployeeId);

        oldEmplyee.Name = updatedEmployee.Name;
        oldEmplyee.Age = updatedEmployee.Age;
        oldEmplyee.IsActive = updatedEmployee.IsActive;

        await _context.SaveChangesAsync();
    }
    
    public async Task DeleteEmployee(int id)
    {
        Employee emplyeeToRemove = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeId == id);
        _context.Employees.Remove(emplyeeToRemove);
        await _context.SaveChangesAsync();
    }
}