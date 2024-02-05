// MapSearch.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';

const MapSearch: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  // const [mycoordinates, setMyCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [connectivityStatus, setConnectivityStatus] = useState<string>(''); // Initialize the state

  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/data');
      const data = await response.json();
      // console.log(data);
      setApiKey(data.apiKey);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: searchQuery,
          key: apiKey,
        },
      });

      const location = response.data.results[0].geometry.location;
      setCoordinates({ lat: location.lat, lng: location.lng });

      // Make a POST request to your server
      const postResponse = await axios.post('http://localhost:3005/checkConnectivity', {
        clientlatitude: location.lat,
        clientlongitude: location.lng,
      });

      // Set the response in state
      setConnectivityStatus(postResponse.data.message);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">LTE Signal Availability</h1>
      <div className="flex items-center  mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Enter location"
          className="mr-2 p-2 border w-96 text-gray-800 bg-neutral-100 border-gray-300"
        />
        <button onClick={handleSearch} className="p-2 rounded-md px-6 bg-sky-900 py-2 text-white">
          Search
        </button>
      </div>

       {/* Display the connectivity status */}
       {connectivityStatus && (
        <div>
          <p className='py-3'>Connectivity Status: {connectivityStatus}</p>
        </div>
      )}

      {coordinates && (
        <div>
          <p className=' py-3'>Coordinates: {coordinates.lat}, {coordinates.lng}</p>
          <MapComponent coordinates={coordinates} />
        </div>
      )}

     
    </div>
  );
};

export default MapSearch;
