// import React from 'react'

// function Multiple() {
//   return (
//     <div>
//       multiple
//     </div>
//   )
// }

// export default Multiple
import React from 'react';

const MultipleEnquiry = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Multiple Enquiry</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="col-span-1">
                    <label htmlFor="wiseType" className="block mb-2 font-semibold">Wise Type</label>
                    <select id="wiseType" name="wiseType" className="w-full p-2 border border-gray-300 rounded">
                        <option value="consignment">Consignment</option>
                        <option value="type2">Vehicle Hire</option>
                        <option value="type3">Unloading</option>
                        <option value="type4">Private Marka</option>
                        <option value="type5">Vehicle</option>
                        <option value="type6">Invoice no</option>
                    </select>
                </div>
                <div className="col-span-1">
                    <label htmlFor="fromDate" className="block mb-2 font-semibold">From</label>
                    <input type="date" id="fromDate" name="fromDate" className="w-full p-2 border border-gray-300 rounded" defaultValue="2024-06-10" />
                </div>
                <div className="col-span-1">
                    <label htmlFor="toDate" className="block mb-2 font-semibold">To</label>
                    <input type="date" id="toDate" name="toDate" className="w-full p-2 border border-gray-300 rounded" defaultValue="2024-06-10" />
                </div>
                <div className="col-span-1">
                    <label htmlFor="wise" className="block mb-2 font-semibold">Wise</label>
                    <select id="wise" name="wise" className="w-full p-2 border border-gray-300 rounded">
                        <option value="select">Select</option>
                        <option value="wise1">Consignor</option>
                        <option value="wise2">Consignee</option>
                        <option value="wise2">Source</option>
                        <option value="wise2">Destinattion</option>
                        <option value="wise2">Billing Party</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4 flex-wrap">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mb-2 md:mb-0">View</button>
                <div className="flex items-center">
                    <select className="p-2 border border-gray-300 rounded mr-2">
                        <option value="excel">Excel</option>
                        <option value="pdf">PDF</option>
                    </select>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Go</button>
                </div>
            </div>
            <hr className="mb-4" />
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 border border-gray-300">Consignment No.</th>
                            <th className="p-2 border border-gray-300">Date</th>
                            <th className="p-2 border border-gray-300">Status</th>
                            <th className="p-2 border border-gray-300">Exp Dlv Date</th>
                            <th className="p-2 border border-gray-300">Source</th>
                            <th className="p-2 border border-gray-300">Destination</th>
                            <th className="p-2 border border-gray-300">Consignee</th>
                            <th className="p-2 border border-gray-300">Consignor</th>
                            <th className="p-2 border border-gray-300">Pkgs</th>
                            <th className="p-2 border border-gray-300">Rate</th>
                            <th className="p-2 border border-gray-300">Weight(Gross)</th>
                            <th className="p-2 border border-gray-300">Weight(Net)</th>
                            <th className="p-2 border border-gray-300">Freight</th>
                            <th className="p-2 border border-gray-300">Frt Type</th>
                            <th className="p-2 border border-gray-300">Mode</th>
                            <th className="p-2 border border-gray-300">Paid Frt</th>
                            <th className="p-2 border border-gray-300">Pvt. Marka</th>
                            <th className="p-2 border border-gray-300">To Pay/Billed At</th>
                            <th className="p-2 border border-gray-300">Ref No.</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="p-2 border border-gray-300" colSpan="19">
                                <div className="flex justify-center items-center">
                                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2">Add Option</button>
                                    No data available in table
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MultipleEnquiry;
