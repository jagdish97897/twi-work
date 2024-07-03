

import React, { useState, useEffect } from 'react';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

const Pod = () => {
    const [formData, setFormData] = useState({
        podNo:'',
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
        vehicleNo: '',

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
    const fetchJobOrderDetails = async (consignmentno) => {
        try {
            const response = await axios.get(`http://localhost:5000/goodsReceipts/consignmentno/${consignmentno}`);
            const { customer,customerGSTIN,customerAddress, from, to, orderNo, orderDate, orderMode, serviceMode, expectedDate, employee, consignor,consignorGSTIN,consignorAddress, consignee,consigneeGSTIN,consigneeAddress,vehicleNo } = response.data;
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
                consigneeAddress,
                vehicleNo
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
            const response = await fetch('http://localhost:5000/pods', {
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

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? ( // Render form only if not submitted
                <>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">POD/ Create</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg sm:flex sm:flex-wrap gap-4">
                            <div className="mb-4">
                                <label htmlFor="podNo" className="block text-sm font-medium text-gray-700">pod No</label>
                                <input type="text" id="podNo" name="podNo" value={formData.podNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
                                <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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
                            <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">vehicleNo</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
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

export default Pod;
