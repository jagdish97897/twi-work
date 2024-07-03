

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



// import React, { useState } from 'react';
// import axios from 'axios';
// import { FiAlignJustify } from "react-icons/fi";

// const Pod = () => {
//   const [startDate, setStartDate] = useState(null);
//   const [formData, setFormData] = useState({
//     consignmentNo: '',
//     consignmentType: '',
//     source: '',
//     destination: '',
//     consignmentDate: '',
//     loadingType: '',
//     reportingDate: '',
//     unloadingDate: '',
//     weight: '',
//     packages: '',
//     through: '',
//     status: '',
//     reportSubmission: '',
//     vehicleNo: '',
//     remarks: ''
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/pods', formData);
//       console.log(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className='w-screen lg:bg-gray-200 h-screen'>
//       <div className='lg:pl-4 lg:pt-2'>
//         <div className='lg:flex justify-between'>
//           <select className='lg:w-1/10 lg:border-2 lg:text-sm' name="consignmentNo" onChange={handleChange}>
//             <option>Ho-NSP</option>
//             <option>Select</option>
//           </select>
//         </div>
    
//         <div className='lg:flex justify-between mt-4'>
//           <div className='lg:flex'>
//             <button onClick={handleSubmit} className='lg:bg-blue-600 lg:px-4 lg:py-2 lg:mr-2 lg:rounded-xl lg:border-4 lg:text-white'>Submit</button>
//             <button className='lg:bg-blue-600 lg:px-4 lg:py-2 lg:rounded-xl lg:border-4 lg:text-white'>Discard</button>
//           </div>
//           <div>
//             <button className='lg:bg-blue-600 lg:px-4 lg:py-2 lg:rounded-xl lg:border-4 lg:text-2xl lg:text-white'>
//               <FiAlignJustify />
//             </button>
//           </div>
//         </div>

//         <div className="container lg:w-11/12 lg:bg-white p-4 mt-4">
//           <div className='lg:flex lg:flex-wrap lg:justify-between lg:font-semibold'>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Consignment no</h1>
//               <select className='lg:w-full lg:border lg:border-2' name="consignmentNo" onChange={handleChange}>
//                 <option>Select</option>
//                 <option>Select</option>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Consignment Type</h1>
//               <div className='lg:flex'>
//                 <select className='lg:w-2/3 lg:border lg:border-2' name="consignmentType" onChange={handleChange}>
//                   <option>Select</option>
//                   <option>Select</option>
//                   <option>Select</option>
//                 </select>
//                 <input className='lg:w-1/3 lg:border lg:border-2' name="consignmentType" onChange={handleChange} />
//               </div>
//             </div>
//             <div className='lg:w-1/2 lg:mb-4'>
//               <h1>Source</h1>
//               <div className='lg:flex'>
//                 <input className='lg:w-2/3 lg:border lg:border-2' name="source" onChange={handleChange} />
//                 <input className='lg:w-1/3 lg:border lg:border-2' name="source" onChange={handleChange} />
//               </div>
//             </div>
//           </div>

