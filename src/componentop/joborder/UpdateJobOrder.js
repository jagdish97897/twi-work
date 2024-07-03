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
      <h2 className="text-2xl font-bold mb-4">Update Job Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap">
        {/* Job Order No */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="jobOrder_no">Job Order No</label>
          <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} required className="input w-full border border-black shadow-md" />
        </div>
        {/* Indent No */}
        <div className="w-full sm:w-1/2 flex flex-col sm:pr-4">
          <label className="text-sm mb-1" htmlFor="indentNo">Indent No</label>
          <input type="text" id="indentNo" name="indentNo" value={formData.indentNo} onChange={handleChange} required className="input w-full border border-black shadow-md" />
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
  );
}

export default UpdateJobOrder;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateJobOrder() {
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

// export default UpdateJobOrder;

