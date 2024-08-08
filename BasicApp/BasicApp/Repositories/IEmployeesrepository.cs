using BasicApp.Models;

namespace BasicApp.Repositories;

public interface IEmployeesrepository
{
    Task<IEnumerable<Employee>> GetEmployees();
}