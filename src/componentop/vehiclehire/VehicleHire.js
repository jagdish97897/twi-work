import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VehicleHire = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        vehiclehire_no: '',
        consignmentno: '',
        type: '',
        state: '',
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
        PAN: '',
        paymentto:'',
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

    const fetchJobOrderDetails = async (consignmentno) => {
        try {
            const response = await axios.get(`https://twi-e-logistics.onrender.com/goodsReceipts/consignmentno/${consignmentno}`);
            const {
                loadType, customer, customerGSTIN, customerAddress, from, to,
                orderNo, orderDate, orderMode, serviceMode, expectedDate,
                employee, consignor, consignorGSTIN, consignorAddress,
                consignee, consigneeGSTIN, consigneeAddress,paymentto,PAN
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
                consigneeAddress,
                PAN,
                paymentto
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
            const response = await fetch('https://twi-e-logistics.onrender.com/vehicle-hires', {
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
        const sundries = [
            'Loading On Hire',
            'Other Charges On Hire',
            'TRANSACTION CHARGES',
            'STAFF FUND',
            'RTO',
        ];
        const initialCharges = sundries.map(sundry => ({
            sundry: sundry,
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
        navigate('/protected/componentop/sidebarop/Sidebarop/bookingoperation/viewvehiclehire');
      };

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? (
                <>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">VehicleHire/ Create</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-1 mb-4 flex justify-between">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>

                            <button
                                type="button"
                                onClick={handleListClick}
                                className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                List view
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
                                    <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                    <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
                                    <label htmlFor="PAN" className="block text-sm font-medium text-gray-700">PAN</label>
                                    <input type="text" id="PAN" name="PAN" value={formData.PAN} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="paymentto" className="block text-sm font-medium text-gray-700">paymentto</label>
                                    <input type="text" id="paymentto" name="paymentto" value={formData.paymentto} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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

