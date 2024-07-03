import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateConsignment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        consignmentno:'',
        jobOrder_no: '',
        from: '',
        to: '', 
        consignee: '',
        consignor: '',
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
    <h2 className="text-2xl font-bold mb-4">Update Consignment</h2>
    <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
      {/* Job Order No */}
      <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
        <label className="text-sm mb-1" htmlFor="consignmentno">consignment No</label>
        <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} required className="input w-full border border-black shadow-md" />
      </div>
      <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
        <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
        <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
      </div>
      {/* From */}
      <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
        <label className="text-sm mb-1" htmlFor="from">From</label>
        <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-black shadow-md" />
      </div>
      {/* To */}
      <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
        <label className="text-sm mb-1" htmlFor="to">To</label>
        <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-black shadow-md" />
      </div>
      {/* Consignee */}
      <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
        <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
        <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
      </div>
      {/* Consignor */}
      <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
        <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
        <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
      </div>

      <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
    </form>
  </div>
  )
}

export default UpdateConsignment
