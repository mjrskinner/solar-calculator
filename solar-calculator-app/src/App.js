import React, { useState } from 'react';
import './App.css';

function App() {
  const [address, setAddress] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [solarData, setSolarData] = useState(null); // Store fetched solar data

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const fetchSolarData = async () => {
    setStatusMessage('Fetching solar data...');
    try {
      const response = await fetch('/solar-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setSolarData(data.outputs); // Assuming the structure based on NREL API
      setStatusMessage('');
    } catch (error) {
      console.error("Error:", error);
      setStatusMessage('Failed to fetch solar data. Please try again.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Solar Calculator</h1>
        <div>
          <label htmlFor="address-input">Enter your address:</label>
          <input
            id="address-input"
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Address, City, or Zip"
          />
          <button onClick={fetchSolarData}>Find Solar Data</button>
        </div>
        {statusMessage && <p>{statusMessage}</p>}
        {solarData && (
          <div>
            <h2>Solar Data Results:</h2>
            <p>Average DNI (kWh/m²/day): {solarData.avg_dni.annual}</p>
            <p>Average GHI (kWh/m²/day): {solarData.avg_ghi.annual}</p>
            <p>Average Tilt at Latitude (kWh/m²/day): {solarData.avg_lat_tilt.annual}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