//           <div className='lg:flex lg:flex-wrap lg:justify-between lg:font-semibold mt-4'>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Destination</h1>
//               <div className='lg:flex'>
//                 <h1 className='lg:border-2 lg:text-xs lg:items-center'>TWIHO...</h1>
//                 <input className='lg:w-full lg:border lg:border-2 lg:bg-green-400' name="destination" placeholder='Consign No.' onChange={handleChange} />
//                 <input className='lg:w-1/6 lg:border lg:border-2' />
//               </div>
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Consignment Date</h1>
//               <div className='lg:flex'>
//                 <input className='lg:w-4/5 lg:border lg:border-2' type="date" name="consignmentDate" value={startDate} onChange={(e) => { setStartDate(e.target.value); handleChange(e); }} />
//                 <input className='lg:w-1/5 lg:border lg:border-2' />
//               </div>
//             </div>
//             <div className='lg:w-1/2 lg:flex lg:justify-between lg:mb-4'>
//               <div className='lg:w-1/3'>
//                 <h1>Loading Type</h1>
//                 <select className='lg:w-full lg:border lg:border-2' name="loadingType" onChange={handleChange}>
//                   <option>Select</option>
//                   <option>Select</option>
//                   <option>Select</option>
//                 </select>
//               </div>
//               <div className='lg:w-1/3'>
//                 <h1>Reporting Date</h1>
//                 <select className='lg:w-full lg:border lg:border-2' name="reportingDate" onChange={handleChange}>
//                   <option>Select</option>
//                   <option>Select</option>
//                   <option>Select</option>
//                 </select>
//               </div>
//               <div className='lg:w-1/3'>
//                 <h1>Unloading Date</h1>
//                 <select className='lg:w-full lg:border lg:border-2' name="unloadingDate" onChange={handleChange}>
//                   <option>Select</option>
//                   <option>Select</option>
//                   <option>Select</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           <div className='lg:flex lg:flex-wrap lg:justify-between lg:font-semibold mt-4'>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Weight</h1>
//               <div className='lg:flex'>
//                 <select className='lg:w-1/2 lg:border lg:border-2' name="weight" onChange={handleChange}>
//                   <option>Select</option>
//                   <option>Select</option>
//                   <option>Select</option>
//                 </select>
//                 <input className='lg:w-1/2 lg:border lg:border-2 lg:bg-green-400' name="weight" placeholder='Reference No.' onChange={handleChange} />
//               </div>
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Packages</h1>
//               <input className='lg:w-full lg:border lg:border-2' type="date" name="packages" value={startDate} onChange={(e) => { setStartDate(e.target.value); handleChange(e); }} />
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Through</h1>
//               <select className='lg:w-full lg:border lg:border-2' name="through" onChange={handleChange}>
//                 <option>Select</option>
//                 <option>Select</option>
//                 <option>Select</option>
//               </select>
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Status</h1>
//               <select className='lg:w-full lg:border lg:border-2' name="status" onChange={handleChange}>
//                 <option>Select</option>
//                 <option>Select</option>
//                 <option>Select</option>
//               </select>
//             </div>
//           </div>

//           <div className='lg:flex lg:flex-wrap lg:justify-between lg:font-semibold mt-4'>
//             <div className='lg:w-1/2 lg:mb-4'>
//               <h1>Reporting Date</h1>
//               <input className='lg:w-full lg:border lg:border-2' name="reportingDate" placeholder='Subject' onChange={handleChange} />
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Report Submission</h1>
//               <input className='lg:w-full lg:border lg:border-2' name="reportSubmission" placeholder='Subject' onChange={handleChange} />
//             </div>
//             <div className='lg:w-1/4 lg:mb-4'>
//               <h1>Vehicle No.</h1>
//               <div className='lg:flex'>
//                 <input className='lg:w-4/5 lg:border lg:border-2' name="vehicleNo" placeholder='Subject' onChange={handleChange} />
//                 <button className='lg:px-3 lg:py-1 lg:bg-blue-600 lg:text-white'>Billing</button>
//               </div>
//             </div>
//           </div>

//           <div className='lg:border-b-2 lg:mt-3 lg:w-full'></div>

//           <div className='lg:mt-4'>
//             <h1>Remarks</h1>
//             <input className='lg:w-full lg:border lg:border-2' name="remarks" onChange={handleChange} />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Pod;



// import React from 'react'

// function Pod() {
//   return (
//     <div>
//       pod
//     </div>
//   )
// }

// export default Pod



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//     const [sourcePincode, setSourcePincode] = useState('');
//     const [destinationPincodes, setDestinationPincodes] = useState(['']); // Initialize with an empty string
//     const [distances, setDistances] = useState([]);
//     const [error, setError] = useState('');

//     const handleAddDestination = () => {
//         setDestinationPincodes([...destinationPincodes, '']); // Add an empty string to the destinationPincodes array
//     };

//     const handleChangeDestination = (index, value) => {
//         const newDestinationPincodes = [...destinationPincodes];
//         newDestinationPincodes[index] = value;
//         setDestinationPincodes(newDestinationPincodes);
//     };

