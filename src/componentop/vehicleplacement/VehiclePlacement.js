// src/components/VehiclePlacementForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const VehiclePlacement = () => {
  const [formData, setFormData] = useState({
    vehicle_placement_no: '',
    date: '',
    jobOrder_no: '',
    customer: '',
    from: '',
    to: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetchJobOrderDetails = async (jobOrderNo) => {
    try {
      const response = await axios.get(`http://localhost:5000/job-orders/${jobOrderNo}`);
      const { customer, from, to } = response.data;
      setFormData({
        ...formData,
        customer,
        from,
        to,
      });
    } catch (error) {
      console.error('Error fetching job order details:', error);
    }
  };

  useEffect(() => {
    if (formData.jobOrder_no) {
      fetchJobOrderDetails(formData.jobOrder_no);
    }
  }, [formData.jobOrder_no]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      await axios.post('http://localhost:5000/vehicle-placements', formData);
      setMessage('Vehicle Placement created successfully');
      setFormData({
        vehicle_placement_no: '',
        date: '',
        jobOrder_no: '',
        customer: '',
        from: '',
        to: '',
      });
    } catch (error) {
      setError('Error creating Vehicle Placement');
      console.error(error.response?.data || error.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h2 className="text-3xl font-bold mb-4">Create Vehicle Placement</h2>
      <form onSubmit={handleSubmit}>
      <div className="mt-6 mb-4">
          <button
            type="submit"
            className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </div>
    <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
     
        <div>
          <label>Vehicle Placement No:</label>
          <input
            type="text"
            name="vehicle_placement_no"
            value={formData.vehicle_placement_no}
            onChange={handleChange}
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div>
          <label>Job Order No:</label>
          <input
            type="text"
            name="jobOrder_no"
            value={formData.jobOrder_no}
            onChange={handleChange}
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div>
          <label>Customer:</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div>
          <label>from:</label>
          <input
            type="text"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="input w-full border border-black shadow-md"
          />
        </div>
        <div>
          <label>to:</label>
          <input
            type="text"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="input w-full border border-black shadow-md"
          />
        </div>
        </div>

        <Tabs className="bg-[#FFFFFF] pt-2">
            <TabList className="flex flex-wrap border-b border-gray-200">
              <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">VEHICLE DETAILS</Tab>
              <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">BROKER DETAILS</Tab>
            </TabList>

            <TabPanel>
            {/* <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
                            <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
            </div> */}

              <div className="mt-4 p-2">
                <h3 className="text-lg font-semibold">vehicle details</h3>
                <div className="grid grid-cols-6 gap-6 p-2">
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Load Type</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Broker</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Broker Mobile No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Transporter</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Transporter Mobile No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Driver</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Driver Mobile No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Licence No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Payment Through</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Payment To</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Approved Status</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Approved Comment</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                 
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              BROKER DETAILS
            </TabPanel>
        </Tabs>

      </form>
      {/* {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>} */}
    </div>
  );
};

export default VehiclePlacement;

// // src/components/VehiclePlacementForm.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const VehiclePlacement = () => {
//   const [formData, setFormData] = useState({
//     vehicle_placement_no: '',
//     date: '',
//     jobOrder_no: '',
//     customer: '',
//     source: '',
//     destination: '',
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const fetchJobOrderDetails = async (jobOrderNo) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/job-orders/${jobOrderNo}`);
//       const { customer, source, destination } = response.data;
//       setFormData({
//         ...formData,
//         customer,
//         source,
//         destination,
//       });
//     } catch (error) {
//       console.error('Error fetching job order details:', error);
//     }
//   };

//   useEffect(() => {
//     if (formData.jobOrder_no) {
//       fetchJobOrderDetails(formData.jobOrder_no);
//     }
//   }, [formData.jobOrder_no]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     try {
//       await axios.post('http://localhost:5000/vehicle-placements', formData);
//       setMessage('Vehicle Placement created successfully');
//       setFormData({
//         vehicle_placement_no: '',
//         date: '',
//         jobOrder_no: '',
//         customer: '',
//         source: '',
//         destination: '',
//       });
//     } catch (error) {
//       setError('Error creating Vehicle Placement');
//       console.error(error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-3xl font-bold mb-4">Create Vehicle Placement</h2>
//       <form onSubmit={handleSubmit}>
//       <div className="mt-6 mb-4">
//           <button
//             type="submit"
//             className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Submit
//           </button>
//         </div>
//     <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
     
//         <div>
//           <label>Vehicle Placement No:</label>
//           <input
//             type="text"
//             name="vehicle_placement_no"
//             value={formData.vehicle_placement_no}
//             onChange={handleChange}
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div>
//           <label>Date:</label>
//           <input
//             type="date"
//             name="date"
//             value={formData.date}
//             onChange={handleChange}
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div>
//           <label>Job Order No:</label>
//           <input
//             type="text"
//             name="jobOrder_no"
//             value={formData.jobOrder_no}
//             onChange={handleChange}
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div>
//           <label>Customer:</label>
//           <input
//             type="text"
//             name="customer"
//             value={formData.customer}
//             onChange={handleChange}
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div>
//           <label>Source:</label>
//           <input
//             type="text"
//             name="source"
//             value={formData.source}
//             onChange={handleChange}
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         <div>
//           <label>Destination:</label>
//           <input
//             type="text"
//             name="destination"
//             value={formData.destination}
//             onChange={handleChange}
//             className="input w-full border border-black shadow-md"
//           />
//         </div>
//         </div>
//       </form>
//       {/* {message && <p style={{ color: 'green' }}>{message}</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>} */}
//     </div>
//   );
// };

// export default VehiclePlacement;


