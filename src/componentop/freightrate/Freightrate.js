import React from 'react'

const Freightrate = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-6xl mb-4">☹</div>
      <h1 className="text-3xl font-semibold mb-2">Freightrate Not Available</h1>
      <p className="text-lg mb-2">The Freightrate you are looking for is currently not available.</p>
    </div>
  )
}

export default Freightrate



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function FreightRate() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     contractNo: '',
//     date: '',
//     template: '',
//     base: '',
//     customer: '',
//     poNo: '',
//     poDate: '',
//     consignor: '',
//     consignee: '',
//     billingBranch: '',
//     applyOn: '',
//     dateOn: '',
//     source: '',
//     destination: '',
//     dateFrom: '',
//     dateTo: '',
//     serviceType: '',
//     serviceMode: '',
//     loadType: '',
//     pkgsType: '',
//     contentGroup: '',
//     content: '',
//     calculationBase: '',
//     fillingStation: '',
//     baseFuelRate: '',
//     varianceFactor: '',
//     vehicleAge: '',
//     status: ''
//   });

//   const [responseMessage, setResponseMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://twi-e-logistics.onrender.com/freightrate', formData);
//       setResponseMessage(`Freight rate created successfully. Freight rate ID: ${response.data._id}`);
//       setFormData({
//         contractNo: '',
//         date: '',
//         template: '',
//         base: '',
//         customer: '',
//         poNo: '',
//         poDate: '',
//         consignor: '',
//         consignee: '',
//         billingBranch: '',
//         applyOn: '',
//         dateOn: '',
//         source: '',
//         destination: '',
//         dateFrom: '',
//         dateTo: '',
//         serviceType: '',
//         serviceMode: '',
//         loadType: '',
//         pkgsType: '',
//         contentGroup: '',
//         content: '',
//         calculationBase: '',
//         fillingStation: '',
//         baseFuelRate: '',
//         varianceFactor: '',
//         vehicleAge: '',
//         status: ''
//       });
//     } catch (error) {
//       setResponseMessage('Error creating Freight rate. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleListClick = () => {
//     // Navigate to the viewindents page
//     navigate('/protected/componentop/sidebarop/Sidebarop/contract/viewfreightrates');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <div className='flex justify-between'>
//         <h2 className="text-2xl font-bold mb-4">Freight rate/ Create</h2>
//         <button type="button" onClick={handleListClick} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">List view</button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="contractNo">Rate Contract No</label>
//           <input type="text" id="contractNo" name="contractNo" value={formData.contractNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="template">Template</label>
//           <input type="text" id="template" name="template" value={formData.template} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="base">Base</label>
//           <input type="text" id="base" name="base" value={formData.base} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="customer">Customer</label>
//           <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="poNo">PO No</label>
//           <input type="text" id="poNo" name="poNo" value={formData.poNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="poDate">PO Date</label>
//           <input type="date" id="poDate" name="poDate" value={formData.poDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
//           <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
//           <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="billingBranch">Billing Branch</label>
//           <input type="text" id="billingBranch" name="billingBranch" value={formData.billingBranch} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="applyOn">Apply On</label>
//           <input type="date" id="applyOn" name="applyOn" value={formData.applyOn} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="dateOn">Date On</label>
//           <input type="date" id="dateOn" name="dateOn" value={formData.dateOn} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="dateFrom">Date From</label>
//           <input type="date" id="dateFrom" name="dateFrom" value={formData.dateFrom} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="dateTo">Date To</label>
//           <input type="date" id="dateTo" name="dateTo" value={formData.dateTo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="serviceType">Service Type</label>
//           <input type="text" id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="serviceMode">Service Mode</label>
//           <input type="text" id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="loadType">Load Type</label>
//           <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="pkgsType">PKGS Type</label>
//           <input type="text" id="pkgsType" name="pkgsType" value={formData.pkgsType} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="contentGroup">Content Group</label>
//           <input type="text" id="contentGroup" name="contentGroup" value={formData.contentGroup} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="content">Content</label>
//           <input type="text" id="content" name="content" value={formData.content} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="calculationBase">Calculation Base</label>
//           <input type="text" id="calculationBase" name="calculationBase" value={formData.calculationBase} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="fillingStation">Filling Station</label>
//           <input type="text" id="fillingStation" name="fillingStation" value={formData.fillingStation} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="baseFuelRate">Base Fuel Rate</label>
//           <input type="number" id="baseFuelRate" name="baseFuelRate" value={formData.baseFuelRate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="varianceFactor">Variance Factor</label>
//           <input type="number" id="varianceFactor" name="varianceFactor" value={formData.varianceFactor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="vehicleAge">Vehicle Age</label>
//           <input type="number" id="vehicleAge" name="vehicleAge" value={formData.vehicleAge} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="status">Status</label>
//           <select id="status" name="status" value={formData.status} onChange={handleChange} required className="input w-full border border-black shadow-md">
//             <option value="">Select Status</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>
//         <div className="flex gap-2">
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Submit</button>
//           <button type="button" onClick={() => setFormData({
//             contractNo: '',
//             date: '',
//             template: '',
//             base: '',
//             customer: '',
//             poNo: '',
//             poDate: '',
//             consignor: '',
//             consignee: '',
//             billingBranch: '',
//             applyOn: '',
//             dateOn: '',
//             source: '',
//             destination: '',
//             dateFrom: '',
//             dateTo: '',
//             serviceType: '',
//             serviceMode: '',
//             loadType: '',
//             pkgsType: '',
//             contentGroup: '',
//             content: '',
//             calculationBase: '',
//             fillingStation: '',
//             baseFuelRate: '',
//             varianceFactor: '',
//             vehicleAge: '',
//             status: ''
//           })} className="btn bg-gray-500 text-white py-2 px-4 border border-black hover:bg-gray-600 mb-4">Discard</button>
//         </div>
//         <div>{responseMessage}</div>
//       </form>
//     </div>
//   );
// }

