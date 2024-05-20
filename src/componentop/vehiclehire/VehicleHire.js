import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const VehicleHire = () => {
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
        total: {
          base: Number,
          guaranteed_weight: Number,
          kanta_weight: Number,
          slip_no: String
      },
      vehicle_details: {
        owner: String,
        address: String,
        pan: String,
        mobile: String,
        photo1: String,
        photo2: String
    },

    driver_profile: {
      name: String,
      address: String,
      mobile: String,
      lic_no: String,
      photo1: String,
      photo2: String
  },
  broker_profile: {
    mobile_no: String,
    document_type: String,
    photo1: String
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
        bankDetails:{
            bankName:'',
            ifscCode:'',
            mobile:'',
            email:'',
            branchName:'',
            bankAccountNo:'',
            beneficiaryName:'',
            cancelledChequeOrPassbook:'',
            remarks:'',
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

    // Corrected handleChange for nested address fields
    const handleTotalChange = (e) => {
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
    const handleVehicleDetailsChange = (e) => {
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
    const handleDriverProfileChange = (e) => {
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
    const handleBrokerProfileChange = (e) => {
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
                    <h1 className="text-3xl font-bold mb-4">Vehicle Hire</h1>

                    <form onSubmit={handleSubmit} >
                        <div className="mt-6 mb-4">
                            <button type="submit" className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                submit
                            </button>
                        </div>
                        <div className="space-y-4 bg-[#FFFFFF] p-2 sm:flex sm:flex-wrap gap-2">
    {/* Document Type */}
    <div className="mb-4">
        <label htmlFor="document_type" className="block text-sm font-medium text-gray-700">Document Type</label>
        <select id="document_type" name="document_type" value={formData.document_type} onChange={handleChange} className="input w-full border border-black shadow-md" required>
            <option value="">Select Document Type</option>
            {/* Add options based on DocumentTypeEnum */}
        </select>
    </div>
    
    {/* Type */}
    <div className="mb-4">
        <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
        <select id="type" name="type" value={formData.type} onChange={handleChange} className="input w-full border border-black shadow-md" required>
            <option value="">Select Type</option>
            {/* Add options based on TypeEnum */}
        </select>
    </div>
    
    {/* Broker Name */}
    <div className="mb-4">
        <label htmlFor="broker_name" className="block text-sm font-medium text-gray-700">Broker Name</label>
        <input type="text" id="broker_name" name="broker_name" value={formData.broker_name} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Vehicle Number */}
    <div className="mb-4">
        <label htmlFor="vehicle_number" className="block text-sm font-medium text-gray-700">Vehicle Number</label>
        <input type="text" id="vehicle_number" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} className="input w-full border border-black shadow-md" required />
    </div>
    
    {/* Date */}
    <div className="mb-4">
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
        <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Source */}
    <div className="mb-4">
        <label htmlFor="source" className="block text-sm font-medium text-gray-700">Source</label>
        <input type="text" id="source" name="source" value={formData.source} onChange={handleChange} className="input w-full border border-black shadow-md" required />
    </div>
    
    {/* Destination */}
    <div className="mb-4">
        <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destination</label>
        <input type="text" id="destination" name="destination" value={formData.destination} onChange={handleChange} className="input w-full border border-black shadow-md" required />
    </div>
    
    {/* Via */}
    <div className="mb-4">
        <label htmlFor="via" className="block text-sm font-medium text-gray-700">Via</label>
        <input type="text" id="via" name="via" value={formData.via} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Multiple Delivery Point */}
    <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700">Multiple Delivery Point</label>
    <div className="flex items-center">

        <input type="radio" id="multiple_delivery_point_yes" name="multiple_delivery_point" value={true}  onChange={handleChange} className="mr-2 border border-black shadow-md" />
        <label htmlFor="multiple_delivery_point_yes" className="mr-4 text-sm text-gray-700">Yes</label>
        
        <input type="radio" id="multiple_delivery_point_no" name="multiple_delivery_point" value={false}  onChange={handleChange} className="mr-2 border border-black shadow-md" />
        <label htmlFor="multiple_delivery_point_no" className="text-sm text-gray-700">No</label>
    </div>
</div>

    
    {/* Manifest No */}
    <div className="mb-4">
        <label htmlFor="manifest_no" className="block text-sm font-medium text-gray-700">Manifest No</label>
        <input type="text" id="manifest_no" name="manifest_no" value={formData.manifest_no} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Placement No */}
    <div className="mb-4">
        <label htmlFor="placement_no" className="block text-sm font-medium text-gray-700">Placement No</label>
        <input type="text" id="placement_no" name="placement_no" value={formData.placement_no} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Contents */}
    <div className="mb-4">
        <label htmlFor="contents" className="block text-sm font-medium text-gray-700">Contents</label>
        <input type="text" id="contents" name="contents" value={formData.contents} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Vehicle */}
    <div className="mb-4">
        <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">Vehicle</label>
        <input type="text" id="vehicle" name="vehicle" value={formData.vehicle} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Load Type */}
    <div className="mb-4">
        <label htmlFor="load_type" className="block text-sm font-medium text-gray-700">Load Type</label>
        <select id="load_type" name="load_type" value={formData.load_type} onChange={handleChange} className="input w-full border border-black shadow-md">
            <option value="">Select Load Type</option>
            {/* Add options based on LoadTypeEnum */}
        </select>
    </div>
    
    {/* Pay to Transporter */}
    <div className="mb-4">
        <label htmlFor="pay_to_transporter" className="block text-sm font-medium text-gray-700">Pay to Transporter</label>
        <select id="pay_to_transporter" name="pay_to_transporter" value={formData.pay_to_transporter} onChange={handleChange} className="input w-full border border-black shadow-md" required>
            <option value="">Select Pay to Transporter</option>
            {/* Add options based on PayToTransporterEnum */}
        </select>
    </div>
    
    {/* State */}
    <div className="mb-4">
        <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
        <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* PAN */}
    <div className="mb-4">
        <label htmlFor="pan" className="block text-sm font-medium text-gray-700">PAN</label>
        <input type="text" id="pan" name="pan" value={formData.pan} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Reporting */}
    <div className="mb-4">
        <label htmlFor="reporting" className="block text-sm font-medium text-gray-700">Reporting</label>
        <select id="reporting" name="reporting" value={formData.reporting} onChange={handleChange} className="input w-full border border-black shadow-md">
            <option value="">Select Reporting</option>
            {/* Add options based on ReportingEnum */}
        </select>
    </div>
    
    {/* Expected Delivery Date */}
    <div className="mb-4">
        <label htmlFor="expected_delivery_date" className="block text-sm font-medium text-gray-700">Expected Delivery Date</label>
        <input type="date" id="expected_delivery_date" name="expected_delivery_date" value={formData.expected_delivery_date} onChange={handleChange} className="input w-full border border-black shadow-md" />
    </div>
    
    {/* Mode */}
    <div className="mb-4">
        <label htmlFor="mode" className="block text-sm font-medium text-gray-700">Mode</label>
        <select id="mode" name="mode" value={formData.mode} onChange={handleChange} className="input w-full border border-black shadow-md">
            <option value="">Select Mode</option>
            {/* Add options based on ModeEnum */}
        </select>
    </div>
    
    {/* Placed By */}
    <div className="mb-4">
        <label htmlFor="placed_by" className="block text-sm font-medium text-gray-700">Placed By</label>
        <select id="placed_by" name="placed_by" value={formData.placed_by} onChange={handleChange} className="input w-full border border-black shadow-md">
            <option value="">Select Placed By</option>
            <option value="BROKER">Broker</option>
            <option value="DIRECT">Direct</option>
        </select>
    </div>
