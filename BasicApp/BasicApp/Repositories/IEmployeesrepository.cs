using BasicApp.Models;

namespace BasicApp.Repositories;

public interface IEmployeesrepository
{
    Task<IEnumerable<Employee>> GetEmployees();
    Task AddNewEmployee(Employee newEmployee);
    Task UpdateEmployee(Employee updatedEmployee);
    Task DeleteEmployee(int id);
}