import React, { useState, useEffect } from 'react';
import Submit from './Submit';
import Table from './Table';

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshTableData = () => {
    setIsLoading(true);
    setError(null);

    fetch('http://localhost:5065/api/employee', {
      method: 'GET',
    })
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch data.");
      return response.json();
    })
    .then(retrievedData => {
      setData(retrievedData);
    })
    .catch(error => setError(error.message))
    .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    refreshTableData();
  }, []);

  return (
    <div>
      <Submit refreshTableData={refreshTableData} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Table data={data} refreshTableData={refreshTableData} />
      )}
    </div>
  );
}

export default App;