</div>


                        <Tabs className="bg-[#FFFFFF] pt-2">
                            <TabList className="flex flex-wrap border-b border-gray-200">
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Total</Tab>
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Vehicle Details</Tab>
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Driver Profile</Tab>
                                <Tab className="bg-blue-300 py-2 px-4 cursor-pointer hover:bg-gray-100 w-full sm:w-auto">Broker Profile</Tab>
                               
                            </TabList>

                            {/* Total Tab Panel */}
                            <TabPanel>
    <div className="grid grid-cols-6 gap-6 p-2">
        {/* Total Base */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="total.base" className="block text-sm font-medium text-gray-700">Base</label>
            <input type="number" id="total.base" name="total.base" value={formData.total.base} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Total Guaranteed Weight */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="total.guaranteed_weight" className="block text-sm font-medium text-gray-700">Guaranteed Weight</label>
            <input type="number" id="total.guaranteed_weight" name="total.guaranteed_weight" value={formData.total.guaranteed_weight} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Total Kanta Weight */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="total.kanta_weight" className="block text-sm font-medium text-gray-700">Kanta Weight</label>
            <input type="number" id="total.kanta_weight" name="total.kanta_weight" value={formData.total.kanta_weight} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Total Slip No */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="total.slip_no" className="block text-sm font-medium text-gray-700">Slip No</label>
            <input type="text" id="total.slip_no" name="total.slip_no" value={formData.total.slip_no} onChange={handleTotalChange} className="input w-full border border-black shadow-md" />
        </div>
    </div>
</TabPanel>


                           {/*VehicleDetailsChange  */}
<TabPanel>
 
    <div className="grid grid-cols-6 gap-6 p-2">
        {/* Owner */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="vehicle_owner" className="block text-sm font-medium text-gray-700">Owner</label>
            <input type="text" id="vehicle_owner" name="vehicle_owner" value={formData.vehicle_owner} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Address */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="vehicle_address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="vehicle_address" name="vehicle_address" value={formData.vehicle_address} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* PAN */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="vehicle_pan" className="block text-sm font-medium text-gray-700">PAN</label>
            <input type="text" id="vehicle_pan" name="vehicle_pan" value={formData.vehicle_pan} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Mobile */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="vehicle_mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
            <input type="text" id="vehicle_mobile" name="vehicle_mobile" value={formData.vehicle_mobile} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Photo 1 */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="vehicle_photo1" className="block text-sm font-medium text-gray-700">Photo 1</label>
            <input type="file" id="vehicle_photo1" name="vehicle_photo1" value={formData.vehicle_photo1} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Photo 2 */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="vehicle_photo2" className="block text-sm font-medium text-gray-700">Photo 2</label>
            <input type="file" id="vehicle_photo2" name="vehicle_photo2" value={formData.vehicle_photo2} onChange={handleVehicleDetailsChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Remarks */}
        <div className="col-span-6">
            <label htmlFor="vehicle_remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea id="vehicle_remarks" name="vehicle_remarks" value={formData.vehicle_remarks} onChange={handleVehicleDetailsChange} rows="3" className="input w-full border border-black shadow-md" />
        </div>
    </div>
</TabPanel>

{/* Driver Profile Change */}
<TabPanel>
    <div className="grid grid-cols-6 gap-6 p-2">
        {/* Driver Name */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="driver_name" className="block text-sm font-medium text-gray-700">Driver Name</label>
            <input type="text" id="driver_name" name="driver_name" value={formData.driver_name} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Address */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="driver_address" className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" id="driver_address" name="driver_address" value={formData.driver_address} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Mobile */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="driver_mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
            <input type="text" id="driver_mobile" name="driver_mobile" value={formData.driver_mobile} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* License Number */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="driver_license_no" className="block text-sm font-medium text-gray-700">License Number</label>
            <input type="text" id="driver_license_no" name="driver_license_no" value={formData.driver_license_no} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Photo 1 */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="driver_photo1" className="block text-sm font-medium text-gray-700">Photo 1</label>
            <input type="file" id="driver_photo1" name="driver_photo1" value={formData.driver_photo1} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Photo 2 */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="driver_photo2" className="block text-sm font-medium text-gray-700">Photo 2</label>
            <input type="file" id="driver_photo2" name="driver_photo2" value={formData.driver_photo2} onChange={handleDriverProfileChange} className="input w-full border border-black shadow-md" />
        </div>
    </div>
</TabPanel>

{/* Broker Profile Change */}
<TabPanel>
    <div className="grid grid-cols-6 gap-6 p-2">
        {/* Mobile Number */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="broker_mobile_no" className="block text-sm font-medium text-gray-700">Mobile Number</label>
            <input type="text" id="broker_mobile_no" name="broker_mobile_no" value={formData.broker_mobile_no} onChange={handleBrokerProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Document Type */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="broker_document_type" className="block text-sm font-medium text-gray-700">Document Type</label>
            <input type="text" id="broker_document_type" name="broker_document_type" value={formData.broker_document_type} onChange={handleBrokerProfileChange} className="input w-full border border-black shadow-md" />
        </div>
        {/* Photo 1 */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="broker_photo1" className="block text-sm font-medium text-gray-700">Photo 1</label>
            <input type="file" id="broker_photo1" name="broker_photo1" value={formData.broker_photo1} onChange={handleBrokerProfileChange} className="input w-full border border-black shadow-md" />
        </div>
    </div>
</TabPanel>




                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    {/* PAN */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="itr.ITRNo" className="block text-sm font-medium text-gray-700">ITRNo</label>
                                        <input type="text" id="itr.ITRNo" name="itr.ITRNo" value={formData.itr.ITRNo} onChange={handleItrChange} className="input w-full border border-black shadow-md" />
                                    </div>

                                    {/* TAN No */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="itr.ITRAttachment" className="block text-sm font-medium text-gray-700">ITRAttachment</label>
                                        <input type="text" id="itr.ITRAttachment" name="itr.ITRAttachment" value={formData.itr.ITRAttachment} onChange={handleItrChange} className="input w-full border border-black shadow-md" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="itr.ITRSubmissionDate" className="block text-sm font-medium text-gray-700">ITRSubmissionDate</label>
                                        <input type="date" id="itr.ITRSubmissionDate" name="itr.ITRSubmissionDate" value={formData.itr.ITRSubmissionDate} onChange={handleItrChange} className="input w-full border border-black shadow-md" />
                                    </div>


                                    
                                

                                    <div className="col-span-6">
                                        <label htmlFor="itr.Remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="itr.Remarks" name="itr.Remarks" value={formData.itr.remarks} onChange={handleItrChange} rows="3" className="input w-full border border-black shadow-md" />
                                    </div>
                                </div>
                            </TabPanel>




                            <TabPanel>
                                <div className="grid grid-cols-6 gap-6 p-2">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.marketingPerson" className="block text-sm font-medium text-gray-700">marketingPerson</label>
                                        <input type="text" id="generalDetails.marketingPerson" name="generalDetails.marketingPerson" value={formData.generalDetails.marketingPerson} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>


                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.bankUploadPrefix" className="block text-sm font-medium text-gray-700">bankUploadPrefix</label>
                                        <input type="text" id="generalDetails.bankUploadPrefix" name="generalDetails.bankUploadPrefix" value={formData.generalDetails.bankUploadPrefix} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.partyStatus" className="block text-sm font-medium text-gray-700">partyStatus</label>
                                        <select id="generalDetails.partyStatus" name="generalDetails.partyStatus" value={formData.generalDetails.partyStatus} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
                                            <option value="">Select</option>
                                            <option value="blacklisted">blacklisted</option>
                                            <option value="stop payment">stop payment</option>
                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.paymentMethod" className="block text-sm font-medium text-gray-700">paymentMethod</label>
                                        <select id="generalDetails.paymentMethod" name="generalDetails.paymentMethod" value={formData.generalDetails.paymentMethod} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
                                            <option value="">Select</option>
                                            <option value="TO BB">TO BB</option>
                                            <option value="CASH">CASH</option>
                                            <option value="FOC">FOC</option>
                                            <option value="TO PAY">TO PAY</option>

                                        </select>
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.paymentTerms" className="block text-sm font-medium text-gray-700">Payment Terms</label>
                                        <input type="text" id="generalDetails.paymentTerms" name="generalDetails.paymentTerms" value={formData.generalDetails.paymentTerms} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.creditLimit" className="block text-sm font-medium text-gray-700">Credit Limit</label>
                                        <input type="text" id="generalDetails.creditLimit" name="generalDetails.creditLimit" value={formData.generalDetails.creditLimit} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.allocated" className="block text-sm font-medium text-gray-700">Allocated</label>
                                        <select id="generalDetails.allocated" name="generalDetails.allocated" value={formData.generalDetails.allocated} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
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
                                        <select id="generalDetails.deliveryPaymentMode" name="generalDetails.deliveryPaymentMode" value={formData.generalDetails.deliveryPaymentMode} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
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
                                        <select id="generalDetails.deliveryAt" name="generalDetails.deliveryAt" value={formData.generalDetails.deliveryAt} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
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
                                        <input type="text" id="generalDetails.outstandingAmt" name="generalDetails.outstandingAmt" value={formData.generalDetails.outstandingAmt} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.graceDays" className="block text-sm font-medium text-gray-700">Grace Days</label>
                                        <input type="number" id="generalDetails.graceDays" name="generalDetails.graceDays" value={formData.generalDetails.graceDays} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.lockDate" className="block text-sm font-medium text-gray-700">Lock Date</label>
                                        <input type="date" id="generalDetails.lockDate" name="generalDetails.lockDate" value={formData.generalDetails.lockDate} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.paymentBase" className="block text-sm font-medium text-gray-700">Payment Base</label>
                                        <select id="generalDetails.paymentBase" name="generalDetails.paymentBase" value={formData.generalDetails.paymentBase} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
                                            <option value="">Select</option>
                                            <option value="BOTH">BOTH</option>
                                            <option value="VEHICAL HIRE">VEHICAL HIRE</option>
                                            <option value="MANIFEST">MANIFEST</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.billFor" className="block text-sm font-medium text-gray-700">Bill For</label>
                                        <input type="text" id="generalDetails.billFor" name="generalDetails.billFor" value={formData.generalDetails.billFor} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.billAttachReport" className="block text-sm font-medium text-gray-700">Bill Attach Report</label>
                                        <input type="text" id="generalDetails.billAttachReport" name="generalDetails.billAttachReport" value={formData.generalDetails.billAttachReport} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.urlForTracking" className="block text-sm font-medium text-gray-700">URL For Tracking</label>
                                        <input type="text" id="generalDetails.urlForTracking" name="generalDetails.urlForTracking" value={formData.generalDetails.urlForTracking} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.consignmentAttachReport" className="block text-sm font-medium text-gray-700">Consignment Attach Report</label>
                                        <select id="generalDetails.consignmentAttachReport" name="generalDetails.consignmentAttachReport" value={formData.generalDetails.consignmentAttachReport} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md">
                                            <option value="">Select</option>
                                            <option value="PrintConsignment.rpt">PrintConsignment.rpt</option>
                                            <option value="PrintConsignmentDedicated.rpt">PrintConsignmentDedicated.rpt</option>
                                            <option value="PrintConsignmentLabel.rpt">PrintConsignmentLabel.rpt</option>
                                            <option value="PrintConsignment_VTPL.rpt">PrintConsignment_VTPL.rpt</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.introDate" className="block text-sm font-medium text-gray-700">Intro Date</label>
                                        <input type="date" id="generalDetails.introDate" name="generalDetails.introDate" value={formData.generalDetails.introDate} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3">
                                        <label htmlFor="generalDetails.closeDate" className="block text-sm font-medium text-gray-700">Close Date</label>
                                        <input type="date" id="generalDetails.closeDate" name="generalDetails.closeDate" value={formData.generalDetails.closeDate} onChange={handleGeneralDetailsChange} className="input w-full border border-black shadow-md" />
                                    </div>
                                    <div className="col-span-6">
                                        <label htmlFor="generalDetails.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
                                        <textarea id="generalDetails.remarks" name="generalDetails.remarks" value={formData.generalDetails.remarks} onChange={handleGeneralDetailsChange} rows="3" className="input w-full border border-black shadow-md" />
                                    </div>






                                </div>
                            </TabPanel>



                            <TabPanel>
    <div className="grid grid-cols-6 gap-6 p-2">
        {/* Bank Name */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.bankName" className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input type="text" id="bankDetails.bankName" name="bankDetails.bankName" value={formData.bankDetails.bankName} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* IFSC Code */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.ifscCode" className="block text-sm font-medium text-gray-700">IFSC Code</label>
            <input type="text" id="bankDetails.ifscCode" name="bankDetails.ifscCode" value={formData.bankDetails.ifscCode} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* Mobile */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.mobile" className="block text-sm font-medium text-gray-700">Mobile</label>
            <input type="text" id="bankDetails.mobile" name="bankDetails.mobile" value={formData.bankDetails.mobile} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* Email */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.email" className="block text-sm font-medium text-gray-700">Email</label>
            <input type="text" id="bankDetails.email" name="bankDetails.email" value={formData.bankDetails.email} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* Branch Name */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.branchName" className="block text-sm font-medium text-gray-700">Branch Name</label>
            <input type="text" id="bankDetails.branchName" name="bankDetails.branchName" value={formData.bankDetails.branchName} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* Bank A/C No. */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.bankAccountNo" className="block text-sm font-medium text-gray-700">Bank A/C No.</label>
            <input type="text" id="bankDetails.bankAccountNo" name="bankDetails.bankAccountNo" value={formData.bankDetails.bankAccountNo} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* Beneficiary Name */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.beneficiaryName" className="block text-sm font-medium text-gray-700">Beneficiary Name</label>
            <input type="text" id="bankDetails.beneficiaryName" name="bankDetails.beneficiaryName" value={formData.bankDetails.beneficiaryName} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md" />
        </div>

        {/* Cancelled Cheque or PassBook Remarks */}
        <div className="col-span-6 sm:col-span-3">
            <label htmlFor="bankDetails.cancelledChequeOrPassbook" className="block text-sm font-medium text-gray-700">Cancelled Cheque or PassBook </label>
            <input type="text" id="bankDetails.cancelledChequeOrPassbook" name="bankDetails.cancelledChequeOrPassbook" value={formData.bankDetails.cancelledChequeOrPassbook} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md"/>
        </div>

        {/* Remarks */}
        <div className="col-span-6">
            <label htmlFor="bankDetails.remarks" className="block text-sm font-medium text-gray-700">Remarks</label>
            <textarea id="bankDetails.remarks" name="bankDetails.remarks" value={formData.bankDetails.remarks} onChange={handleBankDetailsChange} className="input w-full border border-black shadow-md"></textarea>
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

export default VehicleHire;




// import React from 'react'

// function VehicleHire() {
//   return (
//     <div>
//       vehicle hire
//     </div>
//   )
// }

// export default VehicleHire
