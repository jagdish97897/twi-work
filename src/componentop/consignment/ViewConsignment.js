import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import { FaEdit, FaPrint } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ViewConsignment = () => {
  const [consignment, setConsignment] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 5;

  useEffect(() => {
    fetchConsignment();
  }, []);

  const fetchConsignment = async () => {
    try {
      const response = await axios.get('https://twi-e-logistics.onrender.com/goods-receipts');
      setConsignment(response.data); // Assuming response.data is an array
    } catch (error) {
      console.error('Error fetching consignment:', error);
      setErrorMessage('Error fetching consignment');
    }
  };

  const handleEdit = (consignmentId) => {
    navigate(`/protected/componentop/sidebarop/Sidebarop/bookingoperation/updateconsignment/${consignmentId}`);
  };

  const handleEdit1 = (consignmentId) => {
    navigate(`/protected/componentop/sidebarop/Sidebarop/bookingoperation/AddNewDataInConsignment/${consignmentId}`);
  };

  const handlePrint = (consignmentId) => {
    const selectedConsignment = consignment.find((cons) => cons._id === consignmentId);

    const pdfTemplate = `
      <div class="font-sans p-4 border">
        <div class="bg-green-500 p-4 text-center">
          <h2 class="text-2xl font-bold text-black mb-4">Consignment Details</h2>
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
          <p><strong class="font-bold">Consignment No:</strong> ${selectedConsignment.consignmentno}</p>
          <p><strong class="font-bold">Date:</strong> ${moment(selectedConsignment.orderDate.$date).format('DD-MM-YYYY')}</p>
        </div>
        <div class="bg-black-300 flex p-4 justify-between h-full w-full">
          <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
            <div class="w-full pl-2">
              <p><strong class="font-bold">Customer:</strong> ${selectedConsignment.customer}</p>
              <p><strong class="font-bold">Customer GSTIN:</strong> ${selectedConsignment.customerGSTIN}</p>
              <p><strong class="font-bold">Customer Address:</strong> ${selectedConsignment.customerAddress}</p>
              <p><strong class="font-bold">Consignor:</strong> ${selectedConsignment.consignor}</p>
              <p><strong class="font-bold">Consignor GSTIN:</strong> ${selectedConsignment.consignorGSTIN}</p>
              <p><strong class="font-bold">Consignor Address:</strong> ${selectedConsignment.consignorAddress}</p>
              <p><strong class="font-bold">Employee:</strong> ${selectedConsignment.employee}</p>
            </div>
          </div>
          <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
            <div class="w-full pl-2">
              <p><strong class="font-bold">Consignee:</strong> ${selectedConsignment.consignee}</p>
              <p><strong class="font-bold">Consignee GSTIN:</strong> ${selectedConsignment.consigneeGSTIN}</p>
              <p><strong class="font-bold">Consignee Address:</strong> ${selectedConsignment.consigneeAddress}</p>
              <p><strong class="font-bold">Order No:</strong> ${selectedConsignment.orderNo}</p>
              <p><strong class="font-bold">Order Mode:</strong> ${selectedConsignment.orderMode}</p>
              <p><strong class="font-bold">Service Mode:</strong> ${selectedConsignment.serviceMode}</p>
              <p><strong class="font-bold">Expected Date:</strong> ${moment(selectedConsignment.expectedDate.$date).format('DD-MM-YYYY')}</p>
            </div>
          </div>
        </div>
        <div class="bg-black-300 p-4 w-full">
          <h3 class="text-xl font-bold text-black mb-4">Details</h3>
          <table class="min-w-full divide-y divide-black-200">
            <thead class="bg-black-50">
              <tr>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">From</th>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">To</th>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Dimensions</th>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Weight(KG)</th>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Quantum Rate</th>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Effective Rate</th>
                <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Cost</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-black-200">
              <tr>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.from}</td>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.to}</td>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.dimensions}</td>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.weight}</td>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.quantumrate}</td>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.effectiverate}</td>
                <td class="border px-2 py-1 text-xs">${selectedConsignment.cost}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="bg-black-300 flex justify-between items-end h-24 w-full">
          <div class="text-left mb-4 ml-4">Remark: </div>
        </div>
        <div class="bg-black-300 p-4 h-48 w-full flex flex-col justify-between border-t border-black">
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

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentConsignment = consignment.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(consignment.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Consignment</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Consignment No</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Job Order No</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Customer</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order No</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order Date</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order Mode</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Service Mode</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Expected Date</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Employee</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentConsignment.map((consignment) => (
              <tr key={consignment._id}>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.consignmentno}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.jobOrder_no}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.customer}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.orderNo}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{moment(consignment.orderDate).format('DD-MM-YYYY')}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.orderMode}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.serviceMode}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{moment(consignment.expectedDate).format('DD-MM-YYYY')}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.employee}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(consignment._id)} className="text-indigo-600 hover:text-indigo-900">
                    <FaEdit className="mr-1" />Edit
                  </button>
                  <button onClick={() => handleEdit1(consignment._id)} className="text-indigo-600 hover:text-indigo-900">
                    <FaEdit className="mr-1" />Edit
                  </button>
                  <button onClick={() => handlePrint(consignment._id)} className="ml-4 text-green-600 hover:text-green-900">
                    <FaPrint className="mr-1" />Print
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'flex justify-center py-4'}
        pageClassName={'mx-1'}
        pageLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
        previousClassName={'mx-1'}
        previousLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
        nextClassName={'mx-1'}
        nextLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
        breakClassName={'mx-1'}
        breakLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700'}
        activeClassName={'bg-blue-500 text-white'}
      />
    </div>
  );
};

export default ViewConsignment;




// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import html2pdf from 'html2pdf.js';
// import moment from 'moment';
// import { FaEdit, FaPrint } from 'react-icons/fa';
// import ReactPaginate from 'react-paginate';

// const ViewConsignment = () => {
//   const [consignment, setConsignment] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();
//   const itemsPerPage = 5; 

//   useEffect(() => {
//     fetchConsignment();
//   }, []);

//   const fetchConsignment = async () => {
//     try {
//       const response = await axios.get('https://twi-e-logistics.onrender.com/goods-receipts');
//       setConsignment(response.data);
//     } catch (error) {
//       console.error('Error fetching job orders:', error);
//       setErrorMessage('Error fetching job orders');
//     }
//   };

//   const handleEdit = (consignmentId) => {
//     navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/updateJobOrder/${consignmentId}`);
//   };
//   const handleEdit1 = (consignmentId) => {
//     navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/AddNewDataInJobOrder/${consignmentId}`);
//   };

//   const handlePrint = (consignmentId) => {
//     const consignment = consignment.find((consignment) => consignment._id === consignmentId);

//     const pdfTemplate = `
//       <div class="font-sans p-4 border">
//         <div class="bg-green-500 p-4 text-center">
//           <h2 class="text-2xl font-bold text-black mb-4">consignment Details</h2>
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
//           <p><strong class="font-bold">Job Order No:</strong> ${consignment.jobOrder_no}</p>
//           <p><strong class="font-bold">Date:</strong> ${moment(consignment.orderDate.$date).format('DD-MM-YYYY')}</p>
//         </div>
//         <div class="bg-black-300 flex p-4 justify-between h-full w-full">
//           <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
//             <div class="w-full pl-2">
//               <p><strong class="font-bold">Customer:</strong> ${consignment.customer}</p>
//               <p><strong class="font-bold">Customer GSTIN:</strong> ${consignment.customerGSTIN}</p>
//               <p><strong class="font-bold">Customer Address:</strong> ${consignment.customerAddress}</p>
//               <p><strong class="font-bold">Consignor:</strong> ${consignment.consignor}</p>
//               <p><strong class="font-bold">Consignor GSTIN:</strong> ${consignment.consignorGSTIN}</p>
//               <p><strong class="font-bold">Consignor Address:</strong> ${consignment.consignorAddress}</p>
//               <p><strong class="font-bold">Employee:</strong> ${consignment.employee}</p>


//             </div>
//           </div>
//           <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
//             <div class="w-full pl-2">
//             <p><strong class="font-bold">Consignee:</strong> ${consignment.consignee}</p>
//             <p><strong class="font-bold">Consignee GSTIN:</strong> ${consignment.consigneeGSTIN}</p>
//             <p><strong class="font-bold">Consignee Address:</strong> ${consignment.consigneeAddress}</p>
//               <p><strong class="font-bold">Order No:</strong> ${consignment.orderNo}</p>
//               <p><strong class="font-bold">Order Mode:</strong> ${consignment.orderMode}</p>
//               <p><strong class="font-bold">Service Mode:</strong> ${consignment.serviceMode}</p>
//               <p><strong class="font-bold">Expected Date:</strong> ${moment(consignment.expectedDate.$date).format('DD-MM-YYYY')}</p>

//             </div>
//           </div>
//         </div>
//         <div class="bg-black-300 p-4 w-full">
//           <h3 class="text-xl font-bold text-black mb-4">Details</h3>
//           <table class="min-w-full divide-y divide-black-200">
//             <thead class="bg-black-50">
//               <tr>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">From</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">To</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Dimensions</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Weight(KG)</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Quantum Rate</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Effective Rate</th>
//                 <th class="px-2 py-1 text-left text-xs font-small text-black-500 uppercase">Cost</th>
//               </tr>
//             </thead>
//             <tbody class="bg-white divide-y divide-black-200">
//               <tr>
//                 <td class="border px-2 py-1 text-xs">${consignment.from}</td>
//                 <td class="border px-2 py-1 text-xs">${consignment.to}</td>
//                 <td class="border px-2 py-1 text-xs">${consignment.dimensions}</td>
//                 <td class="border px-2 py-1 text-xs">${consignment.weight}</td>
//                 <td class="border px-2 py-1 text-xs">${consignment.quantumrate}</td>
//                 <td class="border px-2 py-1 text-xs">${consignment.effectiverate}</td>
//                 <td class="border px-2 py-1 text-xs">${consignment.cost}</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div class="bg-black-300 flex justify-between items-end h-24 w-full">
//           <div class="text-left mb-4 ml-4">Remark: </div>
//         </div>
//         <div class="bg-black-300 p-4 h-48 w-full flex flex-col justify-between border-t border-black">
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

//   const handlePageClick = (data) => {
//     setCurrentPage(data.selected);
//   };

//   const offset = currentPage * itemsPerPage;
//   const currentConsignment = consignment.slice(offset, offset + itemsPerPage);
//   const pageCount = Math.ceil(consignment.length / itemsPerPage);

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       <h1 className="text-3xl font-bold mb-4">consignment</h1>
//       {errorMessage && <p className="text-red-500">{errorMessage}</p>}
//       <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">consignment</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Indent No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Customer</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order No</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Order Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Service Mode</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Expected Date</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Employee</th>
//               <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">Action</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentConsignment.map((consignment) => (
//               <tr key={consignment._id}>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.jobOrder_no}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.indentNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.customer}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.orderNo}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(consignment.orderDate).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.orderMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.serviceMode}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(consignment.expectedDate).toLocaleDateString()}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">{consignment.employee}</td>
//                 <td className="px-4 md:px-6 py-4 whitespace-nowrap">
//                   <button onClick={() => handleEdit(consignment._id)} className="text-indigo-600 hover:text-indigo-900">
//                     <FaEdit className="mr-1" />Edit
//                   </button>
//                   <button onClick={() => handleEdit1(consignment._id)} className="text-indigo-600 hover:text-indigo-900">
//                     <FaEdit className="mr-1" />Edit
//                   </button>
//                   <button onClick={() => handlePrint(consignment._id)} className="ml-4 text-green-600 hover:text-green-900">
//                     <FaPrint className="mr-1" />Print
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <ReactPaginate
//         previousLabel={'Previous'}
//         nextLabel={'Next'}
//         breakLabel={'...'}
//         pageCount={pageCount}
//         marginPagesDisplayed={2}
//         pageRangeDisplayed={5}
//         onPageChange={handlePageClick}
//         containerClassName={'flex justify-center py-4'}
//         pageClassName={'mx-1'}
//         pageLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         previousClassName={'mx-1'}
//         previousLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         nextClassName={'mx-1'}
//         nextLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100'}
//         breakClassName={'mx-1'}
//         breakLinkClassName={'px-3 py-2 border border-gray-300 rounded-md text-gray-700'}
//         activeClassName={'bg-blue-500 text-white'}
//       />
//     </div>
//   );
// };

// export default ViewConsignment;



// import React from 'react'

// const ViewConsignment = () => {
//   return (
//     <div>
//       view consignment
//     </div>
//   )
// }

// export default ViewConsignment
