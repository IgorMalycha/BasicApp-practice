using BasicApp.Models;
using BasicApp.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BasicApp.Controllers;


[Route("api/employee")]
[ApiController]
public class EmployeeController : ControllerBase
{
    private readonly IEmployeesrepository _employeesrepository;

    public EmployeeController(IEmployeesrepository employeesrepository)
    {
        _employeesrepository = employeesrepository;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllEmployees()
    {
        IEnumerable<Employee> employees = await _employeesrepository.GetEmployees();

        return Ok(employees);
    }
    
}