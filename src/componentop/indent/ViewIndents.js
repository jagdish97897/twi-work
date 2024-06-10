
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import { FaPrint, FaEdit } from 'react-icons/fa';

function ViewIndents() {
  const [indents, setIndents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // You can change this value based on your preference
  const navigate = useNavigate(); 
  
  useEffect(() => {
    const fetchIndents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/getallindents');
        setIndents(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching indents. Please try again.');
        setLoading(false);
        console.error(error);
      }
    };

    fetchIndents();
  }, []);

  const handleEdit = (indentId) => {
    console.log(`Editing indent with ID: ${indentId}`);
    // Redirect to the update page with the indent ID
    navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/updateindent/${indentId}`);
  };

  const handlePrint = (indentId) => {
    const indent = indents.find((indent) => indent._id === indentId);

    const itemsTemplate = indent.additem.map(item => `
      <tr>
        <td class="border px-2 py-1 text-xs">${item.from}</td>
        <td class="border px-2 py-1 text-xs">${item.to}</td>
        <td class="border px-2 py-1 text-xs">${item.vehicletype}</td>
        <td class="border px-2 py-1 text-xs">${item.DIMENSIONS}</td>
        <td class="border px-2 py-1 text-xs">${item.WEIGHT}</td>
        <td class="border px-2 py-1 text-xs">${item.QUANTUMRATE}</td>
        <td class="border px-2 py-1 text-xs">${item.EFFECTIVERATE}</td>
        <td class="border px-2 py-1 text-xs">${item.COST}</td>
        <td class="border px-2 py-1 text-xs">${item.REMARKS}</td>
      </tr>
    `).join('');

    const pdfTemplate = `
      <div class="font-sans p-4 border">
        <div class="bg-green-500 p-4 text-center">
          <h2 class="text-2xl font-bold text-black mb-4">Indent Details</h2>
        </div>
        <div class="flex bg-black-300 p-6">
          <img src="/twcpl.png" class="h-60 w-60 mr-4">
          <div class="ml-8">
            <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
            <p class="text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
            <p class="text-black mb-4">KOLKATA, West Bengal - 700012</p>
            <p class="text-black mb-4">Phone: 011-27357591(6 LINES) Mobile:</p>
            <p class="text-black mb-4">Fax: +91-11-27357596</p>
            <p class="text-black mb-4">E-Mail: customercare@twcpl.in Website: www.twcpl.in</p>
          </div>
        </div>
        <div class="bg-black-300 flex p-4 justify-between h-full w-full">
          <p><strong class="font-bold">Indent No:</strong> ${indent.indentNo}</p>
          <p><strong class="font-bold">Date:</strong> ${new Date(indent.date).toLocaleDateString()}</p>
        </div>
        <div class="bg-black-300 flex p-4 justify-between h-full w-full">
          <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
            <div class="w-full pl-2">
              <p><strong class="font-bold">Order Date:</strong> ${new Date(indent.orderDate).toLocaleDateString()}</p>
              <p><strong class="font-bold">Employee:</strong> ${indent.employee}</p>
              <p><strong class="font-bold">Order No:</strong> ${indent.orderNo}</p>
              <p><strong class="font-bold">Order Mode:</strong> ${indent.orderMode}</p>

            </div>
          </div>
          <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
            <div class="w-full pl-2">
              <p><strong class="font-bold">Expected Date:</strong> ${new Date(indent.expectedDate).toLocaleDateString()}</p>
              <p><strong class="font-bold">Customer:</strong> ${indent.customer}</p>
              <p><strong class="font-bold">Service Mode:</strong> ${indent.serviceMode}</p>
              <p><strong class="font-bold">RFQ:</strong> ${indent.rfq}</p>

            </div>
          </div>
        </div>

        <div class="bg-black-300 p-4 w-full">
        <h3 class="text-xl font-bold text-black mb-4">Items</h3>
        <table class="min-w-full divide-y divide-black-200">
          <thead class="bg-black-50">
            <tr>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">FROM</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">TO</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">VEHICLE TYPE</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">DIMENSIONS</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">WEIGHT(KG)</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">QUANTUMRATE</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">EFFECTIVE RATE</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">COST</th>
              <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">REMARK</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-black-200">
            ${itemsTemplate}
          </tbody>
        </table>
      </div>
      <div class="bg-black-300 p-4 w-full">
        <h3 class="text-xl font-bold text-black mb-4">Total</h3>
        <p><strong class="font-bold">Total weight:</strong> ${indent.total.weight}</p>
        <p><strong class="font-bold">Total quantumrate:</strong> ${indent.total.quantumrate}</p>
        <p><strong class="font-bold">Total effectiverate:</strong> ${indent.total.effectiverate}</p>
        <p><strong class="font-bold">Total cost:</strong> ${indent.total.cost}</p>
      </div>
      <div class="bg-black-300 flex justify-between items-end h-40 w-full">
        <div class="text-left mb-4 ml-4">Remark: </div>
      </div>
      <div class="bg-black-300 p-4 h-64 w-full flex flex-col justify-between border-t border-black">
        <div class="text-right">TRANSPORT WINGS (CAL) PVT LTD</div>
        <div class="flex justify-between pb-8">
          <div class="underline">PREPARED BY:-</div>
          <div class="underline">APPROVED BY</div>
          <div class="underline">AUTHORISED SIGNATORY</div>
        </div>
      </div>
    </div>
  `;

  html2pdf().from(pdfTemplate).save();
};

const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
};

const totalPages = Math.ceil(indents.length / itemsPerPage);
const currentIndents = indents.slice(
  (currentPage - 1) * itemsPerPage,
  currentPage * itemsPerPage
);

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <div className="flex justify-center mt-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          className={`px-4 py-2 mx-1 border ${currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-indigo-600'} border-indigo-600 rounded`}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

return (
  <div className="container mx-auto px-4 py-8">
    <h2 className="text-2xl font-bold mb-4">All Indents</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-black-200">
        <thead className="bg-black-50">
          <tr>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Indent No</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Date</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Customer</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Order No</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Order Date</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Order Mode</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Service Mode</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">RFQ</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Expected Date</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Employee</th>
            <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-black-200">
          {currentIndents.map((indent) => (
            <tr key={indent._id}>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.indentNo}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.date).toLocaleDateString()}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.customer}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderNo}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.orderDate).toLocaleDateString()}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderMode}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.serviceMode}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.rfq}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.expectedDate).toLocaleDateString()}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.employee}</td>
              <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleEdit(indent._id)} className="text-indigo-600 hover:text-indigo-900"><FaEdit className="mr-1" />Edit</button>
                <button onClick={() => handlePrint(indent._id)} className="ml-4 text-green-600 hover:text-green-900"><FaPrint className="mr-1" />Print</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <Pagination
      totalPages={totalPages}
      currentPage={currentPage}
      onPageChange={handlePageChange}
    />
  </div>
);
}

