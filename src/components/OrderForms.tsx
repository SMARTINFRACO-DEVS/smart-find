import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaLocationPin } from 'react-icons/fa6';

interface OrderFormsProps {
  initialCoordinates: { lat: number; lng: number } | null; // Initial coordinates from the server
}

const OrderForms: React.FC<OrderFormsProps> = ({ initialCoordinates }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    email: '',
    location: { // Modified structure for location
      latitude: initialCoordinates?.lat || 0,
      longitude: initialCoordinates?.lng || 0,
    } 
  });
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [apiKey, setApiKey] = useState('');
  const [myLocation, setMyLocation] = useState<{ lat: number; lng: number } | null>(null);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3005/api/data');
      const data = await response.json();
      setApiKey(data.apiKey);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };



  const getLocation = async () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setMyLocation({ lat: latitude, lng: longitude });
        const searchResponse = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
          params: {
            latlng: `${latitude},${longitude}`,
            key: apiKey,
          },
        });
        const searchLocation = searchResponse.data.results[0].formatted_address;
        setSearchQuery(searchLocation);
        setFormData(prevData => ({
          ...prevData,
          location: { latitude, longitude },
        }));
      }, (error) => {
        console.error(error);
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const response = await fetch('http://localhost:3005/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log("Form Object: ",formData)

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-1/4">
        <h2 className="text-2xl font-semibold mb-6">Order Form</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border bg-transparent rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Contact:</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="mt-1 p-2 w-full border bg-transparent rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md bg-transparent"
            />
          </div>

          {/* Location input field with search button */}
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={handleChange}
              placeholder="Enter location"
              className="p-2 w-full text-gray-800 border rounded-md bg-transparent"
            />
            <button onClick={getLocation} className="h-[42.5px] mr-10 w-[41px] p-2 border bg-[#0c4a6e] border-gray-300">
              <FaLocationPin className="w text-[#f5f5f5] ml-1" />
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForms;