//     const handleCalculateDistance = async () => {
//         try {
//             setError('');
//             const response = await axios.post('http://localhost:5000/distancenikalo', {
//                 sourcePincode,
//                 destinationPincodes
//             });
//             setDistances(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Failed to calculate distance. Please try again.');
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-semibold mb-4">Distance Calculator</h2>
//            <div className='h-full w-full bg-green-300'>
//             <div className="mb-4">
//                 <label className="block mb-2">Source Pincode:</label>
//                 <input
//                     type="text"
//                     value={sourcePincode}
//                     onChange={(e) => setSourcePincode(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 "
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-2">Destination Pincode:</label> {/* Display first destination input */}
//                 <input
//                     type="text"
//                     value={destinationPincodes[0]}
//                     onChange={(e) => handleChangeDestination(0, e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2"
//                 />
//             </div>
//             {destinationPincodes.slice(1).map((destination, index) => (
//                 <div key={index} className="mb-2">
//                     <input
//                         type="text"
//                         value={destination}
//                         onChange={(e) => handleChangeDestination(index + 1, e.target.value)}
//                         className="border border-gray-300 rounded px-4 py-2 "
//                     />
//                 </div>
//             ))}
//             <button
//                 onClick={handleAddDestination}
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//             >
//                 Add Destination
//             </button>
//             <button
//                 onClick={handleCalculateDistance}
//                 className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-600"
//             >
//                 Calculate Distance
//             </button>
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//             <div className="mt-4">
//                 {distances.map((distance, index) => (
//                     <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
//                         <p className="font-semibold">Destination: {distance.destination}</p>
//                         <p className="mt-2">Distance: {distance.distance}</p>
//                     </div>
//                 ))}
//             </div>
//            </div>

//         </div>
//     );
// };

// export default Pod;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//     const [sourcePincode, setSourcePincode] = useState('');
//     const [destinationPincodes, setDestinationPincodes] = useState([]);
//     const [distances, setDistances] = useState([]);
//     const [error, setError] = useState('');

//     const handleAddDestination = () => {
//         setDestinationPincodes([...destinationPincodes, '']);
//     };

//     const handleChangeDestination = (index, value) => {
//         const newDestinationPincodes = [...destinationPincodes];
//         newDestinationPincodes[index] = value;
//         setDestinationPincodes(newDestinationPincodes);
//     };

//     const handleCalculateDistance = async () => {
//         try {
//             setError('');
//             const response = await axios.post('http://localhost:5000/distancenikalo', {
//                 sourcePincode,
//                 destinationPincodes
//             });
//             setDistances(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Failed to calculate distance. Please try again.');
//         }
//     };

//     return (
//         <div className="container mx-auto px-4 py-8">
//             <h2 className="text-2xl font-semibold mb-4">Distance Calculator</h2>
//             <div className="mb-4">
//                 <label className="block mb-2">Source Pincode:</label>
//                 <input
//                     type="text"
//                     value={sourcePincode}
//                     onChange={(e) => setSourcePincode(e.target.value)}
//                     className="border border-gray-300 rounded px-4 py-2 w-full"
//                 />
//             </div>
//             <div className="mb-4">
//                 <label className="block mb-2">Destination Pincodes:</label>
//                 {destinationPincodes.map((destination, index) => (
//                     <div key={index} className="mb-2">
//                         <input
//                             type="text"
//                             value={destination}
//                             onChange={(e) => handleChangeDestination(index, e.target.value)}
//                             className="border border-gray-300 rounded px-4 py-2 w-full"
//                         />
//                     </div>
//                 ))}
//                 <button
//                     onClick={handleAddDestination}
//                     className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                     Add Destination
//                 </button>
//             </div>
//             <button
//                 onClick={handleCalculateDistance}
//                 className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//             >
//                 Calculate Distance
//             </button>
//             {error && <p className="text-red-500 mt-4">{error}</p>}
//             <div className="mt-4">
//                 {distances.map((distance, index) => (
//                     <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
//                         <p className="font-semibold">Destination: {distance.destination}</p>
//                         <p className="mt-2">Distance: {distance.distance}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Pod;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//     const [sourcePincode, setSourcePincode] = useState('');
//     const [destinationPincodes, setDestinationPincodes] = useState([]);
//     const [distances, setDistances] = useState([]);
//     const [error, setError] = useState('');

//     const handleAddDestination = () => {
//         setDestinationPincodes([...destinationPincodes, '']); // Add an empty string to the destinationPincodes array
//     };

//     const handleChangeDestination = (index, value) => {
//         const newDestinationPincodes = [...destinationPincodes];
//         newDestinationPincodes[index] = value;
//         setDestinationPincodes(newDestinationPincodes);
//     };

