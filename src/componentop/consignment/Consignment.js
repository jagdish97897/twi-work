

import React, { useState, useEffect } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import axios from 'axios';

const Consignment = () => {
    const [formData, setFormData] = useState({
        consignmentno: '',
        vehicle_placement_no: '',
        date: '',
        paymentto: '',
        jobOrder_no: '',
        vehicleNo: '',
        loadType: '',
        consignor: '',
        consignorGSTIN: '',
        consignorAddress: '',
        consignee: '',
        consigneeGSTIN: '',
        consigneeAddress: '',
        customer: '',
        from: '',
        to: '',
        dimensions: '',
        weight: '',
        quantumrate: '',
        effectiverate: '',
        cost: '',
        additem: [],

        container: {
            linename: '',
            date: '',
            loc: '',
            cgw: '',
            loadingno: '',
            loadingdate: '',
            remarks: '',
        },
        cod: {
            favouring: '',
            amount: 0,
            mode: 'CASH',
            cancelReason: '',
        }
    });

    const [submitted, setSubmitted] = useState(false);

    const [newItem, setNewItem] = useState({
        from: '',
        to: [{ destination: '', distance: '', EFFECTIVERATE: 0 }],
        QUANTUMRATE: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [fieldName, nestedFieldName] = name.split('.');
            setFormData(prevState => ({
                ...prevState,
                [fieldName]: {
                    ...prevState[fieldName],
                    [nestedFieldName]: value
                }
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleItemChange = (e) => {
        const { name, value } = e.target;
        setNewItem({
            ...newItem,
            [name]: value,
        });
    };

    const handleToChange = async (e, index) => {
        const { name, value } = e.target;
        const updatedTo = [...newItem.to];
        updatedTo[index] = {
            ...updatedTo[index],
            [name]: value,
        };

        if (name === 'destination' && newItem.from) {
            const distance = await fetchDistance(newItem.from, value);
            updatedTo[index].distance = distance;
            if (index > 0) {
                const firstDistance = newItem.to[0].distance;
                const extraDistance = distance - firstDistance;
                updatedTo[index].EFFECTIVERATE = (newItem.QUANTUMRATE / firstDistance) * extraDistance;
            }
        }

        setNewItem({
            ...newItem,
            to: updatedTo,
        });
    };

    const fetchDistance = async (from, to) => {
        try {
            const response = await axios.get('/api/getDistance', {
                params: { from, to },
            });
            return response.data.distance;
        } catch (error) {
            console.error('Error fetching distance:', error);
            return 0;
        }
    };

    const addDestination = () => {
        setNewItem({
            ...newItem,
            to: [...newItem.to, { destination: '', distance: 0, EFFECTIVERATE: 0 }],
        });
    };

    const removeDestination = (index) => {
        const updatedTo = newItem.to.filter((_, i) => i !== index);
        setNewItem({
            ...newItem,
            to: updatedTo,
        });
    };


    const fetchVehiclePlacementDetails = async (vehicle_placement_no) => {
        try {
            const response = await axios.get(`http://localhost:5000/vehicleNumber-placements/${vehicle_placement_no}`);
            const { date,paymentto,jobOrder_no,vehicleNo,loadType,consignor,consignorGSTIN,consignorAddress,consignee,consigneeGSTIN,consigneeAddress,customer,from,to,dimensions,weight,quantumrate,effectiverate,cost } = response.data;
            setFormData(prevFormData => ({
                ...prevFormData,
                date,
                paymentto,
                jobOrder_no,
                vehicleNo,
                loadType,
                consignor,
                consignorGSTIN,
                consignorAddress,
                consignee,
                consigneeGSTIN,
                consigneeAddress,
                customer,
                from,
                to,
                dimensions,
                weight,
                quantumrate,
                effectiverate,
                cost,
            }));
        } catch (error) {
            console.error('Error fetching vehicle placement details:', error);
        }
    };

    useEffect(() => {
        if (formData.vehicle_placement_no) {
            fetchVehiclePlacementDetails(formData.vehicle_placement_no);
        }
    }, [formData.vehicle_placement_no]);

    const handleContainerChange = (e) => {
        const { name, value } = e.target;
        const [parentField, fieldName] = name.split('.');
        setFormData(prevState => ({
            ...prevState,
            [parentField]: {
                ...prevState[parentField],
                [fieldName]: value
            }
        }));
    };

    const handleCODChange = (e) => {
        const { name, value } = e.target;
        const [parentField, fieldName] = name.split('.');
        setFormData(prevState => ({
            ...prevState,
            [parentField]: {
                ...prevState[parentField],
                [fieldName]: value
            }
        }));
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
                body: JSON.stringify({
                    ...formData,
                    additem: [newItem]  // Add the new item to the additem array
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create registration');
            }
            const data = await response.json();
            console.log('Registration created:', data);

            setSubmitted(true); // Set submitted to true after successful submission
        } catch (error) {
            console.error('Error creating registration:', error.message);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? (
                <>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">Consignment/ Create</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
                            <div className='sm:flex sm:flex-wrap gap-4'>
                                <div className="mb-4">
                                    <label htmlFor="consignmentno" className="block text-sm font-medium text-gray-700">Consignment No</label>
                                    <input type="text" id="consignmentno" name="consignmentno" value={formData.consignmentno} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="vehicle_placement_no" className="block text-sm font-medium text-gray-700">Vehicle placement no</label>
                                    <input type="text" id="vehicle_placement_no" name="vehicle_placement_no" value={formData.vehicle_placement_no} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                    <input type="text" id="date" name="date" value={formData.date} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                </div>
                                <div className="mb-4">
                                <label htmlFor="paymentto" className="block text-sm font-medium text-gray-700">Payment To</label>
                                <input type="text" id="paymentto" name="paymentto" value={formData.paymentto} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">JobOrder no</label>
                                <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">LoadType</label>
                                <input type="text" id="loadType" name="loadType" value={formData.loadType} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignor" className="block text-sm font-medium text-gray-700">Consignor</label>
                                <input type="text" id="consignor" name="consignor" value={formData.consignor} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignorGSTIN" className="block text-sm font-medium text-gray-700">ConsignorGSTIN</label>
                                <input type="text" id="consignorGSTIN" name="consignorGSTIN" value={formData.consignorGSTIN} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignorAddress" className="block text-sm font-medium text-gray-700">ConsignorAddress</label>
                                <input type="text" id="consignorAddress" name="consignorAddress" value={formData.consignorAddress} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consignee" className="block text-sm font-medium text-gray-700">Consignee</label>
                                <input type="text" id="consignee" name="consignee" value={formData.consignee} onChange={handleChange} readOnly className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consigneeGSTIN" className="block text-sm font-medium text-gray-700">ConsigneeGSTIN</label>
                                <input type="text" id="consigneeGSTIN" name="consigneeGSTIN" value={formData.consigneeGSTIN} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="consigneeAddress" className="block text-sm font-medium text-gray-700">ConsigneeAddress</label>
                                <input type="text" id="consigneeAddress" name="consigneeAddress" value={formData.consigneeAddress} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="customer" className="block text-sm font-medium text-gray-700">Billingparty</label>
                                <input type="text" id="customer" name="customer" value={formData.customer} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            </div>
                        </div>
                        <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
                            <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Total</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Charges</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Container</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">COD</Tab>
                            </TabList>
                            <TabPanel>
                            <div className="grid grid-cols-6 gap-6 p-4">
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="from" className="block text-sm font-medium text-gray-700">From</label>
                                <input type="text" id="from" name="from" value={formData.from} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="to" className="block text-sm font-medium text-gray-700">To</label>
                                <input type="text" id="to" name="to" value={formData.to} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">dimensions</label>
                                <input type="text" id="dimensions" name="dimensions" value={formData.dimensions} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">weight</label>
                                <input type="text" id="weight" name="weight" value={formData.weight} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="quantumrate" className="block text-sm font-medium text-gray-700">quantumrate</label>
                                <input type="text" id="quantumrate" name="quantumrate" value={formData.quantumrate} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="effectiverate" className="block text-sm font-medium text-gray-700">effectiverate</label>
                                <input type="text" id="effectiverate" name="effectiverate" value={formData.effectiverate} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="col-span-6 sm:col-span-3">
                                <label htmlFor="cost" className="block text-sm font-medium text-gray-700">cost</label>
                                <input type="text" id="cost" name="cost" value={formData.cost} readOnly onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            </div>
                            </TabPanel>
                            <TabPanel>
                            <div className="grid grid-cols-2 gap-4 p-4">
            <div className="mb-4 col-span-2">
                <label className="text-sm mb-1" htmlFor="QUANTUMRATE">Quantum Rate</label>
                <input
                    type="number"
                    id="QUANTUMRATE"
                    name="QUANTUMRATE"
                    value={newItem.QUANTUMRATE}
                    onChange={handleItemChange}
                    required
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>
            <div className="mb-4">
                <label className="text-sm mb-1" htmlFor="from">From</label>
                <input
                    type="text"
                    id="from"
                    name="from"
                    value={newItem.from}
                    onChange={handleItemChange}
                    required
                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
            </div>

            <div className="mb-4 col-span-2 flex">
                <div className="flex-1">
                    <label className="text-sm mb-1" htmlFor="to-0">To</label>
                    <input
                        type="text"
                        id="to-0"
                        name="destination"
                        value={newItem.to[0].destination}
                        onChange={(e) => handleToChange(e, 0)}
                        required
                        className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
            </div>

            {newItem.to.slice(1).map((destination, index) => (
                <div key={index + 1} className="mb-4 col-span-2 flex">
                    <div className="flex-1">
                        <label className="text-sm mb-1" htmlFor={`to-${index + 1}`}>To</label>
                        <input
                            type="text"
                            id={`to-${index + 1}`}
                            name="destination"
                            value={destination.destination}
                            onChange={(e) => handleToChange(e, index + 1)}
                            required
                            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm mb-1" htmlFor={`distance-${index + 1}`}>Distance</label>
                        <input
                            type="number"
                            id={`distance-${index + 1}`}
                            name="distance"
                            value={destination.distance}
                            readOnly
                            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="text-sm mb-1" htmlFor={`effectiverate-${index + 1}`}>Effective Rate</label>
                        <input
                            type="number"
                            id={`effectiverate-${index + 1}`}
                            name="EFFECTIVERATE"
                            value={destination.EFFECTIVERATE}
                            readOnly
                            className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="button"
                            onClick={() => removeDestination(index + 1)}
                            className="ml-2 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addDestination}
                className="col-span-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
                Add
            </button>
        </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="grid grid-cols-2 gap-4 p-4">
                                    <div className="mb-4">
                                        <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">Line Name</label>
                                        <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">Date</label>
                                        <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">Location</label>
                                        <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">CGW</label>
                                        <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">Loading No</label>
                                        <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">Loading Date</label>
                                        <input type="date" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4 col-span-2">
                                        <label htmlFor="container.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="container.remarks" name="container.remarks" value={formData.container.remarks} onChange={handleContainerChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" rows="3"></textarea>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="grid grid-cols-2 gap-4 p-4">
                                    <div className="mb-4">
                                        <label htmlFor="cod.favouring" className="block text-sm font-medium text-gray-700">Favouring</label>
                                        <input type="text" id="cod.favouring" name="cod.favouring" value={formData.cod.favouring} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="cod.amount" className="block text-sm font-medium text-gray-700">Amount</label>
                                        <input type="number" id="cod.amount" name="cod.amount" value={formData.cod.amount} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="cod.mode" className="block text-sm font-medium text-gray-700">Mode</label>
                                        <select id="cod.mode" name="cod.mode" value={formData.cod.mode} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="CASH">Cash</option>
                                            <option value="CHEQUE">Cheque</option>
                                        </select>
                                    </div>
                                    <div className="mb-4 col-span-2">
                                        <label htmlFor="cod.cancelReason" className="block text-sm font-medium text-gray-700">Cancel Reason</label>
                                        <input type="text" id="cod.cancelReason" name="cod.cancelReason" value={formData.cod.cancelReason} onChange={handleCODChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </form>
                </>
            ) : (
                <div className='text-center'>
                    <h1 className="text-3xl font-bold mb-4 text-indigo-800">Form Submitted Successfully</h1>
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
//             const { date,paymentto,jobOrder_no,vehicleNo,loadType,consignor,consignorGSTIN,consignorAddress,consignee,consigneeGSTIN,consigneeAddress,customer,from,to,dimensions,weight,quantumrate,effectiverate,cost } = response.data;
//             setFormData(prevFormData => ({
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
//                                 <div className="mb-4">
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
//                                 <div className="grid grid-cols-2 gap-4 p-4">
//                                 <div className="mb-4">
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
//                                                  Remove
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
