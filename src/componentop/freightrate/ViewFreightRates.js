import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

function ViewFreightRates() {
  const [freightRates, setFreightRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchFreightRates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/viewfreightrates');
        setFreightRates(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching freight rates. Please try again.');
        setLoading(false);
        console.error(error);
      }
    };

    fetchFreightRates();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleEdit = (rateId) => {
    console.log(`Editing freight rate with ID: ${rateId}`);
    // Redirect to the update page with the freight rate ID
    navigate(`/protected/componentop/sidebarop/Sidebarop/ordermanagement/updatefreightrate/${rateId}`);
  };

  const handlePrint = (rateId) => {
    const rate = freightRates.find((rate) => rate._id === rateId);

    const pdfTemplate = `
      <div class="font-sans p-4">
      <div class="bg-green-500 p-4 text-center">
      <h2 class="text-2xl font-bold text-black mb-4">Freight Rate Details</h2>
    </div>
    <div class="flex bg-gray-300 p-6">
    <img src="/twcpl.png"  class="h-60 w-60 mr-4">
    <div class="ml-8">
      <h4 class="text-2xl font-bold text-black mb-4">TRANSPORT WINGS (CAL) PVT LTD</h4>
      <p class="  text-black mb-4">REGISTERED OFFICE - 10, Phears Lane, Kolkata -700012, West Bengal.</p>
      <p class="  text-black mb-4">KOLKATA, West Bengal - 700012</p>
      <p class="  text-black mb-4">Phone : 011-27357591(6 LINES) Mobile : </p>
      <p class="  text-black mb-4">Fax : +91-11-27357596</p>
      <p class="  text-black mb-4">E-Mail : customercare@twcpl.in Website : 00000186www.twcpl.in</p>
    </div>
  </div>


<div class="bg-gray-300 flex p-4 justify-between  h-full w-full ">
<p><strong class="font-bold">Contract No:</strong> ${rate.contractNo}</p>
 <p><strong class="font-bold">Date:</strong> ${new Date(rate.date).toLocaleDateString()}</p>
</div>



<div class="bg-gray-300 flex p-4 justify-between h-full w-full">
  <div class="flex flex-col  text-black border border-black pb-4 h-full w-1/2">
    <div class="w-full pl-2">
      <p><strong class="font-bold">Base:</strong> ${rate.base}</p>
      <p><strong class="font-bold">Customer:</strong> ${rate.customer}</p>
      <p><strong class="font-bold">PO No:</strong> ${rate.poNo}</p>
      <p><strong class="font-bold">PO Date:</strong> ${new Date(rate.poDate).toLocaleDateString()}</p>
      <p><strong class="font-bold">Consignor:</strong> ${rate.consignor}</p>
      <p><strong class="font-bold">Consignee:</strong> ${rate.consignee}</p>
      <p><strong class="font-bold">Billing Branch:</strong> ${rate.billingBranch}</p>
    </div>
  </div>
  <div class="flex flex-col  text-black border border-black pb-4 h-full w-1/2">
    <div class="w-full pl-2">
      <p><strong class="font-bold">Apply On:</strong> ${rate.applyOn}</p>
      <p><strong class="font-bold">Date On:</strong> ${rate.dateOn}</p>
      <p><strong class="font-bold">Source:</strong> ${rate.source}</p>
      <p><strong class="font-bold">Destination:</strong> ${rate.destination}</p>
      <p><strong class="font-bold">Service Type:</strong> ${rate.serviceType}</p>
      <p><strong class="font-bold">Service Mode:</strong> ${rate.serviceMode}</p>
      <p><strong class="font-bold">Load Type:</strong> ${rate.loadType}</p>
    </div>
  </div>
</div>



    
<div class="bg-gray-300 flex justify-between items-end h-40 w-full">
  <div class="text-left mb-4 ml-4">remark</div>
</div>


<div class="bg-gray-300 p-4 h-64 w-full flex flex-col justify-between border-t border-black">
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


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Freight Rates</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Contract No</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Base</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">PO No</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">PO Date</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Consignor</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Consignee</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Billing Branch</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Apply On</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Date On</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Source</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Destination</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Service Type</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Service Mode</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Load Type</th>
              <th className="px-4 md:px-6 py-3 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {freightRates.map((rate) => (
              <tr key={rate._id}>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.contractNo}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(rate.date).toLocaleDateString()}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.base}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.customer}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.poNo}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{new Date(rate.poDate).toLocaleDateString()}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.consignor}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.consignee}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.billingBranch}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.applyOn}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.dateOn}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.source}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.destination}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.serviceType}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.serviceMode}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">{rate.loadType}</td>
                <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                  <button onClick={() => handleEdit(rate._id)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                  <button onClick={() => handlePrint(rate._id)} className="ml-4 text-green-600 hover:text-green-900">Print</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewFreightRates;


// import React from 'react'

// function ViewFreightRates() {
//   return (
//     <div>
//       gjhgjghjhjh
//     </div>
//   )
// }

// export default ViewFreightRates
