import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateJobOrder() {
  const { id } = useParams(); // Get the job order ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobOrder_no: '',
    indentNo: '',
    from: '',
    to: '', 
    consignee: '',
    consignor: '',
    vehicle_placement_no:''
  });

  useEffect(() => {
    const fetchJobOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getjoborderbyid/${id}`);
        const jobOrderData = response.data;
        setFormData(jobOrderData); // Update the form data with fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobOrder();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the job order
      await axios.patch(`http://localhost:5000/updatejoborder/${id}`, formData);
      navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
      console.log(formData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4 text-indigo-800">Update Job Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4 p-2 sm:flex sm:flex-wrap">
        {/* Job Order No */}
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
        <div className='sm:flex sm:flex-wrap gap-4'>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="jobOrder_no">Job Order No</label>
          <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        {/* Indent No */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="indentNo">Indent No</label>
          <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        {/* From */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="from">From</label>
          <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        {/* To */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="to">To</label>
          <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        {/* Consignee */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="consignee">Consignee</label>
          <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        {/* Consignor */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700" htmlFor="consignor">Consignor</label>
          <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        </div>
        </div>

        <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Update</button>
      </form>
    </div>
  );
}

export default UpdateJobOrder;
