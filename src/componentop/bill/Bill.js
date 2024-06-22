// src/components/BillEnquiry.js
import React from "react";

const BillEnquiry = () => {
  return (
    <div className="ccontainer mx-auto px-4 py-8 h-screen overflow-y-auto">
      <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Bill Enquiry</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="billNo">
            Bill No.
          </label>
          <input
            id="billNo"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-6">
          View
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Voucher Date" },
            { label: "Customer" },
            { label: "Pkgs." },
            { label: "Weight" },
            { label: "Freight" },
            { label: "Taxable Amount" },
            { label: "Other Amount" },
            { label: "GST" },
            { label: "GST On Charges" },
            { label: "Round Off" },
            { label: "Net Amount" },
          ].map((field) => (
            <div key={field.label} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                readOnly
              />
            </div>
          ))}
        </div>
        <h3 className="text-xl font-semibold mt-6 mb-4 text-blue-600">Bill Submission Detail</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Bill Submission No." },
            { label: "Bill Submission Date" },
            { label: "Submitted To" },
            { label: "Submitted Date" },
            { label: "Remarks" },
          ].map((field) => (
            <div key={field.label} className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">{field.label}</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillEnquiry;


