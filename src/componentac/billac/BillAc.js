import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

const BillAc = () => {
    const [formData, setFormData] = useState({
        billNo: '',
        podNo: '',
        consignmentno: '',
        date: '',
        jobOrder_no: '',
        customer: '',
        customerGSTIN: '',
        customerAddress: '',
        from: '',
        to: '',
        dimensions: '',
        weight: '',
        quantumrate: '',
        effectiverate: '',
        cost: '',
        orderNo: '',
        orderDate: '',
        orderMode: '',
        serviceMode: '',
        expectedDate: '',
        employee: '',
        consignor: '',
        consignorGSTIN: '',
        consignorAddress: '',
        consignee: '',
        consigneeGSTIN: '',
        consigneeAddress: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const fetchJobOrderDetails = async (podNo) => {
        try {
            const response = await axios.get(`http://localhost:5000/pods/podno/${podNo}`);
            const { customer, customerGSTIN, customerAddress, from, to, dimensions, weight, quantumrate, effectiverate, cost, orderNo, orderDate, orderMode, serviceMode, expectedDate, employee, consignor, consignorGSTIN, consignorAddress, consignee, consigneeGSTIN, consigneeAddress } = response.data;
            setFormData((prevFormData) => ({
                ...prevFormData,
                customer,
                customerGSTIN,
                customerAddress,
                from,
                to,
                dimensions,
                weight,
                quantumrate,
                effectiverate,
                cost,
                orderNo,
                orderDate,
                orderMode,
                serviceMode,
                expectedDate,
                employee,
                consignor,
                consignorGSTIN,
                consignorAddress,
                consignee,
                consigneeGSTIN,
                consigneeAddress
            }));
        } catch (error) {
            console.error('Error fetching job order details:', error);
        }
    };

    useEffect(() => {
        if (formData.podNo) {
            fetchJobOrderDetails(formData.podNo);
        }
    }, [formData.podNo]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const response = await fetch('http://localhost:5000/bills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create registration');
            }
            console.log("response", response)
            const data = await response.json();
            console.log('Registration created:', data);

            setSubmitted(true); // Set submitted to true after successful submission
        } catch (error) {
            console.error('Error creating registration:', error.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? ( // Render form only if not submitted
                <>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">pod/ Create</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg sm:flex sm:flex-wrap gap-4">
                            <div className="mb-4">
                                <label htmlFor="billNo" className="block text-sm font-medium text-gray-700">Bill No</label>
                                <input type="text" id="billNo" name="billNo" value={formData.billNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="podNo" className="block text-sm font-medium text-gray-700">pod No</label>
                                <input type="text" id="podNo" name="podNo" value={formData.podNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
                                <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No</label>
                                <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billing Party</label>
                                <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="customerGSTIN" className="block text-sm font-medium text-gray-700">Billing customer GSTIN</label>
                                <input type="text" id="customerGSTIN" name="customerGSTIN" value={formData.customerGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Billing customer Address</label>
                                <input type="text" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
                                <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignorGSTIN" className="block text-sm font-medium text-gray-700">consignor GSTIN</label>
                                <input type="text" id="consignorGSTIN" name="consignorGSTIN" value={formData.consignorGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignorAddress" className="block text-sm font-medium text-gray-700">consignor Address</label>
                                <input type="text" id="consignorAddress" name="consignorAddress" value={formData.consignorAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
                                <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consigneeGSTIN" className="block text-sm font-medium text-gray-700">consignee GSTIN</label>
                                <input type="text" id="consigneeGSTIN" name="consigneeGSTIN" value={formData.consigneeGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consigneeAddress" className="block text-sm font-medium text-gray-700">consignee Address</label>
                                <input type="text" id="consigneeAddress" name="consigneeAddress" value={formData.consigneeAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
                                <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
                                <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
                                <input type="text" id="dimensions" name="dimensions" value={formData.dimensions} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
                                <input type="text" id="weight" name="weight" value={formData.weight} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="quantumrate" className="block text-sm font-medium text-gray-700">Quantum Rate</label>
                                <input type="text" id="quantumrate" name="quantumrate" value={formData.quantumrate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="effectiverate" className="block text-sm font-medium text-gray-700">Effective Rate</label>
                                <input type="text" id="effectiverate" name="effectiverate" value={formData.effectiverate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">Cost</label>
                                <input type="text" id="cost" name="cost" value={formData.cost} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No</label>
                                <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
                                <input type="date" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode</label>
                                <input type="text" id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode</label>
                                <input type="text" id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date</label>
                                <input type="date" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
                                <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                        </div>
                    </form>
                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-green-600">Registration submitted successfully!</h1>
                </div>
            )}
        </div>
    );
};

export default BillAc;



// import React, { useState, useEffect } from 'react';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';

// const BillAc = () => {
//     const [formData, setFormData] = useState({
//         billNo:'',
//         podNo:'',
//         consignmentno: '',
//         date: '',
//         jobOrder_no: '',
//         customer: '',
//         customerGSTIN: '',
//         customerAddress: '',
//         from: '',
//         to: '',
//         dimensions: '',
//         weight: '',
//         quantumrate: '',
//         effectiverate: '',
//         cost: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         expectedDate: '',
//         employee: '',
//         consignor: '',
//         consignorGSTIN: '',
//         consignorAddress: '',
//         consignee: '',
//         consigneeGSTIN: '',
//         consigneeAddress: '',

//     });

//     const [submitted, setSubmitted] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         const keys = name.split('.');
//         if (keys.length > 1) {
//             setFormData((prevFormData) => {
//                 let updatedFormData = { ...prevFormData };
//                 let nestedField = updatedFormData;
//                 for (let i = 0; i < keys.length - 1; i++) {
//                     nestedField = nestedField[keys[i]];
//                 }
//                 nestedField[keys[keys.length - 1]] = value;
//                 return updatedFormData;
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };
//     const fetchJobOrderDetails = async (podNo) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/pods/podno/${podNo}`);
//             const { customer,customerGSTIN,customerAddress, from, to, orderNo, orderDate, orderMode, serviceMode, expectedDate, employee, consignor,consignorGSTIN,consignorAddress, consignee,consigneeGSTIN,consigneeAddress } = response.data;
//             setFormData((prevFormData) => ({
//                 ...prevFormData,
//                 customer,
//                 customerGSTIN,
//                 customerAddress,
//                 from,
//                 to,
//                 orderNo,
//                 orderDate,
//                 orderMode,
//                 serviceMode,
//                 expectedDate,
//                 employee,
//                 consignor,
//                 consignorGSTIN,
//                 consignorAddress,
//                 consignee,
//                 consigneeGSTIN,
//                 consigneeAddress
//             }));
//         } catch (error) {
//             console.error('Error fetching job order details:', error);
//         }
//     };

//     useEffect(() => {
//         if (formData.consignmentno) {
//             fetchJobOrderDetails(formData.consignmentno);
//         }
//     }, [formData.consignmentno]);



//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log(formData);

//         try {
//             const response = await fetch('http://localhost:5000/bills', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create registration');
//             }
//             console.log("response", response)
//             const data = await response.json();
//             console.log('Registration created:', data);

//             setSubmitted(true); // Set submitted to true after successful submission
//             // Add any further actions you want to take after successful submission
//         } catch (error) {
//             console.error('Error creating registration:', error.message);
//             // Handle error state or display error message to user
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? ( // Render form only if not submitted
//                 <>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">pod/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg sm:flex sm:flex-wrap gap-4">
//                             <div className="mb-4">
//                                 <label htmlFor="billNo" className="block text-sm font-medium text-gray-700">Bill No</label>
//                                 <input type="text" id="billNo" name="billNo" value={formData.billNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="podNo" className="block text-sm font-medium text-gray-700">pod No</label>
//                                 <input type="text" id="podNo" name="podNo" value={formData.podNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
//                                 <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">Job Order No</label>
//                                 <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>

//                             <div className="mb-4">
//                                     <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                                     <input type="date"  name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billing Party</label>
//                                 <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="customerGSTIN" className="block text-sm font-medium text-gray-700">Billing customer GSTIN</label>
//                                 <input type="text" id="customerGSTIN" name="customerGSTIN" value={formData.customerGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="customerAddress" className="block text-sm font-medium text-gray-700">Billing customer Address</label>
//                                 <input type="text" id="customerAddress" name="customerAddress" value={formData.customerAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
//                                 <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignorGSTIN" className="block text-sm font-medium text-gray-700">consignor GSTIN</label>
//                                 <input type="text" id="consignorGSTIN" name="consignorGSTIN" value={formData.consignorGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignorAddress" className="block text-sm font-medium text-gray-700">consignor Address</label>
//                                 <input type="text" id="consignorAddress" name="consignorAddress" value={formData.consignorAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
//                                 <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consigneeGSTIN" className="block text-sm font-medium text-gray-700">consignee GSTIN</label>
//                                 <input type="text" id="consigneeGSTIN" name="consigneeGSTIN" value={formData.consigneeGSTIN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consigneeAddress" className="block text-sm font-medium text-gray-700">consignee Address</label>
//                                 <input type="text" id="consigneeAddress" name="consigneeAddress" value={formData.consigneeAddress} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
//                                 <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
//                                 <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No</label>
//                                 <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
//                                 <input type="text" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">Order Mode</label>
//                                 <input type="text" id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">Service Mode</label>
//                                 <input type="text" id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">Expected Date</label>
//                                 <input type="text" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
//                                 <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                         </div>
                       
//                     </form>
//                 </>
//             ) : (
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold mb-4 text-green-600">Registration submitted successfully!</h1>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BillAc;




// import React from 'react'

// function BillAc() {
//   return (
//     <div>
//       hi i am jagdoish
//     </div>
//   )
// }
// export default BillAc
