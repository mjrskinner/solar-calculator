const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

// Geocoding to convert address to coordinates
async function geocodeAddress(address) {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
            q: address,
            format: 'json',
            limit: 1
        }
    });
    if (response.data.length > 0) {
        return { lat: response.data[0].lat, lon: response.data[0].lon };
    } else {
        throw new Error('Address not found');
    }
}

// Endpoint to fetch solar data
app.post('/solar-data', async (req, res) => {
    try {
        const { address } = req.body; // Frontend sends an address
        const { lat, lon } = await geocodeAddress(address); // Convert address to coords
        
        // Correctly placed logging statements
        console.log(`Geocoded address to lat: ${lat}, lon: ${lon}`);

        // Fetch solar data from NREL API using coords
        const solarDataResponse = await axios.get('https://developer.nrel.gov/api/solar/solar_resource/v1.json', {
            params: {
                api_key: process.env.NREL_API_KEY,
                lat: lat,
                lon: lon,
                format: 'json'
            }
        });

        console.log('Solar data fetched successfully:', solarDataResponse.data);

        res.json(solarDataResponse.data); // Send solar data back to the client
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Failed to fetch solar data');
    }
});

// Add a simple GET route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the Solar Data API!');
  });
  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));