export default ViewIndents;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import { FaPrint } from 'react-icons/fa';
// import { FaEdit } from 'react-icons/fa';

// function ViewIndents() {
//   const [indents, setIndents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); 
  
//   useEffect(() => {
//     const fetchIndents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getallindents');
//         setIndents(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching indents. Please try again.');
//         setLoading(false);
//         console.error(error);
//       }
//     };

//     fetchIndents();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const handleEdit = (indentId) => {
//     console.log(`Editing indent with ID: ${indentId}`);
//     // Redirect to the update page with the indent ID
//     navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/updateindent/${indentId}`);
//   };

//   const handlePrint = (indentId) => {
//     const indent = indents.find((indent) => indent._id === indentId);

//     const itemsTemplate = indent.additem.map(item => `
//       <tr>
//         <td class="border px-2 py-1 text-xs">${item.from}</td>
//         <td class="border px-2 py-1 text-xs">${item.to}</td>
//         <td class="border px-2 py-1 text-xs">${item.vehicletype}</td>
//         <td class="border px-2 py-1 text-xs">${item.DIMENSIONS}</td>
//         <td class="border px-2 py-1 text-xs">${item.WEIGHT}</td>
//         <td class="border px-2 py-1 text-xs">${item.QUANTUMRATE}</td>
//         <td class="border px-2 py-1 text-xs">${item.EFFECTIVERATE}</td>
//         <td class="border px-2 py-1 text-xs">${item.COST}</td>
//         <td class="border px-2 py-1 text-xs">${item.REMARKS}</td>
//       </tr>
//     `).join('');

