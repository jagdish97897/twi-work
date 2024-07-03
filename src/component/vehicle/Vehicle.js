import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicle = () => {
    const [formData, setFormData] = useState({
        vehicleNo: '',
        segmentCategory: '',
        businessGroup: '',
        oldRegistration: '',
        loadType: '',
        controllingBranch: '',
        registrationDate: '',
        manufacturingYear: '',
        supervisor: '',
        vehicleType: '',
        trolleyNo: '',
        ownership: '',
        through: '',
        make: '',
        model: '',
        owner: '',
        broker: '',
        driver: '',
        currentRoute: '',
        rtoType: '',
        validUpto: '',
        rtoAuthority: '',
        permitType: '',
        validState: '',
        currentODM: '',
        oldODM: '',
        serviceType: '',
        expireDate: '',
        currentStatus: '',
        currentStation: '',
    });

    const [submitted, setSubmitted] = useState(false);
    const [owners, setOwners] = useState([]);
    const [brokers, setBrokers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/vehicle-registrations', {
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
            setSubmitted(true);
        } catch (error) {
            console.error('Error creating registration:', error.message);
        }
    };

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const response = await axios.get('http://localhost:5000/supply-chain-partners/owners', {
                    params: { name: formData.owner }
                });
                setOwners(response.data);
            } catch (error) {
                console.error('Error fetching owners:', error);
            }
        };

        if (formData.owner) {
            fetchOwners();
        } else {
            setOwners([]);
        }
    }, [formData.owner]);

    useEffect(() => {
        const fetchBrokers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/supply-chain-partners/brokers', {
                    params: { name: formData.broker }
                });
                setBrokers(response.data);
            } catch (error) {
                console.error('Error fetching brokers:', error);
            }
        };

        if (formData.broker) {
            fetchBrokers();
        } else {
            setBrokers([]);
        }
    }, [formData.broker]);

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">Vehicle/ Create</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
                        <div className='sm:flex sm:flex-wrap gap-4'>
                            <div className="mb-4">
                                <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
                                <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="segmentCategory" className="block text-sm font-medium text-gray-700">Segment Category</label>
                                <input type="text" id="segmentCategory" name="segmentCategory" value={formData.segmentCategory} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="businessGroup" className="block text-sm font-medium text-gray-700">Business Group</label>
                                <input type="text" id="businessGroup" name="businessGroup" value={formData.businessGroup} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="oldRegistration" className="block text-sm font-medium text-gray-700">Old Registration</label>
                                <input type="text" id="oldRegistration" name="oldRegistration" value={formData.oldRegistration} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">Load Type</label>
                                <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="controllingBranch" className="block text-sm font-medium text-gray-700">Controlling Branch</label>
                                <input type="text" id="controllingBranch" name="controllingBranch" value={formData.controllingBranch} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Registration Date</label>
                                <input type="date" id="registrationDate" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="manufacturingYear" className="block text-sm font-medium text-gray-700">Manufacturing Year</label>
                                <input type="text" id="manufacturingYear" name="manufacturingYear" value={formData.manufacturingYear} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">Supervisor</label>
                                <input type="text" id="supervisor" name="supervisor" value={formData.supervisor} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                                <input type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="trolleyNo" className="block text-sm font-medium text-gray-700">Trolley No</label>
                                <input type="text" id="trolleyNo" name="trolleyNo" value={formData.trolleyNo} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="ownership" className="block text-sm font-medium text-gray-700">Ownership</label>
                                <input type="text" id="ownership" name="ownership" value={formData.ownership} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="through" className="block text-sm font-medium text-gray-700">Through</label>
                                <select id="through" name="through" value={formData.through} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="">Select Type</option>
                                    <option value="DIRECT">DIRECT</option>
                                    <option value="BROKER">BROKER</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
                                <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                                <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
                                <input
                                    type="text"
                                    id="owner"
                                    name="owner"
                                    value={formData.owner}
                                    onChange={handleChange}
                                    list="ownerSuggestions"
                                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <datalist id="ownerSuggestions">
                                    {owners.map((owner) => (
                                        <option key={owner._id} value={owner.name} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="broker" className="block text-sm font-medium text-gray-700">Broker</label>
                                <input
                                    type="text"
                                    id="broker"
                                    name="broker"
                                    value={formData.broker}
                                    onChange={handleChange}
                                    list="brokerSuggestions"
                                    className="input w-full border border-gray-300 rounded-md shadow-sm p-2"
                                />
                                <datalist id="brokerSuggestions">
                                    {brokers.map((broker) => (
                                        <option key={broker._id} value={broker.name} />
                                    ))}
                                </datalist>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="driver" className="block text-sm font-medium text-gray-700">Driver</label>
                                <input type="text" id="driver" name="driver" value={formData.driver} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="currentRoute" className="block text-sm font-medium text-gray-700">Current Route</label>
                                <input type="text" id="currentRoute" name="currentRoute" value={formData.currentRoute} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rtoType" className="block text-sm font-medium text-gray-700">RTO Type</label>
                                <input type="text" id="rtoType" name="rtoType" value={formData.rtoType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="validUpto" className="block text-sm font-medium text-gray-700">Valid Upto</label>
                                <input type="date" id="validUpto" name="validUpto" value={formData.validUpto} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="rtoAuthority" className="block text-sm font-medium text-gray-700">RTO Authority</label>
                                <input type="text" id="rtoAuthority" name="rtoAuthority" value={formData.rtoAuthority} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="permitType" className="block text-sm font-medium text-gray-700">Permit Type</label>
                                <select id="permitType" name="permitType" value={formData.permitType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="">Select Type</option>
                                    <option value="STATE">STATE</option>
                                    <option value="NATIONAL">NATIONAL</option>
                                    <option value="INTERNATIONAL">INTERNATIONAL</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="validState" className="block text-sm font-medium text-gray-700">Valid State</label>
                                <input type="text" id="validState" name="validState" value={formData.validState} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="currentODM" className="block text-sm font-medium text-gray-700">Current ODM</label>
                                <input type="text" id="currentODM" name="currentODM" value={formData.currentODM} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="oldODM" className="block text-sm font-medium text-gray-700">Old ODM</label>
                                <input type="text" id="oldODM" name="oldODM" value={formData.oldODM} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
                                <input type="text" id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="expireDate" className="block text-sm font-medium text-gray-700">Expire Date</label>
                                <input type="date" id="expireDate" name="expireDate" value={formData.expireDate} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700">Current Status</label>
                                <input type="text" id="currentStatus" name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="currentStation" className="block text-sm font-medium text-gray-700">Current Station</label>
                                <input type="text" id="currentStation" name="currentStation" value={formData.currentStation} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>
                            </div>
                        </div>
                    </form>
                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Registration submitted successfully!</h1>
                </div>
            )}
        </div>
    );
};

export default Vehicle;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Vehicle = () => {
//     const [formData, setFormData] = useState({
//         vehicleNo: '',
//         segmentCategory: '',
//         businessGroup: '',
//         oldRegistration: '',
//         loadType: '',
//         controllingBranch: '',
//         registrationDate: '',
//         manufacturingYear: '',
//         supervisor: '',
//         vehicleType: '',
//         trolleyNo: '',
//         ownership: '',
//         through: '',
//         make: '',
//         model: '',
//         owner: '',
//         broker: '',
//         driver: '',
//         currentRoute: '',
//         rtoType: '',
//         validUpto: '',
//         rtoAuthority: '',
//         permitType: '',
//         validState: '',
//         currentODM: '',
//         oldODM: '',
//         serviceType: '',
//         expireDate: '',
//         currentStatus: '',
//         currentStation: '',
//     });

//     const [submitted, setSubmitted] = useState(false);
//     const [owners, setOwners] = useState([]);
//     const [brokers, setBrokers] = useState([]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5000/vehicle-registrations', {
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
//             setSubmitted(true);
//         } catch (error) {
//             console.error('Error creating registration:', error.message);
//         }
//     };



//     useEffect(() => {
//         const handleSearch = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/supply-chain-partners/owners', {
//                     params: { name: formData.owner }
//                 });
//                 setOwners(response.data);
//             } catch (error) {
//                 console.error('Error fetching owners:', error);
//             }
//         };

//         if (formData.owner) {
//             handleSearch();
//         } else {
//             setOwners([]);
//         }
//     }, [formData.owner]);

//     useEffect(() => {
//         const fetchBrokers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/supply-chain-partners/brokers', {
//                     params: { name: formData.broker }
//                 });
//                 setBrokers(response.data);
//             } catch (error) {
//                 console.error('Error fetching brokers:', error);
//             }
//         };

//         if (formData.broker) {
//             fetchBrokers();
//         } else {
//             setBrokers([]);
//         }
//     }, [formData.broker]);


//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? (
//                 <>
//                     <h1 className="text-3xl font-bold mb-4">Vehicle/ Create</h1>

//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
//                             <div className="mb-4">
//                                 <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">Vehicle No</label>
//                                 <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="segmentCategory" className="block text-sm font-medium text-gray-700">Segment Category</label>
//                                 <input type="text" id="segmentCategory" name="segmentCategory" value={formData.segmentCategory} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="businessGroup" className="block text-sm font-medium text-gray-700">Business Group</label>
//                                 <input type="text" id="businessGroup" name="businessGroup" value={formData.businessGroup} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="oldRegistration" className="block text-sm font-medium text-gray-700">Old Registration</label>
//                                 <input type="text" id="oldRegistration" name="oldRegistration" value={formData.oldRegistration} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">Load Type</label>
//                                 <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="controllingBranch" className="block text-sm font-medium text-gray-700">Controlling Branch</label>
//                                 <input type="text" id="controllingBranch" name="controllingBranch" value={formData.controllingBranch} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">Registration Date</label>
//                                 <input type="date" id="registrationDate" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="manufacturingYear" className="block text-sm font-medium text-gray-700">Manufacturing Year</label>
//                                 <input type="text" id="manufacturingYear" name="manufacturingYear" value={formData.manufacturingYear} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">Supervisor</label>
//                                 <input type="text" id="supervisor" name="supervisor" value={formData.supervisor} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">Vehicle Type</label>
//                                 <input type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="trolleyNo" className="block text-sm font-medium text-gray-700">Trolley No</label>
//                                 <input type="text" id="trolleyNo" name="trolleyNo" value={formData.trolleyNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="ownership" className="block text-sm font-medium text-gray-700">Ownership</label>
//                                 <input type="text" id="ownership" name="ownership" value={formData.ownership} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="through" className="block text-sm font-medium text-gray-700">Through</label>
//                                 <select id="through" name="through" value={formData.through} onChange={handleChange} className="input w-full border border-black shadow-md">
//                                     <option value="">Select Type</option>
//                                     <option value="DIRECT">DIRECT</option>
//                                     <option value="BROKER">BROKER</option>
//                                 </select>
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make</label>
//                                 <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>



//                             <div className="mb-4">
//                                 <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
//                                 <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
//                                 <input
//                                     type="text"
//                                     id="owner"
//                                     name="owner"
//                                     value={formData.owner}
//                                     onChange={handleChange}
//                                     list="ownerSuggestions"
//                                     className="input w-full border border-black shadow-md"
//                                 />
//                                 <datalist id="ownerSuggestions">
//                                     {owners.map((owner) => (
//                                         <option key={owner._id} value={owner.name} />
//                                     ))}
//                                 </datalist>
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="broker" className="block text-sm font-medium text-gray-700">Broker</label>
//                                 <input
//                                     type="text"
//                                     id="broker"
//                                     name="broker"
//                                     value={formData.broker}
//                                     onChange={handleChange}
//                                     list="brokerSuggestions"
//                                     className="input w-full border border-black shadow-md"
//                                 />
//                                 <datalist id="brokerSuggestions">
//                                     {brokers.map((broker) => (
//                                         <option key={broker._id} value={broker.name} />
//                                     ))}
//                                 </datalist>
//                             </div>




//                             <div className="mb-4">
//                                 <label htmlFor="driver" className="block text-sm font-medium text-gray-700">Driver</label>
//                                 <input type="text" id="driver" name="driver" value={formData.driver} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentRoute" className="block text-sm font-medium text-gray-700">Current Route</label>
//                                 <input type="text" id="currentRoute" name="currentRoute" value={formData.currentRoute} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="rtoType" className="block text-sm font-medium text-gray-700">RTO Type</label>
//                                 <input type="text" id="rtoType" name="rtoType" value={formData.rtoType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="validUpto" className="block text-sm font-medium text-gray-700">Valid Upto</label>
//                                 <input type="date" id="validUpto" name="validUpto" value={formData.validUpto} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="rtoAuthority" className="block text-sm font-medium text-gray-700">RTO Authority</label>
//                                 <input type="text" id="rtoAuthority" name="rtoAuthority" value={formData.rtoAuthority} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="permitType" className="block text-sm font-medium text-gray-700">Permit Type</label>
//                                 <select id="permitType" name="permitType" value={formData.permitType} onChange={handleChange} className="input w-full border border-black shadow-md">
//                                     <option value="">Select Type</option>
//                                     <option value="STATE">STATE</option>
//                                     <option value="NATIONAL">NATIONAL</option>
//                                     <option value="INTERNATIONAL">INTERNATIONAL</option>
//                                 </select>
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="validState" className="block text-sm font-medium text-gray-700">Valid State</label>
//                                 <input type="text" id="validState" name="validState" value={formData.validState} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentODM" className="block text-sm font-medium text-gray-700">Current ODM</label>
//                                 <input type="text" id="currentODM" name="currentODM" value={formData.currentODM} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="oldODM" className="block text-sm font-medium text-gray-700">Old ODM</label>
//                                 <input type="text" id="oldODM" name="oldODM" value={formData.oldODM} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
//                                 <input type="text" id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="expireDate" className="block text-sm font-medium text-gray-700">Expire Date</label>
//                                 <input type="date" id="expireDate" name="expireDate" value={formData.expireDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700">Current Status</label>
//                                 <input type="text" id="currentStatus" name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentStation" className="block text-sm font-medium text-gray-700">Current Station</label>
//                                 <input type="text" id="currentStation" name="currentStation" value={formData.currentStation} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                         </div>
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

// export default Vehicle;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const Vehicle = () => {
//     const [formData, setFormData] = useState({
//         vehicleNo: '',
//         segmentCategory: '',
//         businessGroup: '',
//         oldRegistration: '',
//         loadType: '',
//         controllingBranch: '',
//         registrationDate: '',
//         manufacturingYear: '',
//         supervisor: '',
//         vehicleType: '',
//         trolleyNo: '',
//         ownership: '',
//         through: '',
//         make: '',
//         model: '',
//         owner: '',
//         broker: '',
//         driver: '',
//         currentRoute: '',
//         rtoType: '',
//         validUpto: '',
//         rtoAuthority: '',
//         permitType: '',
//         validState: '',
//         currentODM: '',
//         oldODM: '',
//         serviceType: '',
//         expireDate: '',
//         currentStatus: '',
//         currentStation: '',
//     });

//     const [submitted, setSubmitted] = useState(false);
//     const [owners, setOwners] = useState([]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await fetch('http://localhost:5000/vehicle-registrations', {
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
//             setSubmitted(true);
//         } catch (error) {
//             console.error('Error creating registration:', error.message);
//         }
//     };

//     useEffect(() => {
//         const handleSearch = async () => {
//             try {
//                 const response = await axios.get('http://localhost:5000/supply-chain-partners/owners', {
//                     params: { name: formData.owner }
//                 });
//                 setOwners(response.data);
//             } catch (error) {
//                 console.error('Error fetching owners:', error);
//             }
//         };

//         // Trigger search only if the input field is not empty
//         if (formData.owner) {
//             handleSearch();
//         } else {
//             setOwners([]); // Clear results if the input is empty
//         }
//     }, [formData.owner]); // Dependency array to trigger useEffect on input change


//     return (
//         <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//             {!submitted ? (
//                 <>
//                  <h1 className="text-3xl font-bold mb-4">Vehicle/ Create</h1>

//                     <form onSubmit={handleSubmit}>
//                         <div className="mt-6 mb-4">
//                             <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
//                                 Submit
//                             </button>
//                         </div>
//                         <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">



                            
//                             <div className="mb-4">
//                                 <label htmlFor="vehicleNo" className="block text-sm font-medium text-gray-700">vehicleNo</label>
//                                 <input type="text" id="vehicleNo" name="vehicleNo" value={formData.vehicleNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="segmentCategory" className="block text-sm font-medium text-gray-700">segmentCategory</label>
//                                 <input type="text" id="segmentCategory" name="segmentCategory" value={formData.segmentCategory} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="businessGroup" className="block text-sm font-medium text-gray-700">businessGroup</label>
//                                 <input type="text" id="businessGroup" name="businessGroup" value={formData.businessGroup} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="oldRegistration" className="block text-sm font-medium text-gray-700">oldRegistration</label>
//                                 <input type="text" id="oldRegistration" name="oldRegistration" value={formData.oldRegistration} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="loadType" className="block text-sm font-medium text-gray-700">loadType</label>
//                                 <input type="text" id="loadType" name="loadType" value={formData.loadType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="controllingBranch" className="block text-sm font-medium text-gray-700">controllingBranch</label>
//                                 <input type="text" id="controllingBranch" name="controllingBranch" value={formData.controllingBranch} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="registrationDate" className="block text-sm font-medium text-gray-700">registrationDate</label>
//                                 <input type="date" id="registrationDate" name="registrationDate" value={formData.registrationDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="manufacturingYear" className="block text-sm font-medium text-gray-700">manufacturingYear</label>
//                                 <input type="text" id="manufacturingYear" name="manufacturingYear" value={formData.manufacturingYear} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="supervisor" className="block text-sm font-medium text-gray-700">supervisor</label>
//                                 <input type="text" id="supervisor" name="supervisor" value={formData.supervisor} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>


//                             <div className="mb-4">
//                                 <label htmlFor="vehicleType" className="block text-sm font-medium text-gray-700">vehicleType</label>
//                                 <input type="text" id="vehicleType" name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="trolleyNo" className="block text-sm font-medium text-gray-700">trolleyNo</label>
//                                 <input type="text" id="trolleyNo" name="trolleyNo" value={formData.trolleyNo} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="ownership" className="block text-sm font-medium text-gray-700">ownership</label>
//                                 <input type="text" id="ownership" name="ownership" value={formData.ownership} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="through" className="block text-sm font-medium text-gray-700">through</label>
//                                 <select id="through" name="through" value={formData.through} onChange={handleChange} className="input w-full border border-black shadow-md">
//                                     <option value="">Select Type</option>
//                                     <option value="DIRECT">DIRECT</option>
//                                     <option value="BROKER">BROKER</option>
//                                 </select>
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="make" className="block text-sm font-medium text-gray-700">make</label>
//                                 <input type="text" id="make" name="make" value={formData.make} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="model" className="block text-sm font-medium text-gray-700">model</label>
//                                 <input type="text" id="model" name="model" value={formData.model} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>
//                             <div className="mb-4">
//                 <label htmlFor="owner" className="block text-sm font-medium text-gray-700">Owner</label>
//                 <input
//                     type="text"
//                     id="owner"
//                     name="owner"
//                     value={inputValue}
//                     onChange={handleChange}
//                     className="input w-full border border-black shadow-md"
//                 />
//             </div>
//             {suggestions.length > 0 && (
//                 <ul className="border border-gray-300 shadow-md">
//                     {suggestions.map((owner) => (
//                         <li
//                             key={owner._id}
//                             onClick={() => handleSuggestionClick(owner.name)}
//                             className="cursor-pointer p-2 hover:bg-gray-200"
//                         >
//                             {owner.name}
//                         </li>
//                     ))}
//                 </ul>
//             )}



// {/* 
//                             <div className="mb-4">
//                                 <label htmlFor="owner" className="block text-sm font-medium text-gray-700">owner</label>
//                                 <input type="text" id="owner" name="owner" value={formData.owner} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div> */}

//                             <div className="mb-4">
//                                 <label htmlFor="broker" className="block text-sm font-medium text-gray-700">broker</label>
//                                 <input type="text" id="broker" name="broker" value={formData.broker} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="driver" className="block text-sm font-medium text-gray-700">driver</label>
//                                 <input type="text" id="driver" name="driver" value={formData.driver} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentRoute" className="block text-sm font-medium text-gray-700">currentRoute</label>
//                                 <input type="text" id="currentRoute" name="currentRoute" value={formData.currentRoute} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="rtoType" className="block text-sm font-medium text-gray-700">rtoType</label>
//                                 <input type="text" id="rtoType" name="rtoType" value={formData.rtoType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="validUpto" className="block text-sm font-medium text-gray-700">validUpto</label>
//                                 <input type="date" id="validUpto" name="validUpto" value={formData.validUpto} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="rtoAuthority" className="block text-sm font-medium text-gray-700">rtoAuthority</label>
//                                 <input type="text" id="rtoAuthority" name="rtoAuthority" value={formData.rtoAuthority} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="permitType" className="block text-sm font-medium text-gray-700">permitType</label>
//                                 <select id="permitType" name="permitType" value={formData.permitType} onChange={handleChange} className="input w-full border border-black shadow-md">
//                                     <option value="">Select Type</option>
//                                     <option value="STATE">STATE</option>
//                                     <option value="NATIONAL">NATIONAL</option>
//                                     <option value="INTERNATIONAL">INTERNATIONAL</option>
//                                 </select>
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="validState" className="block text-sm font-medium text-gray-700">validState</label>
//                                 <input type="text" id="validState" name="validState" value={formData.validState} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentODM" className="block text-sm font-medium text-gray-700">currentODM</label>
//                                 <input type="text" id="currentODM" name="currentODM" value={formData.currentODM} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="oldODM" className="block text-sm font-medium text-gray-700">oldODM</label>
//                                 <input type="text" id="oldODM" name="oldODM" value={formData.oldODM} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">serviceType</label>
//                                 <input type="text" id="serviceType" name="serviceType" value={formData.serviceType} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="expireDate" className="block text-sm font-medium text-gray-700">expireDate</label>
//                                 <input type="text" id="expireDate" name="expireDate" value={formData.expireDate} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentStatus" className="block text-sm font-medium text-gray-700">currentStatus</label>
//                                 <input type="text" id="currentStatus" name="currentStatus" value={formData.currentStatus} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                             <div className="mb-4">
//                                 <label htmlFor="currentStation" className="block text-sm font-medium text-gray-700">currentStation</label>
//                                 <input type="text" id="currentStation" name="currentStation" value={formData.currentStation} onChange={handleChange} className="input w-full border border-black shadow-md" />
//                             </div>

//                         </div>
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

// export default Vehicle;



// import React from 'react'

// function Vehicle() {
//   return (
//     <div>
//       vehicle
//     </div>
//   )
// }

// export default Vehicle