// export default FreightRate;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


// function Freightrate() {
//   const navigate = useNavigate(); 
//   const [formData, setFormData] = useState({
//     contractNo: '',
//     date: '',
//     template: '',
//     base: '',
//     customer: '',
//     poNo: '',
//     poDate: '',
//     consignor: '',
//     consignee: '',
//     billingBranch: '',
//     applyOn: '',
//     dateOn: '',
//     source: '',
//     destination: '',
//     dateFrom: '',
//     dateTo: '',
//     serviceType: '',
//     serviceMode: '',
//     loadType: '',
//     pkgsType: '',
//     contentGroup: '',
//     content: '',
//     calculationBase: '',
//     fillingStation: '',
//     baseFuelRate: '',
//     varianceFactor: '',
//     vehicleAge: '',
//     status: ''
//   });

//   const [responseMessage, setResponseMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('https://twi-e-logistics.onrender.com/freightrate', formData);
//       setResponseMessage(`freight rate created successfully. Freight rate ID: ${response.data._id}`);
//       setFormData({
//         contractNo: '',
//         date: '',
//         template: '',
//         base: '',
//         customer: '',
//         poNo: '',
//         poDate: '',
//         consignor: '',
//         consignee: '',
//         billingBranch: '',
//         applyOn: '',
//         dateOn: '',
//         source: '',
//         destination: '',
//         dateFrom: '',
//         dateTo: '',
//         serviceType: '',
//         serviceMode: '',
//         loadType: '',
//         pkgsType: '',
//         contentGroup: '',
//         content: '',
//         calculationBase: '',
//         fillingStation: '',
//         baseFuelRate: '',
//         varianceFactor: '',
//         vehicleAge: '',
//         status: ''
        

//       });
//     } catch (error) {
//       setResponseMessage('Error creating Freight rate. Please try again.');
//       console.error(error);
//     }
//   };

//   const handleListClick = () => {
//     // Navigate to the viewindents page
//     navigate('/sidebar/ordermanagement/viewindents');
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
// <div className='flex justify-between'>
//   <h2 className="text-2xl font-bold mb-4">Freight rate/ Create</h2>
 
//   <button type="button" onClick={handleListClick} className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">List view</button>
// </div>

//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap">
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="contractNo">Rate Contract No</label>
//           <input type="text" id="contractNo" name="contractNo" value={formData.contractNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="date">Date</label>
//           <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="template">Customer</label>
//           <input type="text" id="template" name="template" value={formData.template} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="balance">Balance</label>
//           <input type="number" id="balance" name="balance" value={formData.balance} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderNo">Order No.</label>
//           <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="orderDate">Order Date</label>
//           <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
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

//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="temperature">Temperature</label>
//           <input type="number" id="temperature" name="temperature" value={formData.temperature} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
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

//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="expectedDate">Expected Date</label>
//           <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="employee">Employee</label>
//           <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="source">Source</label>
//           <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="destination">Destination</label>
//           <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <div className='flex gap-2'>
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Submit</button>
//           <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Discard</button>
//           <div>{responseMessage}</div>
//         </div>
//       </form>
//       {/* Display response message */}
    
//     </div>
//   );
// }

// export default Freightrate;




// import React from 'react'

// function Freightrate() {
//   return (
//     <div>
//       freightrate
//     </div>
//   )
// }

// export default Freightrate