//     const pdfTemplate = `
//       <div class="font-sans p-4 border">
//         <div class="bg-green-500 p-4 text-center">
//           <h2 class="text-2xl font-bold text-black mb-4">Indent Details</h2>
//         </div>
//         <div class="flex bg-black-300 p-6">
//           <img src="/twcpl.png" class="h-60 w-60 mr-4">
//           <div class="ml-8">
//             <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
//             <p class="text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
//             <p class="text-black mb-4">KOLKATA, West Bengal - 700012</p>
//             <p class="text-black mb-4">Phone: 011-27357591(6 LINES) Mobile:</p>
//             <p class="text-black mb-4">Fax: +91-11-27357596</p>
//             <p class="text-black mb-4">E-Mail: customercare@twcpl.in Website: www.twcpl.in</p>
//           </div>
//         </div>
//         <div class="bg-black-300 flex p-4 justify-between h-full w-full">
//           <p><strong class="font-bold">Indent No:</strong> ${indent.indentNo}</p>
//           <p><strong class="font-bold">Date:</strong> ${new Date(indent.date).toLocaleDateString()}</p>
//         </div>
//         <div class="bg-black-300 flex p-4 justify-between h-full w-full">
//           <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
//             <div class="w-full pl-2">
//               <p><strong class="font-bold">Order Date:</strong> ${new Date(indent.orderDate).toLocaleDateString()}</p>
//               <p><strong class="font-bold">Employee:</strong> ${indent.employee}</p>
//               <p><strong class="font-bold">Order No:</strong> ${indent.orderNo}</p>
//               <p><strong class="font-bold">Order Mode:</strong> ${indent.orderMode}</p>

//             </div>
//           </div>
//           <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
//             <div class="w-full pl-2">
//               <p><strong class="font-bold">Expected Date:</strong> ${new Date(indent.expectedDate).toLocaleDateString()}</p>
//               <p><strong class="font-bold">Customer:</strong> ${indent.customer}</p>
//               <p><strong class="font-bold">Service Mode:</strong> ${indent.serviceMode}</p>
//               <p><strong class="font-bold">RFQ:</strong> ${indent.rfq}</p>

//             </div>
//           </div>
//         </div>

//         <div class="bg-black-300 p-4 w-full">
//         <h3 class="text-xl font-bold text-black mb-4">Items</h3>
//         <table class="min-w-full divide-y divide-black-200">
//           <thead class="bg-black-50">
//             <tr>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">FROM</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">TO</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">VEHICLE TYPE</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">DIMENSIONS</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">WEIGHT(T)</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">QUANTUMRATE(P/T)</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">EFFECTIVE RATE(P/T)</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">COST</th>
//               <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">REMARK</th>
//             </tr>
//           </thead>
//           <tbody class="bg-white divide-y divide-black-200">
//             ${itemsTemplate}
//           </tbody>
//         </table>
//       </div>
//       <div class="bg-black-300 p-4 w-full">
//         <h3 class="text-xl font-bold text-black mb-4">Total</h3>
//         <p><strong class="font-bold">Total weight:</strong> ${indent.total.weight}</p>
//         <p><strong class="font-bold">Total quantumrate:</strong> ${indent.total.quantumrate}</p>
//         <p><strong class="font-bold">Total effectiverate:</strong> ${indent.total.effectiverate}</p>
//         <p><strong class="font-bold">Total cost:</strong> ${indent.total.cost}</p>
//       </div>




//         <div class="bg-black-300 flex justify-between items-end h-40 w-full">
//           <div class="text-left mb-4 ml-4">Remark: </div>
//         </div>
//         <div class="bg-black-300 p-4 h-64 w-full flex flex-col justify-between border-t border-black">
//           <div class="text-right">TRANSPORT WINGS (CAL) PVT LTD</div>
//           <div class="flex justify-between pb-8">
//             <div class="underline">PREPARED BY:-</div>
//             <div class="underline">APPROVED BY</div>
//             <div class="underline">AUTHORISED SIGNATORY</div>
//           </div>
//         </div>

//       </div>
//     `;

//     html2pdf().from(pdfTemplate).save();
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">All Indents</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-black-200">
//           <thead className="bg-black-50">
//             <tr>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Indent No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Customer</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Order No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Order Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Order Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Service Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">RFQ</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Expected Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Employee</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-small text-black-500 uppercase">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-black-200">
//             {indents.map((indent) => (
//               <tr key={indent._id}>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.indentNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.date).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.customer}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.orderDate).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.serviceMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.rfq}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.expectedDate).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.employee}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">
//                   <button onClick={() => handleEdit(indent._id)} className="text-indigo-600 hover:text-indigo-900"><FaEdit className="mr-1" />Edit</button>
//                   <button onClick={() => handlePrint(indent._id)} className="ml-4 text-green-600 hover:text-green-900"><FaPrint className="mr-1" />Print</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// export default ViewIndents;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';

// function ViewIndents() {
//   const [indents, setIndents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchIndents = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/getallindents');
//         setIndents(response.data);
//         setLoading(false);
//       } catch (error) {
//         setError('Error fetching indents. Please try again.');
//         setLoading(false);
//         console.error(error);
//       }
//     };

