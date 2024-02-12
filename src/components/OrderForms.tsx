import React, { useState, useEffect } from 'react';

interface OrderFormsProps {
  coordinates: { lat: number; lng: number } | null;
}

const OrderForms: React.FC<OrderFormsProps> = ({ coordinates }) => {
  const towerLat = coordinates.lat
  const towerLng = coordinates.lng

  const [formData, setFormData] = useState({
    fullName: '',
    contact: '',
    email: '',
    clientlatitude: towerLat, 
    clientlongitude: towerLng, 
  });

  

  

  // Update form data when coordinates prop changes
  useEffect(() => {
    if (coordinates) {
      setFormData(prevData => ({
        ...prevData,
        clientlatitude: towerLng,
        clientlongitude: towerLng,
      }));
    }
  }, [coordinates]);

  const handleSubmit = async () => {
    try {
      
      const response = await fetch('http://localhost:3005/submitForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log('Form data:', formData)

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the response data as needed
      } else {
        console.error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen  bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-1/4">
        <h2 className="text-2xl font-semibold mb-6">Order Form</h2>
        <form>
          {/* Form fields */}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Full Name:</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border  bg-transparent rounded-md"
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
            <label className="block text-sm font-medium  text-gray-700">Email:</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 p-2 w-full border rounded-md bg-transparent"
            />
          </div>

          

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Client Latitude:</label>
            <input
              type="text"
              name="clientlatitude"
              value={formData.clientlatitude}
              onChange={handleChange}
              className="mt-1 p-2 w-full  bg-transparent border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" >Client Longitude:</label>
            <input
              type="text"
              name="clientlongitude"
              value={formData.clientlongitude}
              onChange={handleChange}
              className="mt-1 p-2 w-full border  bg-transparent rounded-md"
            />
          </div>


          <button
            type="button"
            onClick={handleSubmit}
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
