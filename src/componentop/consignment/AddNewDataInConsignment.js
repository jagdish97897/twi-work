import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AddNewDataInConsignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        consignmentno:'',
        jobOrder_no: '',
        from: '',
        to: '', 
        consignee: '',
        consignor: '',
        vehiclehire_no: '',
      });

      useEffect(() => {
        const fetchConsignment = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/goods-receipts/${id}`);
            const consignmentData = response.data;
            setFormData(consignmentData); // Update the form data with fetched data
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchConsignment();
      }, [id]);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Send a PUT request to update the job order
          await axios.patch(`http://localhost:5000/goods-receipts/${id}`, formData);
          navigate(`/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewconsignment`); // Redirect to viewjoborders page after successful update
          console.log(formData);
        } catch (error) {
          console.error(error);
        }
      };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
    <h2 className="text-2xl font-bold mb-4 text-indigo-800">Add VehicleHire data</h2>
    <form onSubmit={handleSubmit} className="space-y-4 p-2 sm:flex sm:flex-wrap">
    <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
    <div className='sm:flex sm:flex-wrap gap-4'>
      <div className="mb-4">
        <label className="text-sm mb-1" htmlFor="consignmentno">consignment No</label>
        <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      <div className="mb-4">
        <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
        <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      {/* From */}
      <div className="mb-4">
        <label className="text-sm mb-1" htmlFor="from">From</label>
        <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      {/* To */}
      <div className="mb-4">
        <label className="text-sm mb-1" htmlFor="to">To</label>
        <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      {/* Consignee */}
      <div className="mb-4">
        <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
        <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>
      {/* Consignor */}
      <div className="mb-4">
        <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
        <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </div>

      <div className="mb-4">
          <label className="text-sm mb-1" htmlFor="vehiclehire_no">vehicle hire no</label>
          <input type="text" id="vehiclehire_no" name="vehiclehire_no" value={formData.vehiclehire_no} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        </div>
        </div>

      <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
    </form>
  </div>
  )
}

export default AddNewDataInConsignment



// import React from 'react'

// const AddNewDataInConsignment = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AddNewDataInConsignment