//     const handleCalculateDistance = async () => {
//         try {
//             setError('');
//             const response = await axios.post('http://localhost:5000/distancenikalo', {
//                 sourcePincode,
//                 destinationPincodes
//             });
//             setDistances(response.data);
//         } catch (error) {
//             console.error(error);
//             setError('Failed to calculate distance. Please try again.');
//         }
//     };

//     return (
//         <div>
//             <h2>Distance Calculator</h2>
//             <div>
//                 <label>Source Pincode:</label>
//                 <input type="text" value={sourcePincode} onChange={(e) => setSourcePincode(e.target.value)} />
//             </div>
//             <div>
//                 <label>Destination Pincodes:</label>
//                 {destinationPincodes.map((destination, index) => (
//                     <div key={index}>
//                         <input
//                             type="text"
//                             value={destination}
//                             onChange={(e) => handleChangeDestination(index, e.target.value)}
//                         />
//                     </div>
//                 ))}
//                 <button onClick={handleAddDestination}>Add Destination</button>
//             </div>
//             <button onClick={handleCalculateDistance}>Calculate Distance</button>
//             {error && <p>{error}</p>}
//             <div>
//                 {distances.map((distance, index) => (
//                     <div key={index}>
//                         <p>Destination: {distance.destination}</p>
//                         <p>Distance: {distance.distance}</p>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Pod;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//   const [sourcePincode, setSourcePincode] = useState('');
//   const [destinationPincodes, setDestinationPincodes] = useState(['']);
//   const [distances, setDistances] = useState([]);
//   const [error, setError] = useState('');

//   const handleAddDestination = () => {
//     setDestinationPincodes([...destinationPincodes, '']);
//   };

//   const handleRemoveDestination = (index) => {
//     const updatedDestinations = [...destinationPincodes];
//     updatedDestinations.splice(index, 1);
//     setDestinationPincodes(updatedDestinations);
//   };

//   const handleDestinationChange = (index, value) => {
//     const updatedDestinations = [...destinationPincodes];
//     updatedDestinations[index] = value;
//     setDestinationPincodes(updatedDestinations);
//   };

