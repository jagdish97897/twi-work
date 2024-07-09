
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';
import moment from 'moment';
import { FaEdit, FaPrint } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const ViewPod = () => {
  const [pods, setPods] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const itemsPerPage = 5; // Number of job orders per page

  useEffect(() => {
    fetchPod();
  }, []);

  const fetchPod = async () => {
    try {
      const response = await axios.get('http://localhost:5000/pods');
      setPods(response.data);
    } catch (error) {
      console.error('Error fetching Pod:', error);
      setErrorMessage('Error fetching Pod');
    }
  };

  const handleEdit = (podId) => {
    navigate(`/protected/componentop/sidebarop/Sidebarop/deliveryoperation/updatepod/${podId}`);
  };
 

  const handlePrint = (podId) => {
    const pod = pods.find((pod) => pod._id === podId);

    const pdfTemplate = `
      <div class="font-sans p-4 border">
        <div class="bg-green-500 p-4 text-center">
          <h2 class="text-2xl font-bold text-black mb-4">Pod Details</h2>
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
          <p><strong class="font-bold">pod No:</strong> ${pod.podNo}</p>
          <p><strong class="font-bold">Date:</strong> ${moment(pod.orderDate.$date).format('DD-MM-YYYY')}</p>
        </div>
        <div class="bg-black-300 flex p-4 justify-between h-full w-full">
          <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
            <div class="w-full pl-2">
              <p><strong class="font-bold">Customer:</strong> ${pod.customer}</p>
              <p><strong class="font-bold">Customer GSTIN:</strong> ${pod.customerGSTIN}</p>
              <p><strong class="font-bold">Customer Address:</strong> ${pod.customerAddress}</p>
              <p><strong class="font-bold">Consignor:</strong> ${pod.consignor}</p>
              <p><strong class="font-bold">Consignor GSTIN:</strong> ${pod.consignorGSTIN}</p>
              <p><strong class="font-bold">Consignor Address:</strong> ${pod.consignorAddress}</p>
              <p><strong class="font-bold">Employee:</strong> ${pod.employee}</p>


            </div>
          </div>
          <div class="flex flex-col text-black border border-black pb-4 h-full w-1/2">
            <div class="w-full pl-2">
            <p><strong class="font-bold">Consignee:</strong> ${pod.consignee}</p>
            <p><strong class="font-bold">Consignee GSTIN:</strong> ${pod.consigneeGSTIN}</p>
            <p><strong class="font-bold">Consignee Address:</strong> ${pod.consigneeAddress}</p>
              <p><strong class="font-bold">Order No:</strong> ${pod.orderNo}</p>
              <p><strong class="font-bold">Order Mode:</strong> ${pod.orderMode}</p>
              <p><strong class="font-bold">Service Mode:</strong> ${pod.serviceMode}</p>
              <p><strong class="font-bold">Expected Date:</strong> ${moment(pod.expectedDate.$date).format('DD-MM-YYYY')}</p>

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
                <td class="border px-2 py-1 text-xs">${pod.from}</td>
                <td class="border px-2 py-1 text-xs">${pod.to}</td>
                <td class="border px-2 py-1 text-xs">${pod.dimensions}</td>
                <td class="border px-2 py-1 text-xs">${pod.weight}</td>
                <td class="border px-2 py-1 text-xs">${pod.quantumrate}</td>
                <td class="border px-2 py-1 text-xs">${pod.effectiverate}</td>
                <td class="border px-2 py-1 text-xs">${pod.cost}</td>
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
  const currentPods = pods.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(pods.length / itemsPerPage);

  return (
    <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 text-indigo-800">Pod</h1>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">podNo No</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase">consignment</th>
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
            {currentPods.map((pod) => (
              <tr key={pod._id}>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.podNo}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.consignmentno}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.customer}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.orderNo}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(pod.orderDate).toLocaleDateString()}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.orderMode}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.serviceMode}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(pod.expectedDate).toLocaleDateString()}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{pod.employee}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(pod._id)} className="text-indigo-600 hover:text-indigo-900">
                    <FaEdit className="mr-1" />Edit
                  </button>
              
                  <button onClick={() => handlePrint(pod._id)} className="ml-4 text-green-600 hover:text-green-900">
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

export default ViewPod;




// import React from 'react'

// function ViewPod() {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default ViewPod
