


import React, { useState } from 'react';

const SupplyChainPartner = () => {
    const [formData, setFormData] = useState({
        type: '',
        name: '',
        address: '',
        country: '',
        state: '',
        city: '',
        PIN: '',
        phone: '',
        PAN: '',
        email: '',
        photo: '',
        remark: ''
    });

    const [submitted, setSubmitted] = useState(false);

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
            const response = await fetch('http://localhost:5000/allsupplychainpartnerRegistration', {
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

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? (
                <>
            {/* <h1 className="bg-gradient-to-b from-gray-50 to-red-500 text-3xl font-bold rounded-md text-center shadow-lg shadow-red-700/50">SUPPLY CHAIN PARTNER/CREATE</h1> */}
            <h1 className="text-3xl font-bold mb-4">SUPPLY CHAIN PARTNER/CREATE</h1>

                    <form onSubmit={handleSubmit}>
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">

                            <div className="mb-4">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-black shadow-md">
                                    <option value="">Select Type</option>
                                    <option value="Owner">Owner</option>
                                    <option value="Broker">Broker</option>
                                </select>
                            </div>

                            {/* Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* Address */}
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* Country */}
                            <div className="mb-4">
                                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                                <input type="text" id="country" name="country" value={formData.country} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* State */}
                            <div className="mb-4">
                                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                                <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* City */}
                            <div className="mb-4">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* PIN */}
                            <div className="mb-4">
                                <label htmlFor="PIN" className="block text-sm font-medium text-gray-700">PIN</label>
                                <input type="text" id="PIN" name="PIN" value={formData.PIN} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* Phone */}
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* PAN */}
                            <div className="mb-4">
                                <label htmlFor="PAN" className="block text-sm font-medium text-gray-700">PAN</label>
                                <input type="text" id="PAN" name="PAN" value={formData.PAN} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* Photo */}
                            <div className="mb-4">
                                <label htmlFor="photo" className="block text-sm font-medium text-gray-700">Photo</label>
                                <input type="text" id="photo" name="photo" value={formData.photo} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>

                            {/* Remark */}
                            <div className="mb-4">
                                <label htmlFor="remark" className="block text-sm font-medium text-gray-700">Remark</label>
                                <input type="text" id="remark" name="remark" value={formData.remark} onChange={handleChange} className="input w-full border border-black shadow-md" />
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

export default SupplyChainPartner;




// import React from 'react'

// function SupplyChainPartner() {
//   return (
//     <div>
//       jjkjmjm
//     </div>
//   )
// }

// export default SupplyChainPartner
