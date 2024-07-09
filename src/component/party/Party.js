
import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Party = () => {
    const [formData, setFormData] = useState({
        type: '',
        code: '',
        lastCode: '',
        name: '',
        printAs: '',
        group: '',
        expenseType: '',
        subType: '',
        controllingBranch: '',
        parentAccount: '',
        contact: {
            Address: '',
            City: '',
            PIN: '',
            State: '',
            Country: '',
            Person: '',
            Landline: '',
            Designation: '',
            Mobile: '',
            Email: '',
            Fax: '',
            Remarks: '',
        },
        correctAddress: {
            Address: '',
            PIN: '',
            City: '',
            State: '',
            Country: '',
            Remarks: '',
        },
        gst: {
            registrationType: '',
            servicesType: '',
            defaultGST: '',
            GSTIN: '',
            Remarks: '',
        },
        tds: { 
            PAN: '', 
            TANNo: '',
            declarationFor: '',
            tdsStatus: '',
            tdsCode: '',
            natureOfPayment: '',
            tdsSection: '',
            exemptionCertNo: '',
            exemptionLimit: '',
            validUpto: '',
            PANImage: '',
            imageOfDeclaration: '',
            remarks: '',
        },
        itr: {
            ITRNo: '',
            ITRSubmissionDate: '',
            ITRAttachment: '',
            Remarks: '',
        },
        generalDetails: {
            marketingPerson: '',
            bankUploadPrefix: '',
            partyStatus: '',
            reason: '',
            paymentMethod: '',
            paymentTerms: '',
            creditLimit: '',
            allocated: '',
            deliveryPaymentMode: '',
            deliveryAt: '',
            outstandingAmt: '',
            graceDays: '',
            lockDate: '',
            paymentBase: '',
            billFor: '',
            billAttachReport: '',
            urlForTracking: '',
            consignmentAttachReport: '',
            introDate: '',
            closeDate: '',
            remarks: '',
        },
        bankDetails: {
            bankName: '',
            ifscCode: '',
            mobile: '',
            email: '',
            branchName: '',
            bankAccountNo: '',
            beneficiaryName: '',
            cancelledChequeOrPassbook: '',
            remarks: '',
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

    const handleContactChange = (e) => {
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

    // Similarly for correctAddress
    const handleCorrectAddressChange = (e) => {
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

    // Similarly for correctAddress
    const handleGstChange = (e) => {
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
    const handleTdsChange = (e) => {
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

    const handleItrChange = (e) => {
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
    const handleGeneralDetailsChange = (e) => {
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
    const handleBankDetailsChange = (e) => {
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
            const response = await fetch('http://localhost:5000/partiesregistrations', {
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


    const copyDataToCorrectAddress = () => {
        // Copy data from contact to correctAddress
        setFormData(prevState => ({
            ...prevState,
            correctAddress: { ...prevState.contact }
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            {!submitted ? ( // Render form only if not submitted
                <>
                    <h1 className="text-3xl font-bold mb-4">Party/ Create</h1>

                    <form onSubmit={handleSubmit} >
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-white p-4 rounded-lg shadow-lg">
                        <div className='sm:flex sm:flex-wrap gap-4'>

                            <div className="mb-4">
                                <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
                                <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                    <option value="">Select Type</option>
                                    <option value="Customer1">Billing Party</option>
                                    <option value="Customer2">Consignee/Consignor</option>

                                </select>
                            </div>


                            <div className="mb-4">
                                <label htmlFor="code" className="block text-sm font-medium text-gray-700">Code</label>
                                <input type="text" id="code" name="code" value={formData.code} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>

                            {/* Last Code */}
                            <div className="mb-4">
                                <label htmlFor="lastCode" className="block text-sm font-medium text-gray-700">Last Code</label>
                                <input type="text" id="lastCode" name="lastCode" value={formData.lastCode} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>

                            {/* Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>

                            {/* Print As */}
                            <div className="mb-4">
                                <label htmlFor="printAs" className="block text-sm font-medium text-gray-700">Print As</label>
                                <input type="text" id="printAs" name="printAs" value={formData.printAs} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>

                            {/* Group */}
                            <div className="mb-4">
                                <label htmlFor="group" className="block text-sm font-medium text-gray-700">Group</label>
                                <input type="text" id="group" name="group" value={formData.group} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>

                            {/* Expense Type */}
                            <div className="mb-4">
                                <label htmlFor="expenseType" className="block text-sm font-medium text-gray-700">Expense Type</label>
                                <input type="text" id="expenseType" name="expenseType" value={formData.expenseType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>

                            {/* Sub Type */}
                            <div className="mb-4">
                                <label htmlFor="subType" className="block text-sm font-medium text-gray-700">Sub Type</label>
                                <input type="text" id="subType" name="subType" value={formData.subType} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>

                            {/* Controlling Branch */}
                            <div className="mb-4">
                                <label htmlFor="controllingBranch" className="block text-sm font-medium text-gray-700">Controlling Branch</label>
                                <input type="text" id="controllingBranch" name="controllingBranch" value={formData.controllingBranch} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                            </div>

                            {/* Parent Account */}
                            <div className="mb-4">
                                <label htmlFor="parentAccount" className="block text-sm font-medium text-gray-700">Parent Account</label>
                                <input type="text" id="parentAccount" name="parentAccount" value={formData.parentAccount} onChange={handleChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                            </div>
                        </div>
                        </div>

                        <Tabs className="bg-white mt-4 rounded-lg shadow-lg">
                            <TabList className="flex flex-wrap border-b border-gray-200 bg-indigo-100 rounded-t-lg">
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Contact</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Correct Address</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">GST</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">TDS</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">ITR</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">General Details</Tab>
                                <Tab className="py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto text-indigo-800">Bank Details</Tab>
                            </TabList>

                            {/* Contact Tab Panel */}
                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* Contact Address */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Address" className="block text-sm font-medium text-gray-700">Address</label>
                                        <input type="text" id="contact.Address" name="contact.Address" value={formData.contact.Address} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                                    </div>
                                    {/* City */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.City" className="block text-sm font-medium text-gray-700">City</label>
                                        <input type="text" id="contact.City" name="contact.City" value={formData.contact.City} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* PIN */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.PIN" className="block text-sm font-medium text-gray-700">PIN</label>
                                        <input type="text" id="contact.PIN" name="contact.PIN" value={formData.contact.PIN} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* State */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.State" className="block text-sm font-medium text-gray-700">State</label>
                                        <input type="text" id="contact.State" name="contact.State" value={formData.contact.State} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Country */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Country" className="block text-sm font-medium text-gray-700">Country</label>
                                        <input type="text" id="contact.Country" name="contact.Country" value={formData.contact.Country} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Person */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Person" className="block text-sm font-medium text-gray-700">Person</label>
                                        <input type="text" id="contact.Person" name="contact.Person" value={formData.contact.Person} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Landline */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Landline" className="block text-sm font-medium text-gray-700">Landline</label>
                                        <input type="text" id="contact.Landline" name="contact.Landline" value={formData.contact.Landline} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Designation */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Designation" className="block text-sm font-medium text-gray-700">Designation</label>
                                        <input type="text" id="contact.Designation" name="contact.Designation" value={formData.contact.Designation} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Mobile */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                                        <input type="text" id="contact.Mobile" name="contact.Mobile" value={formData.contact.Mobile} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Email */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" id="contact.Email" name="contact.Email" value={formData.contact.Email} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    {/* Fax */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="contact.Fax" className="block text-sm font-medium text-gray-700">Fax</label>
                                        <input type="text" id="contact.Fax" name="contact.Fax" value={formData.contact.Fax} onChange={handleContactChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>


                                    <div className="col-span-6">
                                        <label htmlFor="contact.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="contact.Remarks" name="contact.Remarks" value={formData.contact.Remarks} onChange={handleContactChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                </div>

                            </TabPanel>


                            <TabPanel>
                                <div >

                                    <div className="p-2">
                                        <label htmlFor="copyDataCheckbox" className="block mb-2">
                                            <input type="checkbox" id="copyDataCheckbox" onClick={copyDataToCorrectAddress} />
                                            Same as Permanent Address
                                        </label>
                                    </div>
                                    <div className="grid grid-cols-6 gap-6 p-2">
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="correctAddress.Address" className="block text-sm font-medium text-gray-700">Address</label>
                                            <input type="text" id="correctAddress.Address" name="correctAddress.Address" value={formData.correctAddress.Address} onChange={handleCorrectAddressChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                        </div>
                                        {/* PIN */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="correctAddress.PIN" className="block text-sm font-medium text-gray-700">PIN</label>
                                            <input type="text" id="correctAddress.PIN" name="correctAddress.PIN" value={formData.correctAddress.PIN} onChange={handleCorrectAddressChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                        </div>
                                        {/* City */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="correctAddress.City" className="block text-sm font-medium text-gray-700">City</label>
                                            <input type="text" id="correctAddress.City" name="correctAddress.City" value={formData.correctAddress.City} onChange={handleCorrectAddressChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                        </div>
                                        {/* State */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="correctAddress.State" className="block text-sm font-medium text-gray-700">State</label>
                                            <input type="text" id="correctAddress.State" name="correctAddress.State" value={formData.correctAddress.State} onChange={handleCorrectAddressChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                        </div>
                                        {/* Country */}
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="correctAddress.Country" className="block text-sm font-medium text-gray-700">Country</label>
                                            <input type="text" id="correctAddress.Country" name="correctAddress.Country" value={formData.correctAddress.Country} onChange={handleCorrectAddressChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                        </div>


                                        <div className="col-span-6">
                                            <label htmlFor="correctAddress.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                            <textarea id="correctAddress.Remarks" name="correctAddress.Remarks" value={formData.correctAddress.Remarks} onChange={handleCorrectAddressChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                        </div>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* Registration Type */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="gst.registrationType" className="block text-sm font-medium text-gray-700">Registration Type</label>
                                        <select id="gst.registrationType" name="gst.registrationType" value={formData.gst.registrationType} onChange={handleGstChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select Registration Type</option>
                                            <option value="Registered-Regular">Registered Regular</option>
                                            <option value="Unregular">Unregular</option>
                                            <option value="cunsumer">cunsumer</option>
                                            <option value="EOU">EOU</option>
                                            <option value="Registered-Composition">Registered-Composition</option>
                                            <option value="SEZ">SEZ</option>
                                            <option value="UIN-holder">UIN-holder</option>
                                        </select>
                                    </div>

                                    {/* Services Type */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="gst.servicesType" className="block text-sm font-medium text-gray-700">Services Type</label>
                                        <select id="gst.servicesType" name="gst.servicesType" value={formData.gst.servicesType} onChange={handleGstChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select Services Type</option>
                                            <option value="GOODS">Goods</option>
                                            <option value="SERVICES">Services</option>
                                            {/* Add other options */}
                                        </select>
                                    </div>

                                    {/* Default GST */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="gst.defaultGST" className="block text-sm font-medium text-gray-700">Default GST</label>
                                        <select id="gst.defaultGST" name="gst.defaultGST" value={formData.gst.defaultGST} onChange={handleGstChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select Default GST</option>
                                            <option value="CONSIGNEE">Consignee</option>
                                            <option value="CONSIGNOR">Consignor</option>
                                            <option value="GST12">GST12</option>
                                            <option value="GST18">GST18</option>
                                            <option value="GST5">GST5</option>
                                            <option value="GST5%(RCM)">GST5%(RCM)</option>
                                            <option value="GST NEW">GST NEW</option>
                                            <option value="GST NULL">GST NULL</option>
                                        </select>
                                    </div>

                                    {/* GSTIN */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="gst.GSTIN" className="block text-sm font-medium text-gray-700">GSTIN</label>
                                        <input type="text" id="gst.GSTIN" name="gst.GSTIN" value={formData.gst.GSTIN} onChange={handleGstChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>



                                    <div className="col-span-6">
                                        <label htmlFor="gst.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="gst.Remarks" name="gst.Remarks" value={formData.gst.Remarks} onChange={handleGstChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* PAN */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.PAN" className="block text-sm font-medium text-gray-700">PAN</label>
                                        <input type="text" id="tds.PAN" name="tds.PAN" value={formData.tds.PAN} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* TAN No */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.TANNo" className="block text-sm font-medium text-gray-700">TAN No</label>
                                        <input type="text" id="tds.TANNo" name="tds.TANNo" value={formData.tds.TANNo} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                                    </div>

                                    {/* Declaration For */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.declarationFor" className="block text-sm font-medium text-gray-700">Declaration For</label>
                                        <select id="tds.declarationFor" name="tds.declarationFor" value={formData.tds.declarationFor} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select Declaration For</option>
                                            <option value="EXEMPTION">Exemption</option>
                                            <option value="LOWER RATE">Lower Rate</option>
                                        </select>
                                    </div>

                                    {/* TDS Status */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.tdsStatus" className="block text-sm font-medium text-gray-700">TDS Status</label>
                                        <select id="tds.tdsStatus" name="tds.tdsStatus" value={formData.tds.tdsStatus} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select TDS Status</option>
                                            <option value=".25">0.25</option>
                                            <option value="COMPANY">Company</option>
                                            <option value="OTHER THAN COMPANY">Other Than Company</option>
                                        </select>
                                    </div>

                                    {/* TDS Code */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.tdsCode" className="block text-sm font-medium text-gray-700">TDS Code</label>
                                        <select id="tds.tdsCode" name="tds.tdsCode" value={formData.tds.tdsCode} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select TDS Code</option>
                                            <option value="19411">19411</option>
                                            <option value="TT">TT</option>
                                        </select>
                                    </div>

                                    {/* Nature of Payment */}
                                    <div className="col-span-6">
                                        <label htmlFor="tds.natureOfPayment" className="block text-sm font-medium text-gray-700">Nature of Payment</label>
                                        <input type="text" id="tds.natureOfPayment" name="tds.natureOfPayment" value={formData.tds.natureOfPayment} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* TDS Section */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.tdsSection" className="block text-sm font-medium text-gray-700">TDS Section</label>
                                        <input type="text" id="tds.tdsSection" name="tds.tdsSection" value={formData.tds.tdsSection} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Exemption Cert No */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.exemptionCertNo" className="block text-sm font-medium text-gray-700">Exemption Cert No</label>
                                        <input type="text" id="tds.exemptionCertNo" name="tds.exemptionCertNo" value={formData.tds.exemptionCertNo} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Exemption Limit */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.exemptionLimit" className="block text-sm font-medium text-gray-700">Exemption Limit</label>
                                        <input type="text" id="tds.exemptionLimit" name="tds.exemptionLimit" value={formData.tds.exemptionLimit} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                                    </div>

                                    {/* Valid Upto */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.validUpto" className="block text-sm font-medium text-gray-700">Valid Upto</label>
                                        <input type="date" id="tds.validUpto" name="tds.validUpto" value={formData.tds.validUpto} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* PAN Image */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.PANImage" className="block text-sm font-medium text-gray-700">PAN Image</label>
                                        <input type="text" id="tds.PANImage" name="tds.PANImage" value={formData.tds.PANImage} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Image of Declaration */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="tds.imageOfDeclaration" className="block text-sm font-medium text-gray-700">Image of Declaration</label>
                                        <input type="text" id="tds.imageOfDeclaration" name="tds.imageOfDeclaration" value={formData.tds.imageOfDeclaration} onChange={handleTdsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>


                                    <div className="col-span-6">
                                        <label htmlFor="tds.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="tds.remarks" name="tds.remarks" value={formData.tds.remarks} onChange={handleTdsChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                </div>
                            </TabPanel>



                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* PAN */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="itr.ITRNo" className="block text-sm font-medium text-gray-700">ITRNo</label>
                                        <input type="text" id="itr.ITRNo" name="itr.ITRNo" value={formData.itr.ITRNo} onChange={handleItrChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* TAN No */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="itr.ITRAttachment" className="block text-sm font-medium text-gray-700">ITRAttachment</label>
                                        <input type="text" id="itr.ITRAttachment" name="itr.ITRAttachment" value={formData.itr.ITRAttachment} onChange={handleItrChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="itr.ITRSubmissionDate" className="block text-sm font-medium text-gray-700">ITRSubmissionDate</label>
                                        <input type="date" id="itr.ITRSubmissionDate" name="itr.ITRSubmissionDate" value={formData.itr.ITRSubmissionDate} onChange={handleItrChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>





                                    <div className="col-span-6">
                                        <label htmlFor="itr.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="itr.Remarks" name="itr.Remarks" value={formData.itr.remarks} onChange={handleItrChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                </div>
                            </TabPanel>




                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.marketingPerson" className="block text-sm font-medium text-gray-700">marketingPerson</label>
                                        <input type="text" id="generalDetails.marketingPerson" name="generalDetails.marketingPerson" value={formData.generalDetails.marketingPerson} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.bankUploadPrefix" className="block text-sm font-medium text-gray-700">bankUploadPrefix</label>
                                        <input type="text" id="generalDetails.bankUploadPrefix" name="generalDetails.bankUploadPrefix" value={formData.generalDetails.bankUploadPrefix} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.partyStatus" className="block text-sm font-medium text-gray-700">partyStatus</label>
                                        <select id="generalDetails.partyStatus" name="generalDetails.partyStatus" value={formData.generalDetails.partyStatus} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="blacklisted">blacklisted</option>
                                            <option value="stop payment">stop payment</option>
                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.paymentMethod" className="block text-sm font-medium text-gray-700">paymentMethod</label>
                                        <select id="generalDetails.paymentMethod" name="generalDetails.paymentMethod" value={formData.generalDetails.paymentMethod} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="TO BB">TO BB</option>
                                            <option value="CASH">CASH</option>
                                            <option value="FOC">FOC</option>
                                            <option value="TO PAY">TO PAY</option>

                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.paymentTerms" className="block text-sm font-medium text-gray-700">Payment Terms</label>
                                        <input type="text" id="generalDetails.paymentTerms" name="generalDetails.paymentTerms" value={formData.generalDetails.paymentTerms} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.creditLimit" className="block text-sm font-medium text-gray-700">Credit Limit</label>
                                        <input type="text" id="generalDetails.creditLimit" name="generalDetails.creditLimit" value={formData.generalDetails.creditLimit} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.allocated" className="block text-sm font-medium text-gray-700">Allocated</label>
                                        <select id="generalDetails.allocated" name="generalDetails.allocated" value={formData.generalDetails.allocated} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="Consignment">Consignment</option>
                                            <option value="bill">Bill</option>
                                            <option value="manifest">Manifest</option>
                                            <option value="vehicle Hire">Vehicle Hire</option>
                                            <option value="Vehicle">Vehicle</option>
                                            <option value="Cost Center">Cost Center</option>
                                            <option value="Job Wise">Job Wise</option>
                                        </select>
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.deliveryPaymentMode" className="block text-sm font-medium text-gray-700">Delivery Payment Mode</label>
                                        <select id="generalDetails.deliveryPaymentMode" name="generalDetails.deliveryPaymentMode" value={formData.generalDetails.deliveryPaymentMode} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="CASH">CASH</option>
                                            <option value="CHEQUE">CHEQUE</option>
                                            <option value="CREDIT">CREDIT</option>
                                            <option value="MULTI">MULTI</option>
                                            <option value="OTHER">OTHER</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.deliveryAt" className="block text-sm font-medium text-gray-700">Delivery At</label>
                                        <select id="generalDetails.deliveryAt" name="generalDetails.deliveryAt" value={formData.generalDetails.deliveryAt} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="DIRECT">DIRECT</option>
                                            <option value="DOOR">DOOR</option>
                                            <option value="DOOR TO DOOR">DOOR TO DOOR</option>
                                            <option value="DOOR TO TERMINAL">DOOR TO TERMINAL</option>
                                            <option value="GODOWN">GODOWN</option>
                                            <option value="LOCAL DELIVERY">LOCAL DELIVERY</option>
                                            <option value="TERMINAL TO DOOR">TERMINAL TO DOOR</option>
                                            <option value="TERMINAL TO TERMINAL">TERMINAL TO TERMINAL</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.outstandingAmt" className="block text-sm font-medium text-gray-700">Outstanding Amount</label>
                                        <input type="text" id="generalDetails.outstandingAmt" name="generalDetails.outstandingAmt" value={formData.generalDetails.outstandingAmt} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.graceDays" className="block text-sm font-medium text-gray-700">Grace Days</label>
                                        <input type="number" id="generalDetails.graceDays" name="generalDetails.graceDays" value={formData.generalDetails.graceDays} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.lockDate" className="block text-sm font-medium text-gray-700">Lock Date</label>
                                        <input type="date" id="generalDetails.lockDate" name="generalDetails.lockDate" value={formData.generalDetails.lockDate} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.paymentBase" className="block text-sm font-medium text-gray-700">Payment Base</label>
                                        <select id="generalDetails.paymentBase" name="generalDetails.paymentBase" value={formData.generalDetails.paymentBase} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="BOTH">BOTH</option>
                                            <option value="VEHICAL HIRE">VEHICAL HIRE</option>
                                            <option value="MANIFEST">MANIFEST</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.billFor" className="block text-sm font-medium text-gray-700">Bill For</label>
                                        <input type="text" id="generalDetails.billFor" name="generalDetails.billFor" value={formData.generalDetails.billFor} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.billAttachReport" className="block text-sm font-medium text-gray-700">Bill Attach Report</label>
                                        <input type="text" id="generalDetails.billAttachReport" name="generalDetails.billAttachReport" value={formData.generalDetails.billAttachReport} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.urlForTracking" className="block text-sm font-medium text-gray-700">URL For Tracking</label>
                                        <input type="text" id="generalDetails.urlForTracking" name="generalDetails.urlForTracking" value={formData.generalDetails.urlForTracking} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.consignmentAttachReport" className="block text-sm font-medium text-gray-700">Consignment Attach Report</label>
                                        <select id="generalDetails.consignmentAttachReport" name="generalDetails.consignmentAttachReport" value={formData.generalDetails.consignmentAttachReport} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2">
                                            <option value="">Select</option>
                                            <option value="PrintConsignment.rpt">PrintConsignment.rpt</option>
                                            <option value="PrintConsignmentDedicated.rpt">PrintConsignmentDedicated.rpt</option>
                                            <option value="PrintConsignmentLabel.rpt">PrintConsignmentLabel.rpt</option>
                                            <option value="PrintConsignment_VTPL.rpt">PrintConsignment_VTPL.rpt</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.introDate" className="block text-sm font-medium text-gray-700">Intro Date</label>
                                        <input type="date" id="generalDetails.introDate" name="generalDetails.introDate" value={formData.generalDetails.introDate} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"/>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.closeDate" className="block text-sm font-medium text-gray-700">Close Date</label>
                                        <input type="date" id="generalDetails.closeDate" name="generalDetails.closeDate" value={formData.generalDetails.closeDate} onChange={handleGeneralDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="generalDetails.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="generalDetails.remarks" name="generalDetails.remarks" value={formData.generalDetails.remarks} onChange={handleGeneralDetailsChange} rows="3" className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* Bank Name */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
                                        <input type="text" id="bankDetails.bankName" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* IFSC Code */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
                                        <input type="text" id="bankDetails.ifscCode" name="bankDetails.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Mobile */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
                                        <input type="text" id="bankDetails.mobile" name="bankDetails.mobile" value={formData.bankDetails.mobile} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Email */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="text" id="bankDetails.email" name="bankDetails.email" value={formData.bankDetails.email} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Branch Name */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
                                        <input type="text" id="bankDetails.branchName" name="bankDetails.branchName" value={formData.bankDetails.branchName} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Bank A/C No. */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.bankAccountNo" className="block text-sm font-medium text-gray-700">Bank A/C No.</label>
                                        <input type="text" id="bankDetails.bankAccountNo" name="bankDetails.bankAccountNo" value={formData.bankDetails.bankAccountNo} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Beneficiary Name */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.beneficiaryName" className="block text-sm font-medium text-gray-700">Beneficiary Name</label>
                                        <input type="text" id="bankDetails.beneficiaryName" name="bankDetails.beneficiaryName" value={formData.bankDetails.beneficiaryName} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Cancelled Cheque or PassBook Remarks */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="bankDetails.cancelledChequeOrPassbook" className="block text-sm font-medium text-gray-700">Cancelled Cheque or PassBook </label>
                                        <input type="text" id="bankDetails.cancelledChequeOrPassbook" name="bankDetails.cancelledChequeOrPassbook" value={formData.bankDetails.cancelledChequeOrPassbook} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2" />
                                    </div>

                                    {/* Remarks */}
                                    <div className="col-span-6">
                                        <label htmlFor="bankDetails.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="bankDetails.remarks" name="bankDetails.remarks" value={formData.bankDetails.remarks} onChange={handleBankDetailsChange} className="input w-full border border-gray-300 rounded-md shadow-sm p-2"></textarea>
                                    </div>
                                </div>
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

export default Party;
