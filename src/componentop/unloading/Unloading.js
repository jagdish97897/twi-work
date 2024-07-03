
import React from 'react'

function Unloading() {
  return (
    <div>
      unloading
    </div>
  )
}
export default Unloading

// import React, { useState } from "react";
// import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
// import "react-tabs/style/react-tabs.css";

// const Unloading = () => {
//   const [formData, setFormData] = useState({
//     type: "",
//     code: "",
//     lastCode: "",
//     name: "",
//     printAs: "",
//     group: "",
//     expenseType: "",
//     subType: "",
//     controllingBranch: "",
//     parentAccount: "",
//     contact: {
//       Address: "",
//       City: "",
//       PIN: "",
//       State: "",
//       Country: "",
//       Person: "",
//       Landline: "",
//       Designation: "",
//       Mobile: "",
//       Email: "",
//       Fax: "",
//       Remarks: "",
//     },
//     correctAddress: {
//       Address: "",
//       PIN: "",
//       City: "",
//       State: "",
//       Country: "",
//       Remarks: "",
//     },
//     gst: {
//       registrationType: "",
//       servicesType: "",
//       defaultGST: "",
//       GSTIN: "",
//       Remarks: "",
//     },
//     tds: {
//       // Initialize the 'tds' object here
//       PAN: "", // Initialize properties within 'tds'
//       TANNo: "",
//       declarationFor: "",
//       tdsStatus: "",
//       tdsCode: "",
//       natureOfPayment: "",
//       tdsSection: "",
//       exemptionCertNo: "",
//       exemptionLimit: "",
//       validUpto: "",
//       PANImage: "",
//       imageOfDeclaration: "",
//       remarks: "",
//     },
//     itr: {
//       ITRNo: "",
//       ITRSubmissionDate: "",
//       ITRAttachment: "",
//       Remarks: "",
//     },
//     generalDetails: {
//       marketingPerson: "",
//       bankUploadPrefix: "",
//       partyStatus: "",
//       reason: "",
//       paymentMethod: "",
//       paymentTerms: "",
//       creditLimit: "",
//       allocated: "",
//       deliveryPaymentMode: "",
//       deliveryAt: "",
//       outstandingAmt: "",
//       graceDays: "",
//       lockDate: "",
//       paymentBase: "",
//       billFor: "",
//       billAttachReport: "",
//       urlForTracking: "",
//       consignmentAttachReport: "",
//       introDate: "",
//       closeDate: "",
//       remarks: "",
//     },
//     bankDetails: {
//       bankName: "",
//       ifscCode: "",
//       mobile: "",
//       email: "",
//       branchName: "",
//       bankAccountNo: "",
//       beneficiaryName: "",
//       cancelledChequeOrPassbook: "",
//       remarks: "",
//     },
//   });

//   const [submitted, setSubmitted] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name.includes(".")) {
//       const [fieldName, nestedFieldName] = name.split(".");
//       setFormData({
//         ...formData,
//         [fieldName]: {
//           ...formData[fieldName],
//           [nestedFieldName]: value,
//         },
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   // Corrected handleChange for nested address fields
//   const handleContactChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };

//   // Similarly for correctAddress
//   const handleCorrectAddressChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };

//   // Similarly for correctAddress
//   const handleGstChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };
//   const handleTdsChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };

