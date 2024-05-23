import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateIndent() {
  const { id } = useParams(); // Get the indent ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // Initialize form data with empty values
    indentNo: '',
    date: '',
    customer: '',
    balance: '',
    orderNo: '',
    orderDate: '',
    orderMode: '',
    serviceMode: '',
    rfq: '',
    orderType: '',
    expectedDate: '',
    employee: '',
    source: '',
    destination: ''
  });


  useEffect(() => {
    const fetchIndent = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getindent/${id}`);
        const indentData = response.data;
  
        // Format date values before setting them in the form data
        const formattedFormData = {
          ...indentData,
          date: indentData.date ? new Date(indentData.date).toISOString().substring(0, 10) : '',
          orderDate: indentData.orderDate ? new Date(indentData.orderDate).toISOString().substring(0, 10) : '',
          expectedDate: indentData.expectedDate ? new Date(indentData.expectedDate).toISOString().substring(0, 10) : ''
        };
  
        setFormData(formattedFormData); // Update the form data with fetched data
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchIndent();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the indent
      await axios.put(`http://localhost:5000/update/${id}`, formData);
      navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewindents`); // Redirect to viewindents page after successful update
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Update Indent</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
        {/* Form fields */}
        {/* Indent No */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
          <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        {/* Date */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="date">Date</label>
          <input 
            type="date" 
            id="date" 
            name="date" 
            value={formData.date}  // Format date value
            onChange={handleChange} 
            required 
            className="input w-full border border-black shadow-md" 
          />
        </div>
        {/* Customer */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="customer">Customer</label>
          <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        {/* Order No */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="orderNo">Order No</label>
          <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        {/* Order Date */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
          <input type="date" id="orderDate" name="orderDate"  value={formData.orderDate}  onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        {/* Order Mode */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
          <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
            <option value="">Select Order Mode</option>
            <option value="MAIL">Mail</option>
            <option value="PHONE">Phone</option>
            <option value="LETTER">Letter</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        {/* Service Mode */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
          <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
            <option value="">Select Service Mode</option>
            <option value="AIR">AIR</option>
            <option value="SEA">SEA</option>
            <option value="LAND">LAND</option>
          </select>
        </div>
        {/* Temperature */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="temperature">RFQ</label>
          <input type="number" id="rfq" name="rfq" value={formData.rfq} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>

        {/* Expected Date */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
          <input type="date" id="expectedDate" name="expectedDate"  value={formData.expectedDate}  onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        {/* Employee */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="employee">Employee</label>
          <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
  
        <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
      </form>
    </div>
  );
}

export default UpdateIndent;




// // UpdateIndent.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateIndent() {
//   const { id } = useParams(); // Get the indent ID from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     // Initialize form data with empty values
//     indentNo: '',
//     date: '',
//     customer: '',
//     balance: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     temperature: '',
//     orderType: '',
//     expectedDate: '',
//     employee: '',
//     source: '',
//     destination: ''
//   });
//   useEffect(() => {
//     const fetchIndent = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/indent/${id}`);
//         const indentData = response.data;
//         // Update the form data with fetched data only if the form is empty
//         if (Object.values(formData).every(value => value === '')) {
//           setFormData(indentData);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
  
//     fetchIndent();
//   }, [id]); // Removed formData from dependencies array
  


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the indent
//       await axios.put(`http://localhost:5000/updateindent${id}`, formData);
//       navigate(`/sidebar/ordermanagement/viewindents`); // Redirect to viewindents page after successful update
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Indent</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Indent No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Date */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Customer */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="customer">Customer</label>
//           <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Balance */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="balance">Balance</label>
//           <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Order No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderNo">Order No</label>
//           <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Order Date */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
//           <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Order Mode */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderMode">Order Mode</label>
//           <select id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Mode</option>
//             <option value="MAIL">Mail</option>
//             <option value="PHONE">Phone</option>
//             <option value="LETTER">Letter</option>
//             <option value="OTHER">Other</option>
//           </select>
//         </div>
        
//         {/* Service Mode */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
//           <select id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Service Mode</option>
//             <option value="road">Road</option>
//             <option value="air">Air</option>
//             <option value="by hand">By Hand</option>
//             <option value="cargo">Cargo</option>
//             <option value="express">Express</option>
//             <option value="multi model">Multi-Model</option>
//             <option value="train">Train</option>
//           </select>
//         </div>
        
//         {/* Temperature */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="temperature">Temperature</label>
//           <input type="number" id="temperature" name="temperature" value={formData.temperature} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Order Type */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderType">Order Type</label>
//           <select id="orderType" name="orderType" value={formData.orderType} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Order Type</option>
//             <option value="auction">Auction</option>
//             <option value="cnmt">CNMT</option>
//             <option value="cnmt market">CNMT Market</option>
//             <option value="distuff">Distuff</option>
//             <option value="domestics">Domestics</option>
//             <option value="export">Export</option>
//             <option value="import">Import</option>
//             <option value="sale">Sale</option>
//             <option value="tfn">TFN</option>
//           </select>
//         </div>
        
//         {/* Expected Date */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
//           <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Employee */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="employee">Employee</label>
//           <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Source */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         {/* Destination */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
//       </form>
//     </div>
//   );
// }

// export default UpdateIndent;
