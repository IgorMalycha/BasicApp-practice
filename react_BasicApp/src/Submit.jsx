import React, { useState } from 'react';

function Submit({ refreshTableData }) {
  const [nameField, setNameField] = useState("");
  const [ageField, setAgeField] = useState("");
  const [isActiveField, setIsActiveField] = useState(false);

  const handleNameChange = (event) => setNameField(event.target.value);
  const handleAgeChange = (event) => setAgeField(event.target.value);
  const handleIsActiveChange = (event) => setIsActiveField(event.target.checked);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      Name: nameField,
      Age: ageField,
      IsActive: isActiveField,
    };

    fetch('http://localhost:5065/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      refreshTableData();
      setNameField("");
      setAgeField("");
      setIsActiveField(false);
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="SubmitContainer">
      <input
        className="Name-Input-Submit"
        type="text"
        placeholder="Enter Name..."
        value={nameField}
        onChange={handleNameChange}
      />
      <input
        className="Age-Input-Submit"
        type="number"
        placeholder="Enter Age..."
        value={ageField}
        onChange={handleAgeChange}
      />
      <div>
        <input
          className="IsActive-Input-Submit"
          type="checkBox"
          checked={isActiveField}
          onChange={handleIsActiveChange}
        />
        <label>Is Active</label>
      </div>
      <button className="SubmitBtn" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Submit;