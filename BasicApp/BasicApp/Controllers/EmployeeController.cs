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

    [HttpPost]
    public async Task<IActionResult> AddEmployee([FromBody] Employee newEmployee)
    {

        await _employeesrepository.AddNewEmployee(newEmployee);
        
        return Created("api/employee", newEmployee);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateEmployee([FromBody] Employee updatedEmployee)
    {
        await _employeesrepository.UpdateEmployee(updatedEmployee);
        return Created("api/employee", updatedEmployee);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEmployee(int id)
    {
        await _employeesrepository.DeleteEmployee(id);
        return NoContent();
    }
}