import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AddNewDataInJobOrder() {
  const { id } = useParams(); // Get the job order ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    jobOrder_no: '',
    indentNo: '',
    from: '',
    to: '', 
    consignee: '',
    consignor: '',
    vehicle_placement_no: ''
  });

  const [error, setError] = useState(null); // For error handling
  const [loading, setLoading] = useState(true); // For loading state

  useEffect(() => {
    const fetchJobOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getjoborderbyid/${id}`);
        const jobOrderData = response.data;
        setFormData(jobOrderData); 
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error(error);
        setError('Failed to fetch job order data.');
        setLoading(false); // Set loading to false even if there's an error
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
      await axios.patch(`http://localhost:5000/updatejoborder/${id}`, formData);
      navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`);
      console.log(formData);
    } catch (error) {
      console.error(error);
      setError('Failed to update job order.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Add Vehicle Data</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
          <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
          <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="from">From</label>
          <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="to">To</label>
          <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
          <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
          <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="vehicle_placement_no">Vehicle Placement No</label>
          <input type="text" id="vehicle_placement_no" name="vehicle_placement_no" value={formData.vehicle_placement_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
      </form>
    </div>
  );
}

export default AddNewDataInJobOrder;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { id } = useParams(); // Get the job order ID from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '', 
//     consignee: '',
//     consignor: '',
//     vehicle_placement_no:''
//   });

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getjoborderbyid/${id}`);
//         const jobOrderData = response.data;
//         setFormData(jobOrderData); 
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchJobOrder();
//   }, [id]);


//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the job order
//       await axios.patch(`http://localhost:5000/updatejoborder/${id}`, formData);
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
//       console.log(formData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">add  vehicle data</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Job Order No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
//           <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Indent No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* From */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="from">From</label>
//           <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* To */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="to">To</label>
//           <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignee */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
//           <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignor */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
//           <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
        
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">vehicle_placement_no</label>
//           <input type="text" id="vehicle_placement_no" name="vehicle_placement_no" value={formData.vehicle_placement_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { jobOrder_no } = useParams(); // Get the job order number from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '',
//     consignee: '',
//     consignor: '',
//     customer: '',
//     customerGSTIN: '',
//     customerAddress: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     expectedDate: '',
//     employee: '',
//     dimensions: '',
//     weight: '',
//     quantumrate: '',
//     effectiverate: '',
//     cost: '',
//     consignorGSTIN: '',
//     consignorAddress: '',
//     consigneeGSTIN: '',
//     consigneeAddress: ''
//   });

//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/job-orders/${jobOrder_no}`);
//         const jobOrderData = response.data;
//         setFormData(jobOrderData); // Update the form data with fetched data
//       } catch (error) {
//         console.error('Error fetching job order data:', error);
//       }
//     };

//     fetchJobOrder();
//   }, [jobOrder_no]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');
    
//     try {
//       const response = await axios.post('http://localhost:5000/vehicle-placements', formData);
//       setMessage('Vehicle Placement created successfully');
//       setFormData({
//         jobOrder_no: '',
//         indentNo: '',
//         from: '',
//         to: '',
//         consignee: '',
//         consignor: '',
//         customer: '',
//         customerGSTIN: '',
//         customerAddress: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         expectedDate: '',
//         employee: '',
//         dimensions: '',
//         weight: '',
//         quantumrate: '',
//         effectiverate: '',
//         cost: '',
//         consignorGSTIN: '',
//         consignorAddress: '',
//         consigneeGSTIN: '',
//         consigneeAddress: ''
//       });
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/AddNewDataInJobOrder/${formData.jobOrder_no}`);
//     } catch (error) {
//       setError('Error creating Vehicle Placement');
//       console.error(error.response?.data || error.message);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
//       {message && <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{message}</div>}
//       {error && <div className="bg-red-100 text-red-800 p-2 mb-4 rounded">{error}</div>}
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Render each input field */}
//         {Object.keys(formData).map((key) => (
//           <div className="w-full sm:w-1/2 flex flex-col sm:pr-4" key={key}>
//             <label className="text-sm mb-1" htmlFor={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1)}
//             </label>
//             <input
//               type={key.includes('Date') ? 'date' : 'text'}
//               id={key}
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//         ))}
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { jobOrder_no } = useParams(); // Get the job order number from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '',
//     consignee: '',
//     consignor: '',
//     customer: '',
//     customerGSTIN: '',
//     customerAddress: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     expectedDate: '',
//     employee: '',
//     dimensions: '',
//     weight: '',
//     quantumrate: '',
//     effectiverate: '',
//     cost: '',
//     consignorGSTIN: '',
//     consignorAddress: '',
//     consigneeGSTIN: '',
//     consigneeAddress: ''
//   });

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/job-orders/${jobOrder_no}`);
//         const jobOrderData = response.data;
//         console.log('Fetched Job Order Data:', jobOrderData); // Debug log
//         setFormData(jobOrderData); // Update the form data with fetched data
//       } catch (error) {
//         console.error('Error fetching job order data:', error);
//       }
//     };