//   const handleCalculateDistance = async () => {
//     try {
//       setError('');
//       const response = await axios.post('http://localhost:5000/distancenikalo', {
//         sourcePincode,
//         destinationPincodes
//       });
//       setDistances(response.data.distances);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to calculate distances. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
//         <input
//           type="text"
//           placeholder="Enter source pincode"
//           value={sourcePincode}
//           onChange={(e) => setSourcePincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded w-full"
//         />
//         {destinationPincodes.map((destination, index) => (
//           <div key={index} className="mb-4 flex items-center">
//             <input
//               type="text"
//               placeholder={`Enter destination pincode ${index + 1}`}
//               value={destination}
//               onChange={(e) => handleDestinationChange(index, e.target.value)}
//               className="p-2 border border-gray-300 rounded w-full"
//             />
//             <button
//               onClick={() => handleRemoveDestination(index)}
//               className="ml-2 bg-red-500 text-white px-2 py-1 rounded"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//         <button
//           onClick={handleAddDestination}
//           className="mb-4 bg-green-500 text-white px-4 py-2 rounded"
//         >
//           Add Destination
//         </button>
//         <button
//           onClick={handleCalculateDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Calculate Distances
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {distances.length > 0 && (
//           <div className="mt-4">
//             {distances.map((distance, index) => (
//               <p key={index}>Distance to Destination {index + 1}: {distance}</p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pod;


// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//   const [sourcePincode, setSourcePincode] = useState('');
//   const [destinationPincode, setDestinationPincode] = useState('');
//   const [distance, setDistance] = useState('');
//   const [error, setError] = useState('');

//   const handleCalculateDistance = async () => {
//     try {
//       setError('');
//       const response = await axios.post('http://localhost:5000/distancenikalo', {
//         sourcePincode,
//         destinationPincode
//       });
//       setDistance(response.data.distance);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to calculate distance. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
//         <input
//           type="text"
//           placeholder="Enter source pincode"
//           value={sourcePincode}
//           onChange={(e) => setSourcePincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded"
//         />
//         <input
//           type="text"
//           placeholder="Enter destination pincode"
//           value={destinationPincode}
//           onChange={(e) => setDestinationPincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded"
//         />
//         <button
//           onClick={handleCalculateDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Calculate Distance
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {distance && (
//           <div className="mt-4">
//             <p>Distance: {distance}</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pod;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {
//   const [sourcePincode, setSourcePincode] = useState('');
//   const [destinationPincode, setDestinationPincode] = useState('');
//   const [distance, setDistance] = useState('');
//   const [quantumrate, setQuantumrate] = useState('');
//   const [error, setError] = useState('');

//   const handleCalculateDistance = async () => {
//     try {
//       setError('');
//       setDistance('');
//       setQuantumrate('');
//       const response = await axios.post('http://localhost:5000/distancenikalo', {
//         sourcePincode,
//         destinationPincode
//       });
//       setDistance(response.data.distance);
//       setQuantumrate(response.data.quantumrate);
//     } catch (error) {
//       console.error(error);
//       setError('Failed to calculate distance. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Distance Calculator</h2>
//         <input
//           type="text"
//           placeholder="Enter source pincode"
//           value={sourcePincode}
//           onChange={(e) => setSourcePincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded w-full"
//         />
//         <input
//           type="text"
//           placeholder="Enter destination pincode"
//           value={destinationPincode}
//           onChange={(e) => setDestinationPincode(e.target.value)}
//           className="mb-4 p-2 border border-gray-300 rounded w-full"
//         />
//         <button
//           onClick={handleCalculateDistance}
//           className="bg-blue-500 text-white px-4 py-2 rounded w-full"
//         >
//           Calculate Distance
//         </button>
//         {error && <p className="text-red-500 mt-4">{error}</p>}
//         {distance && (
//           <div className="mt-4">
//             <p className="text-lg">Distance: {distance}</p>
//             <p className="text-lg">Rate: {quantumrate} INR</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Pod;







// import React, { useState } from 'react';
// import axios from 'axios';

// const Pod = () => {


//   const [origin, setOrigin] = useState('');
//   const [destination, setDestination] = useState('');
//   const [distance, setDistance] = useState('');
//   const [duration, setDuration] = useState('');
//   const [error, setError] = useState('');

 
//   const OPEN_CAGE_API_KEY = '3cbc181d77af45c498d94bd2195e7011';

//   const getCoordinates = async (location) => {
//     try {
//       const response = await axios.get(
//         `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(location)}&key=${OPEN_CAGE_API_KEY}`
//       );
      
//       if (response.data.results.length > 0) {
//         const { lat, lng } = response.data.results[0].geometry;
//         return { lat, lng };
//       } else {
//         throw new Error('Location not found');
//       }
//     } catch (error) {
//       setError('Unable to find location. Please check the city names.');
//       throw error;
//     }
//   };

//   const calculateDistance = async () => {
//     try {
//       setError('');
//       const originCoords = await getCoordinates(origin);
//       const destinationCoords = await getCoordinates(destination);

//       const response = await axios.get(
//         `http://router.project-osrm.org/route/v1/driving/${originCoords.lng},${originCoords.lat};${destinationCoords.lng},${destinationCoords.lat}?overview=false`
//       );

//       if (response.data.code === "Ok") {
//         const route = response.data.routes[0];
//         setDistance((route.distance / 1000).toFixed(2) + ' km'); // convert meters to kilometers
//         setDuration((route.duration / 60).toFixed(2) + ' mins'); // convert seconds to minutes
//       } else {
//         setError('Unable to find distance. Please check the city names.');
//         setDistance('');
//         setDuration('');
//       }
//     } catch (error) {
//       if (!error.message.includes('Location not found')) {
//         setError('An error occurred. Please try again.');
//       }
//       setDistance('');
//       setDuration('');
//     }
//   };


//   return (
//     <div>
//       <h2>Distance Calculator</h2>
//       <input
//         type="text"
//         placeholder="Enter origin city"
//         value={origin}
//         onChange={(e) => setOrigin(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter destination city"
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//         onClick={calculateDistance}
//       />

//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {distance && (
//         <div>
//           <p>Distance: {distance}</p>
//           <p>Duration: {duration}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Pod;


// import React from 'react'

// function Pod() {
//   return (
//     <div>
//       pod
//     </div>
//   )
// }

// export default Pod
