


import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Consignment = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        consignmentno: '',
        jobOrder_no: '',
        date: '',
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
        charges: [],
        container: {
            linename: '',
            date: '',
            loc: '',
            cgw: '',
            loadingno: '',
            loadingdate: '',
            Remarks: '',
        },
        cod: {
            favouring: '',
            amount: 0,
            mode: 'CASH',
            cancelReason: '',
        }
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length > 1) {
            setFormData((prevFormData) => {
                let updatedFormData = { ...prevFormData };
                let nestedField = updatedFormData;
                for (let i = 0; i < keys.length - 1; i++) {
                    nestedField = nestedField[keys[i]];
                }
                nestedField[keys[keys.length - 1]] = value;
                return updatedFormData;
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
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
        'STATISTICAL CHARGES',
        'Loading Charge',
        'OTHER CHARGES',
        'LOADING DETENTION',
        'ODC LENGTH',
    ];
    const fetchJobOrderDetails = async (jobOrderNo) => {
        try {
            const response = await axios.get(`http://localhost:5000/job-orders/${jobOrderNo}`);
            const { customer,customerGSTIN,customerAddress, from, to, orderNo, orderDate, orderMode, serviceMode, expectedDate, employee, consignor,consignorGSTIN,consignorAddress, consignee,consigneeGSTIN,consigneeAddress } = response.data;
            setFormData((prevFormData) => ({
                ...prevFormData,
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
        if (formData.jobOrder_no) {
            fetchJobOrderDetails(formData.jobOrder_no);
        }
    }, [formData.jobOrder_no]);

    const handleContainerChange = (e) => {
        const { name, value } = e.target;
        const [parentField, fieldName] = name.split('.');
        setFormData({
            ...formData,
            [parentField]: {
                ...formData[parentField],
                [fieldName]: value
            }
        });
    };

    const handleCODChange = (e) => {
        const { name, value } = e.target;
        const [parentField, fieldName] = name.split('.');
        setFormData({
            ...formData,
            [parentField]: {
                ...formData[parentField],
                [fieldName]: value
            }
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(formData);

        try {
            const response = await fetch('http://localhost:5000/goods-receipts', {
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
            // Add any further actions you want to take after successful submission
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

    const handleListClick = () => {
        navigate('/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewconsignment');
      };

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? ( // Render form only if not submitted
                <>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment/ Create</h1>
                    <form onSubmit={handleSubmit}>
                    <div className="mt-1 mb-4 flex justify-between">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>

                            <button
            type="button"
            onClick={handleListClick}
            className="btn bg-blue-500 text-white py-2 px-4 border border-black hover:bg-blue-600"
          >
            List view
          </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
                        <div className='sm:flex sm:flex-wrap gap-4'>
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
                                    <input type="date"  name="date" value={formData.date} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
                                <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">Order No</label>
                                <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">Order Date</label>
                                <input type="text" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
                                <input type="text" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="employee" className="block text-sm font-medium text-gray-700">Employee</label>
                                <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                        </div>
                        </div>
                        <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
                            <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Container</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">COD</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>
                            </TabList>
                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-4">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
                                        <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Slot Validity Date</label>
                                        <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Lot Of Container</label>
                                        <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">Container Gross Weight</label>
                                        <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
                                        <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading/Shifting Date</label>
                                        <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="container.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="container.Remarks" name="container.Remarks" value={formData.container.Remarks} onChange={handleContainerChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-4">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
                                        <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
                                        <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="CHEQUE">CHEQUE</option>
                                            <option value="ATM">ATM</option>
                                            <option value="CASH">CASH</option>
                                            <option value="DD">DD</option>
                                            <option value="ECS">ECS</option>
                                            <option value="NEFT">NEFT</option>
                                            <option value="IMPS">IMPS</option>
                                            <option value="RTGS">RTGS</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
                                        <textarea id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                </div>
                            </TabPanel>
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

export default Consignment;





// import React, { useState, useEffect } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';

// const Consignment = () => {
//     const [formData, setFormData] = useState({
//         consignmentno: '',
//         vehicle_placement_no: '',
//         date: '',
//         additem: [],

//         container: {
//             linename: '',
//             date: '',
//             loc: '',
//             cgw: '',
//             loadingno: '',
//             loadingdate: '',
//             remarks: '',
//         },
//         cod: {
//             favouring: '',
//             amount: 0,
//             mode: 'CASH',
//             cancelReason: '',
//         }
//     });

//     const [submitted, setSubmitted] = useState(false);

//     const [newItem, setNewItem] = useState({
//         from: '',
//         to: [''],
//         QUANTUMRATE: '',
//         EFFECTIVERATE: 0
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name.includes('.')) {
//             const [fieldName, nestedFieldName] = name.split('.');
//             setFormData(prevState => ({
//                 ...prevState,
//                 [fieldName]: {
//                     ...prevState[fieldName],
//                     [nestedFieldName]: value
//                 }
//             }));
//         } else {
//             setFormData(prevState => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };

//     const handleItemChange = (e) => {
//         const { name, value } = e.target;
//         setNewItem(prevItem => ({
//             ...prevItem,
//             [name]: value
//         }));
//     };

//     const handleToChange = (e, index) => {
//         const { value } = e.target;
//         setNewItem(prevItem => {
//             const updatedTo = [...prevItem.to];
//             updatedTo[index] = value;
//             return {
//                 ...prevItem,
//                 to: updatedTo
//             };
//         });
//     };

//     const addDestination = () => {
//         setNewItem(prevItem => ({
//             ...prevItem,
//             to: [...prevItem.to, '']
//         }));
//     };

//     const removeDestination = (index) => {
//         setNewItem(prevItem => ({
//             ...prevItem,
//             to: prevItem.to.filter((_, i) => i !== index)
//         }));
//     };

//     const fetchVehiclePlacementDetails = async (vehicle_placement_no) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/vehicleNumber-placements/${vehicle_placement_no}`);
//             const { date } = response.data;
//             setFormData(prevFormData => ({
//                 ...prevFormData,
//                 date
//             }));
//         } catch (error) {
//             console.error('Error fetching vehicle placement details:', error);
//         }
//     };

//     useEffect(() => {
//         if (formData.vehicle_placement_no) {
//             fetchVehiclePlacementDetails(formData.vehicle_placement_no);
//         }
//     }, [formData.vehicle_placement_no]);

//     const handleContainerChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData(prevState => ({
//             ...prevState,
//             [parentField]: {
//                 ...prevState[parentField],
//                 [fieldName]: value
//             }
//         }));
//     };

//     const handleCODChange = (e) => {
//         const { name, value } = e.target;
//         const [parentField, fieldName] = name.split('.');
//         setFormData(prevState => ({
//             ...prevState,
//             [parentField]: {
//                 ...prevState[parentField],
//                 [fieldName]: value
//             }
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(formData);
//         try {
//             const response = await fetch('http://localhost:5000/goods-receipts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     additem: [newItem]  // Add the new item to the additem array
//                 })
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to create registration');
//             }
//             const data = await response.json();
//             console.log('Registration created:', data);

//             setSubmitted(true); // Set submitted to true after successful submission
//         } catch (error) {
//             console.error('Error creating registration:', error.message);
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? (
//                 <>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//                             <div className='sm:flex sm:flex-wrap gap-4'>
//                                 <div className="mb-4">
//                                     <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
//                                     <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="vehicle_placement_no" className="block text-sm font-medium text-gray-700">Vehicle placement no</label>
//                                     <input type="text" id="vehicle_placement_no" name="vehicle_placement_no" value={formData.vehicle_placement_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                                     <input type="text" id="date" name="date" value={formData.date} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                 </div>
//                             </div>
//                         </div>
//                         <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
//                             <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Total</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Container</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">COD</Tab>
//                             </TabList>
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-4">
//                                     {/* Add fields if necessary */}
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="grid grid-cols-2 gap-4 p-4">
//                                     <div className="mb-4">
//                                         <label className="text-sm mb-1" htmlFor="from">From</label>
//                                         <input
//                                             type="text"
//                                             id="from"
//                                             name="from"
//                                             value={newItem.from}
//                                             onChange={handleItemChange}
//                                             required
//                                             className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                         />
//                                     </div>

//                                     {newItem.to.map((destination, index) => (
//                                         <div key={index} className="mb-4 col-span-2 flex">
//                                             <div className="flex-1">
//                                                 <label className="text-sm mb-1" htmlFor={`to-${index}`}>To</label>
//                                                 <input
//                                                     type="text"
//                                                     id={`to-${index}`}
//                                                     name={`to-${index}`}
//                                                     value={destination}
//                                                     onChange={(e) => handleToChange(e, index)}
//                                                     required
//                                                     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                                 />
//                                             </div>
//                                             <div className="flex items-end">
//                                                 <button type="button" onClick={() => removeDestination(index)} className="ml-2 p-2 border border-red-300 rounded-md shadow-sm text-red-500 hover:bg-red-100">Remove</button>
//                                             </div>
//                                         </div>
//                                     ))}

//                                     <div className="mb-4 col-span-2">
//                                         <button type="button" onClick={addDestination} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                             Add Another Destination
//                                         </button>
//                                     </div>

//                                     <div className="mb-4">
//                                         <label className="text-sm mb-1" htmlFor="QUANTUMRATE">Quantum Rate</label>
//                                         <input
//                                             type="text"
//                                             id="QUANTUMRATE"
//                                             name="QUANTUMRATE"
//                                             value={newItem.QUANTUMRATE}
//                                             onChange={handleItemChange}
//                                             required
//                                             className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                         />
//                                     </div>

//                                     <div className="mb-4">
//                                         <label className="text-sm mb-1" htmlFor="EFFECTIVERATE">Effective Rate</label>
//                                         <input
//                                             type="number"
//                                             id="EFFECTIVERATE"
//                                             name="EFFECTIVERATE"
//                                             value={newItem.EFFECTIVERATE}
//                                             onChange={handleItemChange}
//                                             required
//                                             className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                         />
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="grid grid-cols-2 gap-4 p-4">
//                                     <div className="mb-4">
//                                         <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
//                                         <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Date</label>
//                                         <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Location</label>
//                                         <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">CGW</label>
//                                         <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
//                                         <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading Date</label>
//                                         <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4 col-span-2">
//                                         <label htmlFor="container.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="container.remarks" name="container.remarks" value={formData.container.remarks} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3"></textarea>
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="grid grid-cols-2 gap-4 p-4">
//                                     <div className="mb-4">
//                                         <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
//                                         <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
//                                         <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
//                                         <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                             <option value="CASH">Cash</option>
//                                             <option value="CHEQUE">Cheque</option>
//                                         </select>
//                                     </div>
//                                     <div className="mb-4 col-span-2">
//                                         <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
//                                         <input type="text" id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                         </Tabs>
//                     </form>
//                 </>
//             ) : (
//                 <div className='text-center'>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">Form Submitted Successfully</h1>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Consignment;


// import React, { useState, useEffect } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';

// const Consignment = () => {
//     const [formData, setFormData] = useState({
//         consignmentno: '',
//         vehicle_placement_no: '',
//         date: '',
//         paymentto: '',
//         jobOrder_no: '',
//         vehicleNo: '',
//         loadType: '',
//         consignor: '',
//         consignorGSTIN: '',
//         consignorAddress: '',
//         consignee: '',
//         consigneeGSTIN: '',
//         consigneeAddress: '',
//         customer: '',
//         from: '',
//         to: '',
//         dimensions: '',
//         weight: '',
//         quantumrate: '',
//         effectiverate: '',
//         cost: '',
//         additem: '',

//         container: {
//             linename: '',
//             date: '',
//             loc: '',
//             cgw: '',
//             loadingno: '',
//             loadingdate: '',
//             Remarks: '',
//         },
//         cod: {
//             favouring: '',
//             amount: 0,
//             mode: 'CASH',
//             cancelReason: '',
//         }
//     });

//     const [submitted, setSubmitted] = useState(false);

//     const [newItem, setNewItem] = useState({
//         from: '',
//         to: [''],
//         QUANTUMRATE: '',
//         EFFECTIVERATE: 0
//       });

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

//     const handleItemChange = (e) => {
//         const { name, value } = e.target;
//         let updatedItem = { ...newItem, [name]: value };
    
//         setNewItem({ ...updatedItem });
//       };

//       const handleToChange = (e, index) => {
//         const { value } = e.target;
//         const updatedTo = newItem.to.map((item, i) => (i === index ? value : item));
//         setNewItem({
//           ...newItem,
//           to: updatedTo,
//         });
//       };
//       const addDestination = () => {
//         setNewItem({
//           ...newItem,
//           to: [...newItem.to, ''],
//         });
//       };
    
//       const removeDestination = (index) => {
//         const updatedTo = newItem.to.filter((_, i) => i !== index);
//         setNewItem({
//           ...newItem,
//           to: updatedTo,
//         });
//       };

      

//     const fetchVehiclePlacementDetails = async (vehicle_placement_no) => {
//         try {
//             const response = await axios.get(`http://localhost:5000/vehicleNumber-placements/${vehicle_placement_no}`);
//             const { date,paymentto,jobOrder_no,vehicleNo,loadType,consignor,consignorGSTIN,consignorAddress,consignee,consigneeGSTIN,consigneeAddress,customer,from,to,dimensions,weight,quantumrate,effectiverate,cost} = response.data;
//             setFormData((prevFormData) => ({
//                 ...prevFormData,
//                 date,
//                 paymentto,
//                 jobOrder_no,
//                 vehicleNo,
//                 loadType,
//                 consignor,
//                 consignorGSTIN,
//                 consignorAddress,
//                 consignee,
//                 consigneeGSTIN,
//                 consigneeAddress,
//                 customer,
//                 from,
//                 to,
//                 dimensions,
//                 weight,
//                 quantumrate,
//                 effectiverate,
//                 cost,
                
                
//             }));
//         } catch (error) {
//             console.error('Error fetching job order details:', error);
//         }
//     };

//     useEffect(() => {
//         if (formData.vehicle_placement_no) {
//             fetchVehiclePlacementDetails(formData.vehicle_placement_no);
//         }
//     }, [formData.vehicle_placement_no]);

//     const handleContainerChange = (e) => {
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
    

//     const handleCODChange = (e) => {
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
//         console.log(formData);
//         try {
//             const response = await fetch('http://localhost:5000/goods-receipts', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({
//                     ...formData,
//                     additem: newItem 
//                 })
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
//             {!submitted ? ( 
//                 <>
//                     <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment/ Create</h1>
//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
//                          <div className='sm:flex sm:flex-wrap gap-4'>
//                          <div className="mb-4">
//                                 <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
//                                 <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="vehicle_placement_no" className="block text-sm font-medium text-gray-700">Vehicle placement no</label>
//                                 <input type="text" id="vehicle_placement_no" name="vehicle_placement_no" value={formData.vehicle_placement_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                                 <input type="text" id="date" name="date" value={formData.date} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="paymentto" className="block text-sm font-medium text-gray-700">Payment To</label>
//                                 <input type="text" id="paymentto" name="paymentto" value={formData.paymentto} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">JobOrder no</label>
//                                 <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
//                                 <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">LoadType</label>
//                                 <input type="text" id="loadType" name="loadType" value={formData.loadType} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
//                                 <input type="text" id="consignor" name="consignor" value={formData.consignor} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignorGSTIN" className="block text-sm font-medium text-gray-700">ConsignorGSTIN</label>
//                                 <input type="text" id="consignorGSTIN" name="consignorGSTIN" value={formData.consignorGSTIN} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignorAddress" className="block text-sm font-medium text-gray-700">ConsignorAddress</label>
//                                 <input type="text" id="consignorAddress" name="consignorAddress" value={formData.consignorAddress} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
//                                 <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consigneeGSTIN" className="block text-sm font-medium text-gray-700">ConsigneeGSTIN</label>
//                                 <input type="text" id="consigneeGSTIN" name="consigneeGSTIN" value={formData.consigneeGSTIN} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consigneeAddress" className="block text-sm font-medium text-gray-700">ConsigneeAddress</label>
//                                 <input type="text" id="consigneeAddress" name="consigneeAddress" value={formData.consigneeAddress} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billingparty</label>
//                                 <input type="text" id="customer" name="customer" value={formData.customer} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>


//                          </div>
                           
//                         </div>
//                         <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
//                             <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Total</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Container</Tab>
//                                 <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">COD</Tab>

//                             </TabList>
//                             <TabPanel>
//                             <div className="grid grid-cols-6 gap-6 p-4">
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
//                                 <input type="text" id="from" name="from" value={formData.from} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
//                                 <input type="text" id="to" name="to" value={formData.to} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">dimensions</label>
//                                 <input type="text" id="dimensions" name="dimensions" value={formData.dimensions} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="weight" className="block text-sm font-medium text-gray-700">weight</label>
//                                 <input type="text" id="weight" name="weight" value={formData.weight} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="quantumrate" className="block text-sm font-medium text-gray-700">quantumrate</label>
//                                 <input type="text" id="quantumrate" name="quantumrate" value={formData.quantumrate} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="effectiverate" className="block text-sm font-medium text-gray-700">effectiverate</label>
//                                 <input type="text" id="effectiverate" name="effectiverate" value={formData.effectiverate} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             <div className="col-span-6 sm:col-span-3">
//                                 <label htmlFor="cost" className="block text-sm font-medium text-gray-700">cost</label>
//                                 <input type="text" id="cost" name="cost" value={formData.cost} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                             </div>
//                             </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="grid grid-cols-2 gap-4 p-4" >
//                                     <div className="mb-4">
//                                         <label className="text-sm mb-1" htmlFor="from">From</label>
//                                         <input
//                                             type="text"
//                                             id="from"
//                                             name="from"
//                                             value={newItem.from}
//                                             onChange={handleItemChange}
//                                             required
//                                             className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                         />
//                                     </div>

//                                     {newItem.to.map((destination, index) => (
//                                         <div key={index} className="mb-4 col-span-2 flex">
//                                             <div className="flex-1">
//                                                 <label className="text-sm mb-1" htmlFor={`to-${index}`}>To</label>
//                                                 <input
//                                                     type="text"
//                                                     id={`to-${index}`}
//                                                     name={`to-${index}`}
//                                                     value={destination}
//                                                     onChange={(e) => handleToChange(e, index)}
//                                                     required
//                                                     className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                                 />
//                                             </div>
//                                             {index > 0 && (
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => removeDestination(index)}
//                                                     className="ml-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
//                                                 >
//                                                     Remove
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}

//                                     <button
//                                         type="button"
//                                         onClick={addDestination}
//                                         className="col-span-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//                                     >
//                                         Add
//                                     </button>

//                                     <div className="mb-4">
//                                         <label className="text-sm mb-1" htmlFor="QUANTUMRATE">Quantum Rate</label>
//                                         <input
//                                             type="number"
//                                             id="QUANTUMRATE"
//                                             name="QUANTUMRATE"
//                                             value={newItem.QUANTUMRATE}
//                                             onChange={handleItemChange}
//                                             className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                         />
//                                     </div>

//                                     <div className="mb-4">
//                                         <label className="text-sm mb-1" htmlFor="EFFECTIVERATE">Effective Rate</label>
//                                         <input
//                                             type="number"
//                                             id="EFFECTIVERATE"
//                                             name="EFFECTIVERATE"
//                                             value={newItem.EFFECTIVERATE}
//                                             onChange={handleItemChange}
//                                             className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
//                                         />
//                                     </div>

//                                 </div>
//                             </TabPanel>
                            
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-4">
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
//                                         <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Slot Validity Date</label>
//                                         <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Lot Of Container</label>
//                                         <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">Container Gross Weight</label>
//                                         <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
//                                         <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading/Shifting Date</label>
//                                         <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="container.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="container.Remarks" name="container.Remarks" value={formData.container.Remarks} onChange={handleContainerChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-4">
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
//                                         <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
//                                         <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
//                                         <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
//                                             <option value="CHEQUE">CHEQUE</option>
//                                             <option value="ATM">ATM</option>
//                                             <option value="CASH">CASH</option>
//                                             <option value="DD">DD</option>
//                                             <option value="ECS">ECS</option>
//                                             <option value="NEFT">NEFT</option>
//                                             <option value="IMPS">IMPS</option>
//                                             <option value="RTGS">RTGS</option>
//                                         </select>
//                                     </div>
//                                     <div className="col-span-6">
//                                         <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
//                                         <textarea id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
//                                     </div>
//                                 </div>
//                             </TabPanel>
//                             <TabPanel>
//                                 <div className="p-4">
//                                     {/* Additional fields for Charges */}
//                                 </div>
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

// export default Consignment;

// import React, { useState,useEffect } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';
// const Consignment = () => {
//     const [formData, setFormData] = useState({
//         consignmentno: '',
//         jobOrder_no: '',
    
//         customer: '',
//         from: '',
//         to: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         expectedDate: '',
//         employee: '',
//         consignor: '',
//         consignee: '',
    
//         container: {
//             linename: '',
//             date: '',
//             loc: '',
//             cgw: '',
//             loadingno: '',
//             loadingdate: '',
//             Remarks: '',
//         },
    
//         cod: {
//             favouring: '',
//             amount: 0,
//             mode: 'CASH',
//             cancelReason: '',
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

//     const fetchJobOrderDetails = async (jobOrderNo) => {
//         try {
//           const response = await axios.get(`http://localhost:5000/job-orders/${jobOrderNo}`);
//           const { customer, from, to, orderNo,orderDate,orderMode,serviceMode, expectedDate,employee, consignor, consignee  } = response.data;
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             customer,
//             from,
//             to,
//             orderNo,
//             orderDate,
//             orderMode,
//             serviceMode,
//             expectedDate,
//             employee,
//             consignor,
//             consignee


//           }));
//         } catch (error) {
//           console.error('Error fetching job order details:', error);
//         }
//       };
//       useEffect(() => {
//         if (formData.jobOrder_no) {
//           fetchJobOrderDetails(formData.jobOrder_no);
//         }
//       }, [formData.jobOrder_no]);
  

//     const handleContainerChange = (e) => {
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

//     const handleCODChange = (e) => {
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

//         console.log(formData);

//         try {
//             const response = await fetch('http://localhost:5000/goods-receipts', {
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
//                     <h1 className="text-3xl font-bold mb-4">Consignment/ Create</h1>

//                     <form onSubmit={handleSubmit} >
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">


//                             <div className="mb-4">
//                                 <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">consignmentno</label>
//                                 <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">jobOrder_no</label>
//                                 <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billing Party</label>
//                                 <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">consignor</label>
//                                 <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">consignee</label>
//                                 <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="from" className="block text-sm font-medium text-gray-700">from</label>
//                                 <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="to" className="block text-sm font-medium text-gray-700">to</label>
//                                 <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">orderNo</label>
//                                 <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">orderDate</label>
//                                 <input type="text" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">orderMode</label>
//                                 <input type="text" id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">serviceMode</label>
//                                 <input type="text" id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">expectedDate</label>
//                                 <input type="text" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="employee" className="block text-sm font-medium text-gray-700">employee</label>
//                                 <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                           </div>

//                         <Tabs className="bg-[#FFFFFF] pt-2">
//                             <TabList className="flex flex-wrap border-b border-gray-200">
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Container</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">COD</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Charges</Tab>

//                             </TabList>

//                             {/* Contact Tab Panel */}
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-2">
//                                     {/* Contact Address */}
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
//                                         <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     {/* City */}
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Sloat Validity Date</label>
//                                         <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Lot Of Container</label>
//                                         <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">Container Gross Weight</label>
//                                         <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
//                                         <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading/Shifting Date</label>
//                                         <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>

//                                     <div className="col-span-6">
//                                         <label htmlFor="container.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="container.Remarks" name="container.Remarks" value={formData.container.Remarks} onChange={handleContainerChange} rows="3" className="input w-full border border-black shadow-md" />
//                                     </div>
//                                 </div>

//                             </TabPanel>


//                             <TabPanel>
//                             <div className="grid grid-cols-6 gap-6 p-2">
//                                 {/* COD fields */}
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
//                                     <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-black shadow-md" />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
//                                     <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-black shadow-md" />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
//                                     <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-black shadow-md">
//                                         <option value="CHEQUE">CHEQUE</option>
//                                         <option value="ATM">ATM</option>
//                                         <option value="CASH">CASH</option>
//                                         <option value="DD">DD</option>
//                                         <option value="ECS">ECS</option>
//                                         <option value="NEFT">NEFT</option>
//                                         <option value="IMPS">IMPS</option>
//                                         <option value="RTGS">RTGS</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-span-6">
//                                     <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
//                                     <textarea id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} rows="3" className="input w-full border border-black shadow-md" />
//                                 </div>
//                             </div>
//                             </TabPanel>
//                             <TabPanel>
                              
//                             </TabPanel>

//                         </Tabs>
                        

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

// export default Consignment;


// import React, { useState,useEffect } from 'react';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import 'react-tabs/style/react-tabs.css';
// import axios from 'axios';
// const Consignment = () => {
//     const [formData, setFormData] = useState({
//         consignmentno: '',
//         jobOrder_no: '',
    
//         customer: '',
//         from: '',
//         to: '',
//         orderNo: '',
//         orderDate: '',
//         orderMode: '',
//         serviceMode: '',
//         expectedDate: '',
//         employee: '',
//         consignor: '',
//         consignee: '',
    
//         container: {
//             linename: '',
//             date: '',
//             loc: '',
//             cgw: '',
//             loadingno: '',
//             loadingdate: '',
//             Remarks: '',
//         },
    
//         cod: {
//             favouring: '',
//             amount: 0,
//             mode: 'CASH',
//             cancelReason: '',
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

//     const fetchJobOrderDetails = async (jobOrderNo) => {
//         try {
//           const response = await axios.get(`http://localhost:5000/job-orders/${jobOrderNo}`);
//           const { customer, from, to, orderNo,orderDate,orderMode,serviceMode, expectedDate,employee, consignor, consignee  } = response.data;
//           setFormData((prevFormData) => ({
//             ...prevFormData,
//             customer,
//             from,
//             to,
//             orderNo,
//             orderDate,
//             orderMode,
//             serviceMode,
//             expectedDate,
//             employee,
//             consignor,
//             consignee


//           }));
//         } catch (error) {
//           console.error('Error fetching job order details:', error);
//         }
//       };
//       useEffect(() => {
//         if (formData.jobOrder_no) {
//           fetchJobOrderDetails(formData.jobOrder_no);
//         }
//       }, [formData.jobOrder_no]);
  

//     const handleContainerChange = (e) => {
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

//     const handleCODChange = (e) => {
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

//         console.log(formData);

//         try {
//             const response = await fetch('http://localhost:5000/goods-receipts', {
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
//                     <h1 className="text-3xl font-bold mb-4">Consignment/ Create</h1>

//                     <form onSubmit={handleSubmit} >
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">


//                             <div className="mb-4">
//                                 <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">consignmentno</label>
//                                 <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">jobOrder_no</label>
//                                 <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billing Party</label>
//                                 <input type="text" id="customer" name="customer" value={formData.customer} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">consignor</label>
//                                 <input type="text" id="consignor" name="consignor" value={formData.consignor} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">consignee</label>
//                                 <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="from" className="block text-sm font-medium text-gray-700">from</label>
//                                 <input type="text" id="from" name="from" value={formData.from} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="to" className="block text-sm font-medium text-gray-700">to</label>
//                                 <input type="text" id="to" name="to" value={formData.to} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="orderNo" className="block text-sm font-medium text-gray-700">orderNo</label>
//                                 <input type="text" id="orderNo" name="orderNo" value={formData.orderNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">orderDate</label>
//                                 <input type="text" id="orderDate" name="orderDate" value={formData.orderDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="orderMode" className="block text-sm font-medium text-gray-700">orderMode</label>
//                                 <input type="text" id="orderMode" name="orderMode" value={formData.orderMode} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="serviceMode" className="block text-sm font-medium text-gray-700">serviceMode</label>
//                                 <input type="text" id="serviceMode" name="serviceMode" value={formData.serviceMode} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="expectedDate" className="block text-sm font-medium text-gray-700">expectedDate</label>
//                                 <input type="text" id="expectedDate" name="expectedDate" value={formData.expectedDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="employee" className="block text-sm font-medium text-gray-700">employee</label>
//                                 <input type="text" id="employee" name="employee" value={formData.employee} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                           </div>

//                         <Tabs className="bg-[#FFFFFF] pt-2">
//                             <TabList className="flex flex-wrap border-b border-gray-200">
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Container</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">COD</Tab>
//                                 <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Charges</Tab>

//                             </TabList>

//                             {/* Contact Tab Panel */}
//                             <TabPanel>
//                                 <div className="grid grid-cols-6 gap-6 p-2">
//                                     {/* Contact Address */}
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
//                                         <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     {/* City */}
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Sloat Validity Date</label>
//                                         <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Lot Of Container</label>
//                                         <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">Container Gross Weight</label>
//                                         <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
//                                         <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>
//                                     <div className="col-span-6 sm:col-span-3">
//                                         <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading/Shifting Date</label>
//                                         <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
//                                     </div>

//                                     <div className="col-span-6">
//                                         <label htmlFor="container.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
//                                         <textarea id="container.Remarks" name="container.Remarks" value={formData.container.Remarks} onChange={handleContainerChange} rows="3" className="input w-full border border-black shadow-md" />
//                                     </div>
//                                 </div>

//                             </TabPanel>


//                             <TabPanel>
//                             <div className="grid grid-cols-6 gap-6 p-2">
//                                 {/* COD fields */}
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
//                                     <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-black shadow-md" />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
//                                     <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-black shadow-md" />
//                                 </div>
//                                 <div className="col-span-6 sm:col-span-3">
//                                     <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
//                                     <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-black shadow-md">
//                                         <option value="CHEQUE">CHEQUE</option>
//                                         <option value="ATM">ATM</option>
//                                         <option value="CASH">CASH</option>
//                                         <option value="DD">DD</option>
//                                         <option value="ECS">ECS</option>
//                                         <option value="NEFT">NEFT</option>
//                                         <option value="IMPS">IMPS</option>
//                                         <option value="RTGS">RTGS</option>
//                                     </select>
//                                 </div>
//                                 <div className="col-span-6">
//                                     <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
//                                     <textarea id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} rows="3" className="input w-full border border-black shadow-md" />
//                                 </div>
//                             </div>
//                             </TabPanel>
//                             <TabPanel>
                              
//                             </TabPanel>

//                         </Tabs>
                        

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

// export default Consignment;