//   const handleItrChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };
//   const handleGeneralDetailsChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };
//   const handleBankDetailsChange = (e) => {
//     const { name, value } = e.target;
//     const [parentField, fieldName] = name.split(".");
//     setFormData({
//       ...formData,
//       [parentField]: {
//         ...formData[parentField],
//         [fieldName]: value,
//       },
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch(
//         "http://localhost:5000/partiesregistrations",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to create registration");
//       }

//       const data = await response.json();
//       console.log("Registration created:", data);
//       setSubmitted(true); // Set submitted to true after successful submission
//       // Add any further actions you want to take after successful submission
//     } catch (error) {
//       console.error("Error creating registration:", error.message);
//       // Handle error state or display error message to user
//     }
//   };

//   const copyDataToCorrectAddress = () => {
//     // Copy data from contact to correctAddress
//     setFormData((prevState) => ({
//       ...prevState,
//       correctAddress: { ...prevState.contact },
//     }));
//   };

//   return (
//     <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
//       {!submitted ? ( // Render form only if not submitted
//         <>
//           <h1 className="text-3xl font-bold mb-4">Unloading</h1>

//           <form onSubmit={handleSubmit}>
//             <div className="mt-6 mb-4">
//               <button
//                 type="submit"
//                 className="w-small flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 submit
//               </button>
//             </div>
//             <div className="space-y-4 bg-[#FFFFFF] p-2  sm:flex sm:flex-wrap gap-2">
//               <div className="mb-4">
//                 <label
//                   htmlFor="documentType"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Document Type
//                 </label>
//                 <input
//                   type="text"
//                   id="documentType"
//                   name="documentType"
//                   value={formData.documentType}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="type"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Type
//                 </label>
//                 <select
//   id="type"
//   name="type"
//   value={formData.type}
//   onChange={handleChange}
//   className="input w-full border border-black shadow-md"
// >
//   <option value="">Select Type</option>
//   <option value="DOMESTIC">DOMESTIC</option>
//   <option value="CARGO">CARGO</option>
//   <option value="CUSTOMS CLEARING SERVICES">CUSTOMS CLEARING SERVICES</option>
//   <option value="DANGEROUS CARGO">DANGEROUS CARGO</option>
//   <option value="DOCUMENT">DOCUMENT</option>
//   <option value="DOCUMENT DAY DEFINITE DELIVERY">DOCUMENT DAY DEFINITE DELIVERY</option>
//   <option value="DOMISTIC AIRFREIGHT">DOMISTIC AIRFREIGHT</option>
//   <option value="DOMESTIC BOX">DOMESTIC BOX</option>
//   <option value="DOMESTIC DOCUMENT BY AIR">DOMESTIC DOCUMENT BY AIR</option>
//   <option value="DOMESTIC PARCEL BY EXPRESS">DOMESTIC PARCEL BY EXPRESS</option>
//   <option value="DOMESTIC PARCEL BY TRAIN">DOMESTIC PARCEL BY TRAIN</option>
//   <option value="DOMESTIC PARCEL BY TRUCK">DOMESTIC PARCEL BY TRUCK</option>
//   <option value="ECO">ECO</option>
//   <option value="E-COMMERCE">E-COMMERCE</option>
//   <option value="EXPRESS IMPORT">EXPRESS IMPORT</option>
//   <option value="FTL">FTL</option>
//   <option value="GLOBAL MAILING SERVICES">GLOBAL MAILING SERVICES</option>
//   <option value="HGMV">HGMV</option>
//   <option value="INDUSTRIAL PROJECT TRANSPORTATION">INDUSTRIAL PROJECT TRANSPORTATION</option>
//   <option value="INTERCONTINENTAL DIRECT">INTERCONTINENTAL DIRECT</option>
//   <option value="INTERNATIONAL">INTERNATIONAL</option>
//   <option value="INTERNATIONAL BOX">INTERNATIONAL BOX</option>
//   <option value="INTERNATIONAL DOCUMENT EXPRESS">INTERNATIONAL DOCUMENT EXPRESS</option>
//   <option value="INTERNATIONAL OCEAN FREIGHT">INTERNATIONAL OCEAN FREIGHT</option>
//   <option value="INTERNATIONAL PARCEL">INTERNATIONAL PARCEL</option>
//   <option value="INTERNATIONAL PARCELS EXPRESS">INTERNATIONAL PARCELS EXPRESS</option>
//   <option value="OTHER">OTHER</option>
//   <option value="OWN">OWN</option>
//   <option value="PARCEL">PARCEL</option>
//   <option value="PO">PO</option>
//   <option value="SAARC SURFACE">SAARC SURFACE</option>
//   <option value="SO">SO</option>
//   <option value="TEMPERATURE CONTROLLED CARGO">TEMPERATURE CONTROLLED CARGO</option>
//   <option value="TRADE FAIRES AND EVENTS">TRADE FAIRES AND EVENTS</option>
//   <option value="TRADE FAIRS AND EVENTS">TRADE FAIRS AND EVENTS</option>
// </select>

//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="unloadingNo"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Unloading No
//                 </label>
//                 <input
//                   type="text"
//                   id="unloadingNo"
//                   name="unloadingNo"
//                   value={formData.unloadingNo}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="date"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Date
//                 </label>
//                 <input
//                   type="date"
//                   id="date"
//                   name="date"
//                   value={formData.date}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="vehiclePlacementNo"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Vehicle Placement No
//                 </label>
//                 <input
//                   type="text"
//                   id="vehiclePlacementNo"
//                   name="vehiclePlacementNo"
//                   value={formData.vehiclePlacementNo}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="loadType"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Load Type
//                 </label>
//                 <input
//                   type="text"
//                   id="loadType"
//                   name="loadType"
//                   value={formData.loadType}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="loadingFactoryOEMLeftDate"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Loading Factory OEM Left Date
//                 </label>
//                 <input
//                   type="date"
//                   id="loadingFactoryOEMLeftDate"
//                   name="loadingFactoryOEMLeftDate"
//                   value={formData.loadingFactoryOEMLeftDate}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="againstNum"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Against Number
//                 </label>
//                 <input
//                   type="text"
//                   id="againstNum"
//                   name="againstNum"
//                   value={formData.againstNum}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="reportingDate"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Reporting Date
//                 </label>
//                 <input
//                   type="date"
//                   id="reportingDate"
//                   name="reportingDate"
//                   value={formData.reportingDate}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="uploadedBy"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Uploaded By
//                 </label>
//                 <input
//                   type="text"
//                   id="uploadedBy"
//                   name="uploadedBy"
//                   value={formData.uploadedBy}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="source"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Source
//                 </label>
//                 <input
//                   type="text"
//                   id="source"
//                   name="source"
//                   value={formData.source}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="deliverAt"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Deliver At
//                 </label>
//                 <select
//                   id="deliverAt"
//                   name="deliverAt"
//                   value={formData.deliverAt}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 >
//                   <option value="">Select Deliver At</option>
//                   <option value="DIRECT">DIRECT</option>
//                   <option value="DOOR">DOOR</option>
//                   <option value="DOOR TO DOOR">DOOR TO DOOR</option>
//                   {/* Add more options as needed */}
//                 </select>
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="godown"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Godown
//                 </label>
//                 <input
//                   type="text"
//                   id="godown"
//                   name="godown"
//                   value={formData.godown}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="rffNo"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   RFF No
//                 </label>
//                 <input
//                   type="text"
//                   id="rffNo"
//                   name="rffNo"
//                   value={formData.rffNo}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="refDate"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Ref Date
//                 </label>
//                 <input
//                   type="date"
//                   id="refDate"
//                   name="refDate"
//                   value={formData.refDate}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="transporter"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Transporter
//                 </label>
//                 <input
//                   type="text"
//                   id="transporter"
//                   name="transporter"
//                   value={formData.transporter}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="driver"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Driver
//                 </label>
//                 <input
//                   type="text"
//                   id="driver"
//                   name="driver"
//                   value={formData.driver}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>

//               <div className="mb-4">
//                 <label
//                   htmlFor="vehicleNo"
//                   className="block text-sm font-medium text-gray-700"
//                 >
//                   Vehicle No
//                 </label>
//                 <input
//                   type="text"
//                   id="vehicleNo"
//                   name="vehicleNo"
//                   value={formData.vehicleNo}
//                   onChange={handleChange}
//                   className="input w-full border border-black shadow-md"
//                 />
//               </div>
//             </div>

//             {/* Submit button */}
//           </form>
//         </>
//       ) : (
//         <div className="text-center">
//           <h1 className="text-3xl font-bold mb-4">
//             Registration submitted successfully!
//           </h1>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Unloading;


// import React from 'react'

// function Unloading() {
//   return (
//     <div>
//       unloading
//     </div>
//   )
// }
// export default Unloading
