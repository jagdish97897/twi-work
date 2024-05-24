
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Consignment = () => {
    const [formData, setFormData] = useState({
        jobOrder_no: '',
        container: {
          linename: '',
          date: '',
          loc: '',
          cgw: '',
          loadingno: '',
          loadingdate: '',
          Remarks: '',
        }
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [fieldName, nestedFieldName] = name.split('.');
            setFormData({
                ...formData,
                [fieldName]: {
                    ...formData[fieldName],
                    [nestedFieldName]: value
                }
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

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

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? ( // Render form only if not submitted
                <>
                    <h1 className="text-3xl font-bold mb-4">Consignment/ Create</h1>

                    <form onSubmit={handleSubmit} >
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">


                            <div className="mb-4">
                                <label htmlFor="jobOrder_no" className="block text-sm font-medium text-gray-700">jobOrder_no</label>
                                <input type="text" id="jobOrder_no" name="jobOrder_no" value={formData.jobOrder_no} onChange={handleChange} className="input w-full border border-black shadow-md" />
                            </div>
                          </div>

                        <Tabs className="bg-[#FFFFFF] pt-2">
                            <TabList className="flex flex-wrap border-b border-gray-200">
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Container</Tab>
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Charges</Tab>
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">COD</Tab>

                            </TabList>

                            {/* Contact Tab Panel */}
                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* Contact Address */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.linename" className="block text-sm font-medium text-gray-700">linename</label>
                                        <input type="text" id="container.linename" name="container.linename" value={formData.container.linename} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    {/* City */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.date" className="block text-sm font-medium text-gray-700">date</label>
                                        <input type="date" id="container.date" name="container.date" value={formData.container.date} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.loc" className="block text-sm font-medium text-gray-700">loc</label>
                                        <input type="text" id="container.loc" name="container.loc" value={formData.container.loc} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.cgw" className="block text-sm font-medium text-gray-700">cgw</label>
                                        <input type="text" id="container.cgw" name="container.cgw" value={formData.container.cgw} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.loadingno" className="block text-sm font-medium text-gray-700">loadingno</label>
                                        <input type="text" id="container.loadingno" name="container.loadingno" value={formData.container.loadingno} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="container.loadingdate" className="block text-sm font-medium text-gray-700">loadingdate</label>
                                        <input type="text" id="container.loadingdate" name="container.loadingdate" value={formData.container.loadingdate} onChange={handleContainerChange} className="input w-full border border-black shadow-md" />
                                    </div>

                                    <div className="col-span-6">
                                        <label htmlFor="container.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="container.Remarks" name="container.Remarks" value={formData.container.Remarks} onChange={handleContainerChange} rows="3" className="input w-full border border-black shadow-md" />
                                    </div>
                                </div>

                            </TabPanel>


                            <TabPanel>
                            
                            </TabPanel>
                            <TabPanel>
                              
                            </TabPanel>

                        </Tabs>
                        

                        {/* Submit button */}

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

export default Consignment;


// import React from 'react'

// function Consignment() {
//   return (
//     <div>
//       consignment
//     </div>
//   )
// }

// export default Consignment
