import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';

const UpdateVehiclePlacement = () => {
  const { id } = useParams();
  const [vehiclePlacement, setVehiclePlacement] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchVehiclePlacement();
  }, []);

  const fetchVehiclePlacement = async () => {
    try {
      const response = await axios.get(`https://twi-e-logistics.onrender.com/vehicle-placements/${id}`);
      setVehiclePlacement(response.data);
    } catch (error) {
      console.error('Error fetching vehicle placement:', error);
      setErrorMessage('Error fetching vehicle placement');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiclePlacement({
      ...vehiclePlacement,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://twi-e-logistics.onrender.com/vehicle-placements/${id}`, vehiclePlacement);
      navigate('/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewvahicleplacement');
    } catch (error) {
      console.error('Error updating vehicle placement:', error);
      setErrorMessage('Error updating vehicle placement');
    }
  };

  if (!vehiclePlacement) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Update Vehicle Placement</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
      <div className='sm:flex sm:flex-wrap gap-4'>
        <div className='mb-4'>
          <label htmlFor="placement_no" className="block text-sm font-medium text-gray-700">
            Placement No
          </label>
          <input
            type="text"
            id="placement_no"
            name="placement_no"
            value={vehiclePlacement.vehicle_placement_no}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">
            Vehicle No
          </label>
          <input
            type="text"
            id="vehicleNo"
            name="vehicleNo"
            value={vehiclePlacement.vehicleNo}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="customer" className="block text-sm font-medium text-gray-700">
            Customer
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            value={vehiclePlacement.customer}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">
            Order No
          </label>
          <input
            type="text"
            id="orderNo"
            name="orderNo"
            value={vehiclePlacement.orderNo}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="placementDate" className="block text-sm font-medium text-gray-700">
            Placement Date
          </label>
          <input
            type="date"
            id="placementDate"
            name="placementDate"
            value={moment(vehiclePlacement.placementDate).format('YYYY-MM-DD')}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">
            Order Mode
          </label>
          <input
            type="text"
            id="orderMode"
            name="orderMode"
            value={vehiclePlacement.orderMode}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">
            Service Mode
          </label>
          <input
            type="text"
            id="serviceMode"
            name="serviceMode"
            value={vehiclePlacement.serviceMode}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">
            Expected Date
          </label>
          <input
            type="date"
            id="expectedDate"
            name="expectedDate"
            value={moment(vehiclePlacement.expectedDate).format('YYYY-MM-DD')}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div >
        <div className='mb-4'>
          <label htmlFor="employee" className="block text-sm font-medium text-gray-700">
            Employee
          </label>
          <input
            type="text"
            id="employee"
            name="employee"
            value={vehiclePlacement.employee}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="from" className="block text-sm font-medium text-gray-700">
            From
          </label>
          <input
            type="text"
            id="from"
            name="from"
            value={vehiclePlacement.from}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className='mb-4'>
          <label htmlFor="to" className="block text-sm font-medium text-gray-700">
            To
          </label>
          <input
            type="text"
            id="to"
            name="to"
            value={vehiclePlacement.to}
            onChange={handleChange}
            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div> 
        </div> 
        </div> 
        

          <button
            type="submit"
         className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
   
      </form>
    </div>
  );
};

export default UpdateVehiclePlacement;