//     fetchIndents();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   const handleEdit = (indentId) => {
//     console.log(`Editing indent with ID: ${indentId}`);
//     // Redirect to the update page with the indent ID
//     navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/updateindent/${indentId}`);
//   };


//   const handlePrint = (indentId) => {
//     const indent = indents.find((indent) => indent._id === indentId);

//     const pdfTemplate = `
//       <div class="font-sans p-4">
//       <div class="bg-green-500 p-4 text-center">
//       <h2 class="text-2xl font-bold text-black mb-4">Indent Details</h2>
//     </div>
//     <div class="flex bg-gray-300 p-6">
//     <img src="/twcpl.png"  class="h-60 w-60 mr-4">
//     <div class="ml-8">
//       <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
//       <p class="  text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
//       <p class="  text-black mb-4">KOLKATA, West Bengal - 700012</p>
//       <p class="  text-black mb-4">Phone : 011-27357591(6 LINES) Mobile : </p>
//       <p class="  text-black mb-4">Fax : +91-11-27357596</p>
//       <p class="  text-black mb-4">E-Mail : customercare@twcpl.in Website : 00000186www.twcpl.in</p>
//       <!-- Other details here -->
//     </div>
//   </div>


// <div class="bg-gray-300 flex p-4 justify-between  h-full w-full ">
// <p><strong class="font-bold">Indent No:</strong> ${indent.indentNo}</p>
//  <p><strong class="font-bold">Date:</strong> ${new Date(indent.date).toLocaleDateString()}</p>
// </div>



// <div class="bg-gray-300 flex p-4 justify-between h-full w-full">
//   <div class="flex flex-col  text-black border border-black pb-4 h-full w-1/2">
//     <div class="w-full pl-2">
//       <p><strong class="font-bold">Order Date:</strong> ${new Date(indent.orderDate).toLocaleDateString()}</p>
//       <p><strong class="font-bold">Employee:</strong> ${indent.employee}</p>
//       <p><strong class="font-bold">Order No:</strong> ${indent.orderNo}</p>
//       <p><strong class="font-bold">Order Mode:</strong> ${indent.orderMode}</p>
//       <p><strong class="font-bold">Balance:</strong> ${indent.balance}</p>
//       <p><strong class="font-bold">Source:</strong> ${indent.source}</p>
//     </div>
//   </div>
//   <div class="flex flex-col  text-black border border-black pb-4 h-full w-1/2">
//     <div class="w-full pl-2">
//       <p><strong class="font-bold">Expected Date:</strong> ${new Date(indent.expectedDate).toLocaleDateString()}</p>
//       <p><strong class="font-bold">Customer:</strong> ${indent.customer}</p>
//       <p><strong class="font-bold">Order Type:</strong> ${indent.orderType}</p>
//       <p><strong class="font-bold">Service Mode:</strong> ${indent.serviceMode}</p>
//       <p><strong class="font-bold">Temperature:</strong> ${indent.rfq}</p>
//       <p><strong class="font-bold">Destination:</strong> ${indent.destination}</p>
//     </div>
//   </div>
// </div>



    
// <div class="bg-gray-300 flex justify-between items-end h-40 w-full">
//   <div class="text-left mb-4 ml-4">remark</div>
// </div>


// <div class="bg-gray-300 p-4 h-64 w-full flex flex-col justify-between border-t border-black">
//   <div class="text-right">TRANSPORT WINGS (CAL) PVT LTD</div>
//   <div class="flex justify-between pb-8">
//   <div class="underline">PREPARED BY:-</div>
//   <div class="underline">APPROVED BY</div>
//   <div class="underline">AUTHORISED SIGNATORY</div>
//   </div>
// </div>



//       </div>
//     `;

//     html2pdf().from(pdfTemplate).save();
//   };



//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h2 className="text-2xl font-bold mb-4">All Indents</h2>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Indent No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Balance</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Order No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Order Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Order Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Service Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">RFQ</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Order Type</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Expected Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Employee</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Source</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Destination</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {indents.map((indent) => (
//               <tr key={indent._id}>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.indentNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.date).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.customer}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.balance}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.orderDate).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.serviceMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.rfq}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.orderType}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(indent.expectedDate).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.employee}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.source}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{indent.destination}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">
//                   <button onClick={() => handleEdit(indent._id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
//                   <button onClick={() => handlePrint(indent._id)} className="ml-4 text-green-600 hover:text-green-900">Print</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ViewIndents;

