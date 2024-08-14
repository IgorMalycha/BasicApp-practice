using BasicApp.DTos;
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
    public async Task<IActionResult> AddEmployee([FromBody] EmployeeAddDTO employeeAddDto)
    {

        await _employeesrepository.AddNewEmployee(employeeAddDto);
        
        return Created("api/employee", employeeAddDto);
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