//     fetchJobOrder();
//   }, [jobOrder_no]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the job order by jobOrder_no
//       await axios.put(`http://localhost:5000/updatejoborder/${jobOrder_no}`, formData);
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
//     } catch (error) {
//       console.error('Error updating job order:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Render each input field */}
//         {Object.keys(formData).map((key) => (
//           <div className="w-full sm:w-1/2 flex flex-col sm:pr-4" key={key}>
//             <label className="text-sm mb-1" htmlFor={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1)}
//             </label>
//             <input
//               type={key.includes('Date') ? 'date' : 'text'}
//               id={key}
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//         ))}
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { jobOrder_no } = useParams(); // Get the job order number from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '',
//     consignee: '',
//     consignor: '',
//     customer: '',
//     customerGSTIN: '',
//     customerAddress: '',
//     orderNo: '',
//     orderDate: '',
//     orderMode: '',
//     serviceMode: '',
//     expectedDate: '',
//     employee: '',
//     dimensions: '',
//     weight: '',
//     quantumrate: '',
//     effectiverate: '',
//     cost: '',
//     consignorGSTIN: '',
//     consignorAddress: '',
//     consigneeGSTIN: '',
//     consigneeAddress: ''
//   });

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/job-orders/${jobOrder_no}`);
//         const jobOrderData = response.data;
//         console.log('Fetched Job Order Data:', jobOrderData); // Debug log
//         setFormData(jobOrderData); // Update the form data with fetched data
//       } catch (error) {
//         console.error('Error fetching job order data:', error);
//       }
//     };

//     fetchJobOrder();
//   }, [jobOrder_no]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the job order by jobOrder_no
//       await axios.put(`http://localhost:5000/updatejoborder/${jobOrder_no}`, formData);
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
//     } catch (error) {
//       console.error('Error updating job order:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Render each input field */}
//         {Object.keys(formData).map((key) => (
//           <div className="w-full sm:w-1/2 flex flex-col sm:pr-4" key={key}>
//             <label className="text-sm mb-1" htmlFor={key}>
//               {key.charAt(0).toUpperCase() + key.slice(1)}
//             </label>
//             <input
//               type={key.includes('Date') ? 'date' : 'text'}
//               id={key}
//               name={key}
//               value={formData[key]}
//               onChange={handleChange}
//               required
//               className="input w-full border border-black shadow-md"
//             />
//           </div>
//         ))}
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">
//           Update
//         </button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { jobOrder_no } = useParams(); // Get the job order number from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '',
//     consignee: '',
//     consignor: ''
//   });

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/job-orders/${jobOrder_no}`);
//         const jobOrderData = response.data;
//         console.log('Fetched Job Order Data:', jobOrderData); // Debug log
//         setFormData(jobOrderData); // Update the form data with fetched data
//       } catch (error) {
//         console.error('Error fetching job order data:', error);
//       }
//     };

//     fetchJobOrder();
//   }, [jobOrder_no]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the job order by jobOrder_no
//       await axios.put(`http://localhost:5000/updatejoborder/${jobOrder_no}`, formData);
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
//     } catch (error) {
//       console.error('Error updating job order:', error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Job Order No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
//           <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Indent No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* From */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="from">From</label>
//           <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* To */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="to">To</label>
//           <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignee */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
//           <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignor */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
//           <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { jobOrder_no } = useParams(); // Get the job order number from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '',
//     consignee: '',
//     consignor: ''
//   });

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/job-orders/${jobOrder_no}`);
//         const jobOrderData = response.data;
//         setFormData(jobOrderData); // Update the form data with fetched data
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchJobOrder();
//   }, [jobOrder_no]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the job order by jobOrder_no
//       await axios.put(`http://localhost:5000/updatejoborder/${jobOrder_no}`, formData);
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Job Order No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
//           <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Indent No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* From */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="from">From</label>
//           <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* To */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="to">To</label>
//           <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignee */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
//           <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignor */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
//           <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function AddNewDataInJobOrder() {
//   const { id } = useParams(); // Get the job order ID from the URL
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     jobOrder_no: '',
//     indentNo: '',
//     from: '',
//     to: '',
//     consignee: '',
//     consignor: ''
//   });

//   useEffect(() => {
//     const fetchJobOrder = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/getjoborderbyid/${id}`);
//         const jobOrderData = response.data;
//         setFormData(jobOrderData); // Update the form data with fetched data
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchJobOrder();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Send a PUT request to update the job order
//       await axios.put(`http://localhost:5000/updatejoborder/${id}`, formData);
//       navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/viewjoborders`); // Redirect to viewjoborders page after successful update
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
//       <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
//         {/* Job Order No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
//           <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Indent No */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
//           <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* From */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="from">From</label>
//           <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* To */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="to">To</label>
//           <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignee */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignee">Consignee</label>
//           <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Consignor */}
//         <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
//           <label className="text-sm mb-1" htmlFor="consignor">Consignor</label>
//           <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} required className="input w-full border border-black shadow-md" />
//         </div>
//         <button type="submit" className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600 mb-4">Update</button>
//       </form>
//     </div>
//   );
// }

// export default AddNewDataInJobOrder;




// import React from 'react'

// function AddNewDataInJobOrder() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default AddNewDataInJobOrder
