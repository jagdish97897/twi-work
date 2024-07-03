import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from 'axios';

const VehicleHire = () => {
    const [formData, setFormData] = useState({
        vehiclehire_no: '',
        consignmentno: '',
        type: '',
        payto: '',
        state: '',
        PAN: '',
        date: '',
        loadType: '',
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
        charges: []
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };




    const handleChargesChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCharges = formData.charges.map((charge, i) => {
            if (i === index) {
                const rate = parseFloat(value); // Convert rate to float
                const taxable = charge.taxable === 'true'; // Assuming taxable is a string 'true' or 'false'
                let amount = 0.00;
                let gst = 0.00;
                let total = 0.00;
    
                if (!isNaN(rate)) { // Check if rate is a valid number
                    if (taxable) {
                        amount = rate; // Example calculation based on taxable
                        total = amount; // Example total calculation
                    }
                } else {
                    console.error('Invalid rate value:', value);
                }
    
                return {
                    ...charge,
                    [name]: value,
                    amount: amount.toFixed(2), // Format amount to 2 decimal places
                    gst: gst.toFixed(2), // Format GST to 2 decimal places
                    total: total.toFixed(2) // Format total to 2 decimal places
                };
            }
            return charge;
        });
    
        setFormData({
            ...formData,
            charges: updatedCharges
        });
    };
    

    const sundries = [
        'Loading On Hire',
        'Other Charges On Hire',
        'TRANSACTION CHARGES',
        'STAFF FUND',
        'RTO',
    ];

    const fetchJobOrderDetails = async (consignmentno) => {
        try {
            const response = await axios.get(`http://localhost:5000/goodsReceipts/consignmentno/${consignmentno}`);
            const {
                loadType, customer, customerGSTIN, customerAddress, from, to,
                orderNo, orderDate, orderMode, serviceMode, expectedDate,
                employee, consignor, consignorGSTIN, consignorAddress,
                consignee, consigneeGSTIN, consigneeAddress
            } = response.data;
            setFormData((prevFormData) => ({
                ...prevFormData,
                loadType,
                customer,
                customerGSTIN,
                customerAddress,
                from,
                to,
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
        if (formData.consignmentno) {
            fetchJobOrderDetails(formData.consignmentno);
        }
    }, [formData.consignmentno]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const response = await fetch('http://localhost:5000/vehicle-hires', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to create registration');
            }

            const data = await response.json();
            console.log('Registration created:', data);

            setSubmitted(true); // Set submitted to true after successful submission
        } catch (error) {
            console.error('Error creating registration:', error.message);
            // Handle error state or display error message to user
        }
    };

    // Initialize charges state for each sundry
    useEffect(() => {
        const initialCharges = sundries.map(sundry => ({
            sundry,
            taxable: 'true',
            calcOn: 'FIXED',
            addDed: 'A',
            rate: 0.00,
            amount: 0.00,
            gst: 0.00,
            total: 0.00,
            remarks: ''
        }));
        setFormData(prevFormData => ({ ...prevFormData, charges: initialCharges }));
    }, []);

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? (
                <>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">VehicleHire/ Create</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
                            <div className='sm:flex sm:flex-wrap gap-4'>
                                <div className="mb-4">
                                    <label htmlFor="vehiclehire_no" className="block text-sm font-medium text-gray-700">Vehicle Hire No</label>
                                    <input type="text" id="vehiclehire_no" name="vehiclehire_no" value={formData.vehiclehire_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                    <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                        <option value="">Select Type</option>
                                        <option value="PICKUP">PICKUP</option>
                                        <option value="DELIVERY">DELIVERY</option>
                                        <option value="SUPPLYMENTRY">SUPPLYMENTRY</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="payto" className="block text-sm font-medium text-gray-700">Pay To</label>
                                    <select id="payto" name="payto" value={formData.payto} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                        <option value="">Select Payee</option>
                                        <option value="OWNER">OWNER</option>
                                        <option value="TRANSPORTER">TRANSPORTER</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="PAN" className="block text-sm font-medium text-gray-700">PAN</label>
                                    <input type="text" id="PAN" name="PAN" value={formData.PAN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
                                    <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">Load Type</label>
                                    <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
                                    <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
                                    <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
                                    <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
                                    <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
                                    <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                            </div>
                        </div>

                        <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
                            <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>
                            </TabList>

                            <TabPanel>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full bg-white border-collapse">
                                        <thead>
                                            <tr>
                                                <th className="px-4 py-2 border">Sundries</th>
                                                <th className="px-4 py-2 border">Taxable</th>
                                                <th className="px-4 py-2 border">Calc. On</th>
                                                <th className="px-4 py-2 border">Add/Ded</th>
                                                <th className="px-4 py-2 border">Rate</th>
                                                <th className="px-4 py-2 border">Amount</th>
                                                <th className="px-4 py-2 border">GST</th>
                                                <th className="px-4 py-2 border">Total</th>
                                                <th className="px-4 py-2 border">Remarks</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {formData.charges.map((charge, index) => (
                                                <tr key={index}>
                                                    <td className="px-4 py-2 border">{charge.sundry}</td>
                                                    <td className="px-4 py-2 border">
                                                        <input type="text" name="taxable" value={charge.taxable} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" />
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        <select name="calcOn" value={charge.calcOn} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded">
                                                            <option value="FIXED">FIXED</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        <select name="addDed" value={charge.addDed} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded">
                                                            <option value="A">A</option>
                                                            <option value="D">D</option>
                                                        </select>
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        <input
                                                            type="text"
                                                            name="rate"
                                                            value={charge.rate}
                                                            onChange={(e) => handleChargesChange(index, e)}
                                                            className="w-full p-2 border rounded"
                                                        />

                                                        {/* <input type="text" name="rate" value={charge.rate} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {/* <input type="text" name="amount" value={charge.amount} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
                                                        <input
                                                            type="text"
                                                            name="amount"
                                                            value={charge.amount}
                                                            readOnly // Make amount read-only as it's calculated
                                                            className="w-full p-2 border rounded"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {/* <input type="text" name="gst" value={charge.gst} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
                                                        <input
                                                            type="text"
                                                            name="gst"
                                                            value={charge.gst}
                                                            readOnly // Make GST read-only as it's calculated
                                                            className="w-full p-2 border rounded"
                                                        />

                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        {/* <input type="text" name="total" value={charge.total} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" /> */}
                                                        <input
                                                            type="text"
                                                            name="total"
                                                            value={charge.total}
                                                            readOnly // Make total read-only as it's calculated
                                                            className="w-full p-2 border rounded"
                                                        />
                                                    </td>
                                                    <td className="px-4 py-2 border">
                                                        <input type="text" name="remarks" value={charge.remarks} onChange={(e) => handleChargesChange(index, e)} className="w-full p-2 border rounded" />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </TabPanel>
                        </Tabs>
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

export default VehicleHire;




// import React, { useState, useEffect } from 'react';
// import 'react-tabs/style/react-tabs.css';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import axios from 'axios';

// const VehicleHire = () => {
//     const [formData, setFormData] = useState({
//         vehiclehire_no: '',
//         consignmentno: '',
//         type: '',
//         payto: '',
//         state: '',
//         PAN: '',
//         date: '',
//         loadType: '',
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
//         if (name.includes('.')) {
//             const [fieldName, nestedFieldName] = name.split('.');
//             setFormData({
//                 ...formData,
//                 [fieldName]: {
//                     ...formData[fieldName],
//                     [nestedFieldName]: value
//                 }
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };


//     const sundries = [
//         'Loading On Hire',
//         'Other Charges On Hire',
//         'TRANSACTION CHARGES',
//         'STAFF FUND',
//         'RTO',
//       ];
//     const fetchJobOrderDetails = async (consignmentno) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/goodsReceipts/consignmentno/${consignmentno}`);
//             const {
//                 loadType, customer, customerGSTIN, customerAddress, from, to,
//                 orderNo, orderDate, orderMode, serviceMode, expectedDate,
//                 employee, consignor, consignorGSTIN, consignorAddress,
//                 consignee, consigneeGSTIN, consigneeAddress
//             } = response.data;
//             setFormData((prevFormData) => ({
//                 ...prevFormData,
//                 loadType,
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
//             const response = await fetch('http://localhost:5000/vehicle-hires', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create registration');
//             }

//             const data = await response.json();
//             console.log('Registration created:', data);

//             setSubmitted(true); // Set submitted to true after successful submission
//         } catch (error) {
//             console.error('Error creating registration:', error.message);
//             // Handle error state or display error message to user
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? (
//                 <>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">VehicleHire/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//                         <div className='sm:flex sm:flex-wrap gap-4'>
//                             <div className="mb-4">
//                                 <label htmlFor="vehiclehire_no" className="block text-sm font-medium text-gray-700">Vehicle Hire No</label>
//                                 <input type="text" id="vehiclehire_no" name="vehiclehire_no" value={formData.vehiclehire_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
//                                 <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                     <option value="">Select Type</option>
//                                     <option value="PICKUP">PICKUP</option>
//                                     <option value="DELIVERY">DELIVERY</option>
//                                     <option value="SUPPLYMENTRY">SUPPLYMENTRY</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="payto" className="block text-sm font-medium text-gray-700">Pay To</label>
//                                 <select id="payto" name="payto" value={formData.payto} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                     <option value="">Select Payee</option>
//                                     <option value="OWNER">OWNER</option>
//                                     <option value="TRANSPORTER">TRANSPORTER</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//                                 <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="PAN" className="block text-sm font-medium text-gray-700">PAN</label>
//                                 <input type="text" id="PAN" name="PAN" value={formData.PAN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
//                                 <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">Load Type</label>
//                                 <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                                 <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billing Party</label>
//                                 <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
//                                 <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
//                                 <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
//                                 <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
//                                 <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
                

//                         </div>
//                         </div>

//                         <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
//                             <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>

//                             </TabList>


//                             <TabPanel>
//                             <div className="overflow-x-auto">
//       <table className="min-w-full bg-white border-collapse">
//         <thead>
//           <tr>
//             <th className="px-4 py-2 border">Sundries</th>
//             <th className="px-4 py-2 border">Taxable</th>
//             <th className="px-4 py-2 border">Calc. On</th>
//             <th className="px-4 py-2 border">Add/Ded</th>
//             <th className="px-4 py-2 border">Rate</th>
//             <th className="px-4 py-2 border">Amount</th>
//             <th className="px-4 py-2 border">GST</th>
//             <th className="px-4 py-2 border">Total</th>
//             <th className="px-4 py-2 border">Remarks</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sundries.map((item, index) => (
//             <tr key={index}>
//               <td className="px-4 py-2 border">{item}</td>
//               <td className="px-4 py-2 border">
//                 <input type="text" className="w-full p-2 border rounded" value="Y" />
//               </td>
//               <td className="px-4 py-2 border">
//                 <select className="w-full p-2 border rounded">
//                   <option>FIXED</option>
//                 </select>
//               </td>
//               <td className="px-4 py-2 border">
//                 <select className="w-full p-2 border rounded">
//                   <option>A</option>
//                   <option>D</option>
//                 </select>
//               </td>
//               <td className="px-4 py-2 border">
//                 <input type="text" className="w-full p-2 border rounded" value="0.00" />
//               </td>
//               <td className="px-4 py-2 border">
//                 <input type="text" className="w-full p-2 border rounded" value="0.00" />
//               </td>
//               <td className="px-4 py-2 border">
//                 <input type="text" className="w-full p-2 border rounded" />
//               </td>
//               <td className="px-4 py-2 border">
//                 <input type="text" className="w-full p-2 border rounded" />
//               </td>
//               <td className="px-4 py-2 border">
//                 <input type="text" className="w-full p-2 border rounded" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//                             </TabPanel>

//                         </Tabs>
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

// export default VehicleHire;



// import React, { useState, useEffect } from 'react';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';

// const VehicleHire = () => {
//     const [formData, setFormData] = useState({
//         vehiclehire_no:'',
//         consignmentno: '',
//         type:'',
//         payto:'',
//         state:'',
//         PAN:'',
//         date: '',
//         loadType: '',
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
//     const fetchJobOrderDetails = async (consignmentno) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/goodsReceipts/consignmentno/${consignmentno}`);
//             const {loadType, customer,customerGSTIN,customerAddress, from, to, orderNo, orderDate, orderMode, serviceMode, expectedDate, employee, consignor,consignorGSTIN,consignorAddress, consignee,consigneeGSTIN,consigneeAddress } = response.data;
//             setFormData((prevFormData) => ({
//                 ...prevFormData,
//                 loadType,
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
//             const response = await fetch('http://localhost:5000/vehicle-hires', {
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
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">VehicleHire/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg sm:flex sm:flex-wrap gap-4">
//                             <div className="mb-4">
//                                 <label htmlFor="vehiclehire_no" className="block text-sm font-medium text-gray-700">vehiclehire No</label>
//                                 <input type="text" id="vehiclehire_no" name="vehiclehire_no" value={formData.vehiclehire_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="type" className="block text-sm font-medium text-gray-700">type</label>
//                                 <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                     <option value="">Select Type</option>
//                                     <option value="Customer1">PICKUP</option>
//                                     <option value="Customer2">DELIVERY</option>
//                                     <option value="Customer2">SUPPLYMENTRY</option>
//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="payto" className="block text-sm font-medium text-gray-700">type</label>
//                                 <select id="payto" name="payto" value={formData.payto} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                     <option value="">Select Type</option>
//                                     <option value="Customer1">OWNER</option>
//                                     <option value="Customer2">TRANSPORTER</option>

//                                 </select>
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="state" className="block text-sm font-medium text-gray-700">state</label>
//                                 <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="PAN" className="block text-sm font-medium text-gray-700">PAN</label>
//                                 <input type="text" id="PAN" name="PAN" value={formData.PAN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
//                                 <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">loadType</label>
//                                 <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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

// export default VehicleHire;




// import React, { useState } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';

// const VehicleHire = () => {
//     const [formData, setFormData] = useState({
//         type: '',
//         code: '',
//         lastCode: '',
//         name: '',
//         printAs: '',
//         group: '',
//         expenseType: '',
//         subType: '',
//         controllingBranch: '',
//         parentAccount: '',
//         total: {
//           base: Number,
//           guaranteed_weight: Number,
//           kanta_weight: Number,
//           slip_no: String
//       },
//       vehicle_details: {
//         owner: String,
//         address: String,
//         pan: String,
//         mobile: String,
//         photo1: String,
//         photo2: String
//     },

//     driver_profile: {
//       name: String,
//       address: String,
//       mobile: String,
//       lic_no: String,
//       photo1: String,
//       photo2: String
//   },
//   broker_profile: {
//     mobile_no: String,
//     document_type: String,
//     photo1: String
// },
//         itr: {
//             ITRNo: '',
//             ITRSubmissionDate: '',
//             ITRAttachment: '',
//             Remarks: '',
//         },
//         generalDetails: {
//             marketingPerson: '',
//             bankUploadPrefix: '',
//             partyStatus: '',
//             reason: '',
//             paymentMethod: '',
//             paymentTerms: '',
//             creditLimit: '',
//             allocated: '',
//             deliveryPaymentMode: '',
//             deliveryAt: '',
//             outstandingAmt: '',
//             graceDays: '',
//             lockDate: '',
//             paymentBase: '',
//             billFor: '',
//             billAttachReport: '',
//             urlForTracking: '',
//             consignmentAttachReport: '',
//             introDate: '',
//             closeDate: '',
//             remarks: '',
//         },
//         bankDetails:{
//             bankName:'',
//             ifscCode:'',
//             mobile:'',
//             email:'',
//             branchName:'',
//             bankAccountNo:'',
//             beneficiaryName:'',
//             cancelledChequeOrPassbook:'',
//             remarks:'',
//         }

//     });

//     const [submitted, setSubmitted] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.includes('.')) {
//             const [fieldName, nestedFieldName] = name.split('.');
//             setFormData({
//                 ...formData,
//                 [fieldName]: {
//                     ...formData[fieldName],
//                     [nestedFieldName]: value
//                 }
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };

//     // Corrected handleChange for nested address fields
//     const handleTotalChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };

//     // Similarly for correctAddress
//     const handleVehicleDetailsChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };

//     // Similarly for correctAddress
//     const handleDriverProfileChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };
//     const handleBrokerProfileChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };

//     const handleItrChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };
//     const handleGeneralDetailsChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };
//     const handleBankDetailsChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData({
//             ...formData,
//             [parentField]: {
//                 ...formData[parentField],
//                 [fieldName]: value
//             }
//         });
//     };



//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5000/partiesregistrations', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(formData)
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create registration');
//             }

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
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">Vehicle Hire</h1>

//                     <form onSubmit={handleSubmit} >
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//                          <div className='sm:flex sm:flex-wrap gap-4'>
//     {/* Document Type */}
//     <div className="mb-4">
//         <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">Document Type</label>
//         <select id="document_type" name="document_type" value={formData.document_type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" required>
//             <option value="">Select Document Type</option>
//             {/* Add options based on DocumentTypeEnum */}
//         </select>
//     </div>
    
//     {/* Type */}
//     <div className="mb-4">
//         <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
//         <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" required>
//             <option value="">Select Vehicle Type</option>
//             {/* Add options based on TypeEnum */}
//         </select>
//     </div>
    
//     {/* Broker Name */}
//     <div className="mb-4">
//         <label htmlFor="broker_name" className="block text-sm font-medium text-gray-700">Broker Name</label>
//         <input type="text" id="broker_name" name="broker_name" value={formData.broker_name} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Vehicle Number */}
//     <div className="mb-4">
//         <label htmlFor="vehicle_number" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
//         <input type="text" id="vehicle_number" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" required />
//     </div>
    
//     {/* Date */}
//     <div className="mb-4">
//         <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//         <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Source */}
//     <div className="mb-4">
//         <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
//         <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" required />
//     </div>
    
//     {/* Destination */}
//     <div className="mb-4">
//         <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
//         <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" required />
//     </div>
    
//     {/* Via */}
//     <div className="mb-4">
//         <label htmlFor="via" className="block text-sm font-medium text-gray-700">Via</label>
//         <input type="text" id="via" name="via" value={formData.via} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Multiple Delivery Point */}
//     <div className="mb-4">
//     <label className="block text-sm font-medium text-gray-700">Multiple Delivery Point</label>
//     <div className="flex items-center">

//         <input type="radio" id="multiple_delivery_point_yes" name="multiple_delivery_point" value={true}  onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//         <label htmlFor="multiple_delivery_point_yes" className="mr-4 text-sm text-gray-700">Yes</label>
        
//         <input type="radio" id="multiple_delivery_point_no" name="multiple_delivery_point" value={false}  onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//         <label htmlFor="multiple_delivery_point_no" className="text-sm text-gray-700">No</label>
//     </div>
// </div>

    
//     {/* Manifest No */}
//     <div className="mb-4">
//         <label htmlFor="manifest_no" className="block text-sm font-medium text-gray-700">Manifest No</label>
//         <input type="text" id="manifest_no" name="manifest_no" value={formData.manifest_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Placement No */}
//     <div className="mb-4">
//         <label htmlFor="placement_no" className="block text-sm font-medium text-gray-700">Placement No</label>
//         <input type="text" id="placement_no" name="placement_no" value={formData.placement_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Contents */}
//     <div className="mb-4">
//         <label htmlFor="contents" className="block text-sm font-medium text-gray-700">Contents</label>
//         <input type="text" id="contents" name="contents" value={formData.contents} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Vehicle */}
//     <div className="mb-4">
//         <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle</label>
//         <input type="text" id="vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Load Type */}
//     <div className="mb-4">
//         <label htmlFor="load_type" className="block text-sm font-medium text-gray-700">Load Type</label>
//         <select id="load_type" name="load_type" value={formData.load_type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//             <option value="">Select Load Type</option>
//             {/* Add options based on LoadTypeEnum */}
//         </select>
//     </div>
    
//     {/* Pay to Transporter */}
//     <div className="mb-4">
//         <label htmlFor="pay_to_transporter" className="block text-sm font-medium text-gray-700">Pay to Transporter</label>
//         <select id="pay_to_transporter" name="pay_to_transporter" value={formData.pay_to_transporter} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" required>
//             <option value="">Select Pay to Transporter</option>
//             {/* Add options based on PayToTransporterEnum */}
//         </select>
//     </div>
    
//     {/* State */}
//     <div className="mb-4">
//         <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
//         <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* PAN */}
//     <div className="mb-4">
//         <label htmlFor="pan" className="block text-sm font-medium text-gray-700">PAN</label>
//         <input type="text" id="pan" name="pan" value={formData.pan} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Reporting */}
//     <div className="mb-4">
//         <label htmlFor="reporting" className="block text-sm font-medium text-gray-700">Reporting</label>
//         <select id="reporting" name="reporting" value={formData.reporting} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//             <option value="">Select Reporting</option>
//             {/* Add options based on ReportingEnum */}
//         </select>
//     </div>
    
//     {/* Expected Delivery Date */}
//     <div className="mb-4">
//         <label htmlFor="expected_delivery_date" className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
//         <input type="date" id="expected_delivery_date" name="expected_delivery_date" value={formData.expected_delivery_date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//     </div>
    
//     {/* Mode */}
//     <div className="mb-4">
//         <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode</label>
//         <select id="mode" name="mode" value={formData.mode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//             <option value="">Select Mode</option>
//             {/* Add options based on ModeEnum */}
//         </select>
//     </div>
    
//     {/* Placed By */}
//     <div className="mb-4">
//         <label htmlFor="placed_by" className="block text-sm font-medium text-gray-700">Placed By</label>
//         <select id="placed_by" name="placed_by" value={formData.placed_by} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//             <option value="">Select Placed By</option>
//             <option value="BROKER">Broker</option>
//             <option value="DIRECT">Direct</option>
//         </select>
//     </div>
//     </div>
// </div>


//                         <Tabs className="bg-[#FFFFFF] pt-2">
//                             <TabList className="flex flex-wrap border-b border-gray-200">
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Total</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Vehicle Details</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Driver Profile</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Broker Profile</Tab>
                               
//                             </TabList>

//                             {/* Total Tab Panel */}
//                             <TabPanel>
//     <div className="grid grid-cols-6 gap-6 p-2">
//         {/* Total Base */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="total.base" className="block text-sm font-medium text-gray-700">Base</label>
//             <input type="number" id="total.base" name="total.base" value={formData.total.base} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Total Guaranteed Weight */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="total.guaranteed_weight" className="block text-sm font-medium text-gray-700">Guaranteed Weight</label>
//             <input type="number" id="total.guaranteed_weight" name="total.guaranteed_weight" value={formData.total.guaranteed_weight} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Total Kanta Weight */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="total.kanta_weight" className="block text-sm font-medium text-gray-700">Kanta Weight</label>
//             <input type="number" id="total.kanta_weight" name="total.kanta_weight" value={formData.total.kanta_weight} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Total Slip No */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="total.slip_no" className="block text-sm font-medium text-gray-700">Slip No</label>
//             <input type="text" id="total.slip_no" name="total.slip_no" value={formData.total.slip_no} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
//         </div>
//     </div>
// </TabPanel>


//                            {/*VehicleDetailsChange  */}
// <TabPanel>
 
//     <div className="grid grid-cols-6 gap-6 p-2">
//         {/* Owner */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="vehicle_owner" className="block text-sm font-medium text-gray-700">Owner</label>
//             <input type="text" id="vehicle_owner" name="vehicle_owner" value={formData.vehicle_owner} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Address */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="vehicle_address" className="block text-sm font-medium text-gray-700">Address</label>
//             <input type="text" id="vehicle_address" name="vehicle_address" value={formData.vehicle_address} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* PAN */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="vehicle_pan" className="block text-sm font-medium text-gray-700">PAN</label>
//             <input type="text" id="vehicle_pan" name="vehicle_pan" value={formData.vehicle_pan} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Mobile */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="vehicle_mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
//             <input type="text" id="vehicle_mobile" name="vehicle_mobile" value={formData.vehicle_mobile} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Photo 1 */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="vehicle_photo1" className="block text-sm font-medium text-gray-700">Photo 1</label>
//             <input type="file" id="vehicle_photo1" name="vehicle_photo1" value={formData.vehicle_photo1} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Photo 2 */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="vehicle_photo2" className="block text-sm font-medium text-gray-700">Photo 2</label>
//             <input type="file" id="vehicle_photo2" name="vehicle_photo2" value={formData.vehicle_photo2} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Remarks */}
//         <div className="col-span-6">
//             <label htmlFor="vehicle_remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//             <textarea id="vehicle_remarks" name="vehicle_remarks" value={formData.vehicle_remarks} onChange={handleVehicleDetailsChange} rows="3" className="input w-full border border-black shadow-md" />
//         </div>
//     </div>
// </TabPanel>

// {/* Driver Profile Change */}
// <TabPanel>
//     <div className="grid grid-cols-6 gap-6 p-2">
//         {/* Driver Name */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="driver_name" className="block text-sm font-medium text-gray-700">Driver Name</label>
//             <input type="text" id="driver_name" name="driver_name" value={formData.driver_name} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Address */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="driver_address" className="block text-sm font-medium text-gray-700">Address</label>
//             <input type="text" id="driver_address" name="driver_address" value={formData.driver_address} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Mobile */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="driver_mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
//             <input type="text" id="driver_mobile" name="driver_mobile" value={formData.driver_mobile} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* License Number */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="driver_license_no" className="block text-sm font-medium text-gray-700">License Number</label>
//             <input type="text" id="driver_license_no" name="driver_license_no" value={formData.driver_license_no} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Photo 1 */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="driver_photo1" className="block text-sm font-medium text-gray-700">Photo 1</label>
//             <input type="file" id="driver_photo1" name="driver_photo1" value={formData.driver_photo1} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Photo 2 */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="driver_photo2" className="block text-sm font-medium text-gray-700">Photo 2</label>
//             <input type="file" id="driver_photo2" name="driver_photo2" value={formData.driver_photo2} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//     </div>
// </TabPanel>

// {/* Broker Profile Change */}
// <TabPanel>
//     <div className="grid grid-cols-6 gap-6 p-2">
//         {/* Mobile Number */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="broker_mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number</label>
//             <input type="text" id="broker_mobile_no" name="broker_mobile_no" value={formData.broker_mobile_no} onChange={handleBrokerProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Document Type */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="broker_document_type" className="block text-sm font-medium text-gray-700">Document Type</label>
//             <input type="text" id="broker_document_type" name="broker_document_type" value={formData.broker_document_type} onChange={handleBrokerProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//         {/* Photo 1 */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="broker_photo1" className="block text-sm font-medium text-gray-700">Photo 1</label>
//             <input type="file" id="broker_photo1" name="broker_photo1" value={formData.broker_photo1} onChange={handleBrokerProfileChange} className="input w-full border border-black shadow-md" />
//         </div>
//     </div>
// </TabPanel>




//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-2">
//                                     {/* PAN */}
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="itr.ITRNo" className="block text-sm font-medium text-gray-700">ITRNo</label>
//                                         <input type="text" id="itr.ITRNo" name="itr.ITRNo" value={formData.itr.ITRNo} onChange={handleItrChange} className="input w-full border border-black shadow-md" />
//                                     </div>

//                                     {/* TAN No */}
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="itr.ITRAttachment" className="block text-sm font-medium text-gray-700">ITRAttachment</label>
//                                         <input type="text" id="itr.ITRAttachment" name="itr.ITRAttachment" value={formData.itr.ITRAttachment} onChange={handleItrChange} className="input w-full border border-black shadow-md" />
//                                     </div>

//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="itr.ITRSubmissionDate" className="block text-sm font-medium text-gray-700">ITRSubmissionDate</label>
//                                         <input type="date" id="itr.ITRSubmissionDate" name="itr.ITRSubmissionDate" value={formData.itr.ITRSubmissionDate} onChange={handleItrChange} className="input w-full border border-black shadow-md" />
//                                     </div>


                                    
                                

//                                     <div className="col-span-6">
//                                         <label htmlFor="itr.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="itr.Remarks" name="itr.Remarks" value={formData.itr.remarks} onChange={handleItrChange} rows="3" className="input w-full border border-black shadow-md" />
//                                     </div>
//                                 </div>
//                             </TabPanel>




//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-2">
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.marketingPerson" className="block text-sm font-medium text-gray-700">marketingPerson</label>
//                                         <input type="text" id="generalDetails.marketingPerson" name="generalDetails.marketingPerson" value={formData.generalDetails.marketingPerson} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>


//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.bankUploadPrefix" className="block text-sm font-medium text-gray-700">bankUploadPrefix</label>
//                                         <input type="text" id="generalDetails.bankUploadPrefix" name="generalDetails.bankUploadPrefix" value={formData.generalDetails.bankUploadPrefix} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>

//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.partyStatus" className="block text-sm font-medium text-gray-700">partyStatus</label>
//                                         <select id="generalDetails.partyStatus" name="generalDetails.partyStatus" value={formData.generalDetails.partyStatus} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="blacklisted">blacklisted</option>
//                                             <option value="stop payment">stop payment</option>
//                                         </select>
//                                     </div>

//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.paymentMethod" className="block text-sm font-medium text-gray-700">paymentMethod</label>
//                                         <select id="generalDetails.paymentMethod" name="generalDetails.paymentMethod" value={formData.generalDetails.paymentMethod} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="TO BB">TO BB</option>
//                                             <option value="CASH">CASH</option>
//                                             <option value="FOC">FOC</option>
//                                             <option value="TO PAY">TO PAY</option>

//                                         </select>
//                                     </div>

//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.paymentTerms" className="block text-sm font-medium text-gray-700">Payment Terms</label>
//                                         <input type="text" id="generalDetails.paymentTerms" name="generalDetails.paymentTerms" value={formData.generalDetails.paymentTerms} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.creditLimit" className="block text-sm font-medium text-gray-700">Credit Limit</label>
//                                         <input type="text" id="generalDetails.creditLimit" name="generalDetails.creditLimit" value={formData.generalDetails.creditLimit} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.allocated" className="block text-sm font-medium text-gray-700">Allocated</label>
//                                         <select id="generalDetails.allocated" name="generalDetails.allocated" value={formData.generalDetails.allocated} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="Consignment">Consignment</option>
//                                             <option value="bill">Bill</option>
//                                             <option value="manifest">Manifest</option>
//                                             <option value="vehicle Hire">Vehicle Hire</option>
//                                             <option value="Vehicle">Vehicle</option>
//                                             <option value="Cost Center">Cost Center</option>
//                                             <option value="Job Wise">Job Wise</option>
//                                         </select>
//                                     </div>


//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.deliveryPaymentMode" className="block text-sm font-medium text-gray-700">Delivery Payment Mode</label>
//                                         <select id="generalDetails.deliveryPaymentMode" name="generalDetails.deliveryPaymentMode" value={formData.generalDetails.deliveryPaymentMode} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="CASH">CASH</option>
//                                             <option value="CHEQUE">CHEQUE</option>
//                                             <option value="CREDIT">CREDIT</option>
//                                             <option value="MULTI">MULTI</option>
//                                             <option value="OTHER">OTHER</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.deliveryAt" className="block text-sm font-medium text-gray-700">Delivery At</label>
//                                         <select id="generalDetails.deliveryAt" name="generalDetails.deliveryAt" value={formData.generalDetails.deliveryAt} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="DIRECT">DIRECT</option>
//                                             <option value="DOOR">DOOR</option>
//                                             <option value="DOOR TO DOOR">DOOR TO DOOR</option>
//                                             <option value="DOOR TO TERMINAL">DOOR TO TERMINAL</option>
//                                             <option value="GODOWN">GODOWN</option>
//                                             <option value="LOCAL DELIVERY">LOCAL DELIVERY</option>
//                                             <option value="TERMINAL TO DOOR">TERMINAL TO DOOR</option>
//                                             <option value="TERMINAL TO TERMINAL">TERMINAL TO TERMINAL</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.outstandingAmt" className="block text-sm font-medium text-gray-700">Outstanding Amount</label>
//                                         <input type="text" id="generalDetails.outstandingAmt" name="generalDetails.outstandingAmt" value={formData.generalDetails.outstandingAmt} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.graceDays" className="block text-sm font-medium text-gray-700">Grace Days</label>
//                                         <input type="number" id="generalDetails.graceDays" name="generalDetails.graceDays" value={formData.generalDetails.graceDays} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.lockDate" className="block text-sm font-medium text-gray-700">Lock Date</label>
//                                         <input type="date" id="generalDetails.lockDate" name="generalDetails.lockDate" value={formData.generalDetails.lockDate} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.paymentBase" className="block text-sm font-medium text-gray-700">Payment Base</label>
//                                         <select id="generalDetails.paymentBase" name="generalDetails.paymentBase" value={formData.generalDetails.paymentBase} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="BOTH">BOTH</option>
//                                             <option value="VEHICAL HIRE">VEHICAL HIRE</option>
//                                             <option value="MANIFEST">MANIFEST</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.billFor" className="block text-sm font-medium text-gray-700">Bill For</label>
//                                         <input type="text" id="generalDetails.billFor" name="generalDetails.billFor" value={formData.generalDetails.billFor} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.billAttachReport" className="block text-sm font-medium text-gray-700">Bill Attach Report</label>
//                                         <input type="text" id="generalDetails.billAttachReport" name="generalDetails.billAttachReport" value={formData.generalDetails.billAttachReport} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.urlForTracking" className="block text-sm font-medium text-gray-700">URL For Tracking</label>
//                                         <input type="text" id="generalDetails.urlForTracking" name="generalDetails.urlForTracking" value={formData.generalDetails.urlForTracking} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.consignmentAttachReport" className="block text-sm font-medium text-gray-700">Consignment Attach Report</label>
//                                         <select id="generalDetails.consignmentAttachReport" name="generalDetails.consignmentAttachReport" value={formData.generalDetails.consignmentAttachReport} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
//                                             <option value="">Select</option>
//                                             <option value="PrintConsignment.rpt">PrintConsignment.rpt</option>
//                                             <option value="PrintConsignmentDedicated.rpt">PrintConsignmentDedicated.rpt</option>
//                                             <option value="PrintConsignmentLabel.rpt">PrintConsignmentLabel.rpt</option>
//                                             <option value="PrintConsignment_VTPL.rpt">PrintConsignment_VTPL.rpt</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.introDate" className="block text-sm font-medium text-gray-700">Intro Date</label>
//                                         <input type="date" id="generalDetails.introDate" name="generalDetails.introDate" value={formData.generalDetails.introDate} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="generalDetails.closeDate" className="block text-sm font-medium text-gray-700">Close Date</label>
//                                         <input type="date" id="generalDetails.closeDate" name="generalDetails.closeDate" value={formData.generalDetails.closeDate} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="generalDetails.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="generalDetails.remarks" name="generalDetails.remarks" value={formData.generalDetails.remarks} onChange={handleGeneralDetailsChange} rows="3" className="input w-full border border-black shadow-md" />
//                                     </div>






//                                 </div>
//                             </TabPanel>



//                             <TabPanel>
//     <div className="grid grid-cols-6 gap-6 p-2">
//         {/* Bank Name */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
//             <input type="text" id="bankDetails.bankName" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* IFSC Code */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
//             <input type="text" id="bankDetails.ifscCode" name="bankDetails.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* Mobile */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
//             <input type="text" id="bankDetails.mobile" name="bankDetails.mobile" value={formData.bankDetails.mobile} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* Email */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.email" className="block text-sm font-medium text-gray-700">Email</label>
//             <input type="text" id="bankDetails.email" name="bankDetails.email" value={formData.bankDetails.email} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* Branch Name */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
//             <input type="text" id="bankDetails.branchName" name="bankDetails.branchName" value={formData.bankDetails.branchName} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* Bank A/C No. */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.bankAccountNo" className="block text-sm font-medium text-gray-700">Bank A/C No.</label>
//             <input type="text" id="bankDetails.bankAccountNo" name="bankDetails.bankAccountNo" value={formData.bankDetails.bankAccountNo} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* Beneficiary Name */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.beneficiaryName" className="block text-sm font-medium text-gray-700">Beneficiary Name</label>
//             <input type="text" id="bankDetails.beneficiaryName" name="bankDetails.beneficiaryName" value={formData.bankDetails.beneficiaryName} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
//         </div>

//         {/* Cancelled Cheque or PassBook Remarks */}
//         <div className="col-span-6 sm:col-span-3">
//             <label htmlFor="bankDetails.cancelledChequeOrPassbook" className="block text-sm font-medium text-gray-700">Cancelled Cheque or PassBook </label>
//             <input type="text" id="bankDetails.cancelledChequeOrPassbook" name="bankDetails.cancelledChequeOrPassbook" value={formData.bankDetails.cancelledChequeOrPassbook} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md"/>
//         </div>

//         {/* Remarks */}
//         <div className="col-span-6">
//             <label htmlFor="bankDetails.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//             <textarea id="bankDetails.remarks" name="bankDetails.remarks" value={formData.bankDetails.remarks} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md"></textarea>
//         </div>
//     </div>
// </TabPanel>




//                         </Tabs>

//                         {/* Submit button */}

//                     </form>
//                 </>
//             ) : (
//                 <div className="text-center">
//                     <h1 className="text-3xl font-bold mb-4">Registration submitted successfully!</h1>
//                 </div>

//             )}
//         </div>
//     );
// };

// export default VehicleHire;




// import React from 'react'

// function VehicleHire() {
//   return (
//     <div>
//       vehicle hire
//     </div>
//   )
// }

// export default VehicleHire
