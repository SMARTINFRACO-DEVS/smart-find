import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import OrderForms from './OrderForms';
import { FaLocationPin } from 'react-icons/fa6';

const MapSearch: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null); // State for user's current location
  const [Severcoordinates, setSeverCoordinates] = useState<{ lat: number; lng: number } | null>({
    lat: 0,
    lng: 0,
  });
  const [connectivityStatus, setConnectivityStatus] = useState<string>(''); // Initialize the state
  const [searchInitiated, setSearchInitiated] = useState<boolean>(false); // Track if search has been initiated

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
      // Reset connectivityStatus state
      setConnectivityStatus('');
      setSearchInitiated(true); // Set search initiated to true

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

      const { message, coordinates } = postResponse.data;
      setConnectivityStatus(message);
      if (coordinates) {
        const { nLat, nLng } = coordinates;
        setSeverCoordinates({ lat: nLat, lng: nLng });
        console.log('Coordinates from API response:', nLat, nLng);
      }

      console.log('API response data:', postResponse.data);
    } catch (error) {
      console.error('Error:', error);
      // Reset connectivityStatus state in case of error
      setConnectivityStatus('Error');
    }
  };

  const getLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;

          // Set user's current location
          setMyLocation({ lat: latitude, lng: longitude });

          // Search using current location
          const searchResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
            params: {
              latlng: `${latitude},${longitude}`,
              key: apiKey,
            },
          });
          const searchLocation = searchResponse.data.results[0].formatted_address;
          setSearchQuery(searchLocation); // Set search query to the address found

          // Make POST request to check connectivity
          const postResponse = await axios.post('http://localhost:3005/checkConnectivity', {
            clientlatitude: latitude,
            clientlongitude: longitude,
          });
          const { message, coordinates } = postResponse.data;
          setConnectivityStatus(message);
          if (coordinates) {
            const { nLat, nLng } = coordinates;
            setSeverCoordinates({ lat: nLat, lng: nLng });
          }
        }, (error) => {
          console.error(error);
        });
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    } catch (error) {
      console.error('Error:', error);
      // Reset connectivityStatus state in case of error
      setConnectivityStatus('Error');
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
          className=" p-2 border w-96 text-gray-800 bg-neutral-100 border-gray-300"
        />
        <button onClick={getLocation} className=" h-[42.5px] mr-10 w-[41px] p-2 border bg-[#0c4a6e] border-gray-300">
          <FaLocationPin className="w text-[#f5f5f5] ml-1" />
        </button>
        <button onClick={handleSearch} className="p-2 rounded-md px-6 bg-sky-900 py-2 text-white">
          Search
        </button>
      </div>

      {searchInitiated && connectivityStatus && (
        <div>
          <p className={`py-3 ${connectivityStatus === "Network is Available" ? "text-green-500 text-xl block font-bold uppercase" : "text-red-500 text-xl font-bold block uppercase"}`}>
            {connectivityStatus}
          </p>
        </div>
      )}

      {coordinates && (
        <div>
          <MapComponent coordinates={myLocation || coordinates} />
        </div>
      )}
      <div hidden>
        <OrderForms coordinates={myLocation || Severcoordinates} />
      </div>
    </div>
  );
};

export default MapSearch;
