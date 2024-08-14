import React, { useState, useEffect } from 'react';

function EditPopup({ trigger, setTrigger, employee, refreshTableData }) {
  const [nameField, setNameField] = useState("");
  const [ageField, setAgeField] = useState("");
  const [isActiveField, setIsActiveField] = useState(false);

  // Pre-fill the form fields with the selected employee's data
  useEffect(() => {
    if (employee) {
      setNameField(employee.name);
      setAgeField(employee.age);
      setIsActiveField(employee.isActive);
    }
  }, [employee]);

  const handleNameChange = (event) => setNameField(event.target.value);
  const handleAgeChange = (event) => setAgeField(event.target.value);
  const handleIsActiveChange = (event) => setIsActiveField(event.target.checked);

  function handleEdit() {
    const updatedEmployee = {
      employeeId: employee.employeeId,
      name: nameField,
      age: ageField,
      isActive: isActiveField,
    };

    // Make a PUT request to update the employee data
    fetch(`http://localhost:5065/api/employee`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployee),
    })
    .then(response => {
      if (!response.ok) throw new Error('Failed to update data.');
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      refreshTableData(); 
      setTrigger(false); 
    })
    .catch(error => console.error('Error:', error));
  }

  return trigger ? (
    <div className="editPopup">
      <div className="editPopup-inner">
        <div className="popup-title">
            <h2>Update Employee</h2>
        </div>
        <div className="FieldsContainer">
          <input
            className="Name-Input-Edit"
            type="text"
            placeholder="Enter Name..."
            value={nameField}
            onChange={handleNameChange}
          />
          <input
            className="Age-Input-Edit"
            type="number"
            placeholder="Enter Age..."
            value={ageField}
            onChange={handleAgeChange}
          />
          <div>
            <input
              className="IsActive-Input-Edit"
              type="checkbox"
              checked={isActiveField}
              onChange={handleIsActiveChange}
            />
            <label>Is Active</label>
          </div>
        </div>
        <div className="popup-functionBtns">
          <button className="cancelBtn" onClick={() => setTrigger(false)}>Cancel</button>
          <button className="SaveChangesBtn" onClick={handleEdit}>Save Changes</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default EditPopup;