import React, { useState } from 'react';
import { useTable } from 'react-table';
import EditPopup from './EditPopup'; // Import the EditPopup component

function Table({ data, refreshTableData }) {

  const [trigger, setTrigger] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null); // State to store selected employee

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "employeeId",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "IsActive",
        accessor: "isActive",
        Cell: ({ value }) => (value ? "Yes" : "No"),
      },
      {
        Header: "Options",  
        accessor: "options", 
        Cell: ({ row }) => (
          <div className="options-cell">
            <button 
              className="EditBtn" 
              onClick={() => handleEditClick(row.original)}> {/* Trigger the edit popup */}
              Edit
            </button>
            <button
              className="DeleteBtn"
              onClick={() => handleDelete(row.original.employeeId)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  function handleEditClick(employee) {
    setSelectedEmployee(employee); // Set the selected employee data
    setTrigger(true); // Trigger the popup
  }

  function handleDelete(id) {
    console.log(id);

    fetch(`http://localhost:5065/api/employee/${id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete the record.");
      }
      refreshTableData();
    })
    .catch((error) => console.error("Error:", error));
  }

  return (
    <div className="table">
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={headerGroup.id}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()} key={column.id}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={row.id}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} key={cell.id}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {trigger && selectedEmployee && (
        <EditPopup
          trigger={trigger}
          setTrigger={setTrigger}
          employee={selectedEmployee} 
          refreshTableData={refreshTableData}
        />
      )}
    </div>
  );
}

export default Table;