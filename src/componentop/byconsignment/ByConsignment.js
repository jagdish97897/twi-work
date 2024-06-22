import React from 'react';

const EnquiryForm = () => {
    return (
        <div className="container mx-auto px-4 py-8 h-screen overflow-y-auto">
            <h1 className="text-center text-2xl mb-6">Enquiry By Consignment</h1>
            <div className="grid grid-cols-3 gap-6">
                <div className="mb-6 col-span-3">
                    <label htmlFor="cnmtNo" className="block mb-2">Cnmt No</label>
                    <input type="text" id="cnmtNo" name="cnmtNo" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="consignmentNo" className="block mb-2">Consignment No.</label>
                    <input type="text" id="consignmentNo" name="consignmentNo" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="date" className="block mb-2">Date</label>
                    <input type="text" id="date" name="date" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="invoiceNo" className="block mb-2">Invoice No.</label>
                    <input type="text" id="invoiceNo" name="invoiceNo" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="invoiceDate" className="block mb-2">Invoice Date</label>
                    <input type="text" id="invoiceDate" name="invoiceDate" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="ewayBillNo" className="block mb-2">eWay Bill No.</label>
                    <input type="text" id="ewayBillNo" name="ewayBillNo" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="source" className="block mb-2">Source</label>
                    <input type="text" id="source" name="source" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="destination" className="block mb-2">Destination</label>
                    <input type="text" id="destination" name="destination" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="ewayBillDate" className="block mb-2">eWay Bill Date</label>
                    <input type="text" id="ewayBillDate" name="ewayBillDate" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="ewayBillExpiry" className="block mb-2">eWay Bill Expiry</label>
                    <input type="text" id="ewayBillExpiry" name="ewayBillExpiry" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="deliveryType" className="block mb-2">Delivery Type</label>
                    <input type="text" id="deliveryType" name="deliveryType" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="consignor" className="block mb-2">Consignor</label>
                    <input type="text" id="consignor" name="consignor" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="mobileNoConsignor" className="block mb-2">Mobile No.</label>
                    <input type="text" id="mobileNoConsignor" name="mobileNoConsignor" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="serviceMode" className="block mb-2">Service Mode</label>
                    <input type="text" id="serviceMode" name="serviceMode" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="consignee" className="block mb-2">Consignee</label>
                    <input type="text" id="consignee" name="consignee" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="mobileNoConsignee" className="block mb-2">Mobile No.</label>
                    <input type="text" id="mobileNoConsignee" name="mobileNoConsignee" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="serviceType" className="block mb-2">Service Type</label>
                    <input type="text" id="serviceType" name="serviceType" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="billingParty" className="block mb-2">Billing Party</label>
                    <input type="text" id="billingParty" name="billingParty" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="vehicle" className="block mb-2">Vehicle</label>
                    <input type="text" id="vehicle" name="vehicle" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="paid" className="block mb-2">Paid</label>
                    <input type="text" id="paid" name="paid" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="netFreight" className="block mb-2">Net Freight</label>
                    <input type="text" id="netFreight" name="netFreight" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="netReceivable" className="block mb-2">Net Receivable</label>
                    <input type="text" id="netReceivable" name="netReceivable" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="markNo" className="block mb-2">Mark No.</label>
                    <input type="text" id="markNo" name="markNo" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="totalPkgs" className="block mb-2">Total Pkgs.</label>
                    <input type="text" id="totalPkgs" name="totalPkgs" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="totalActualWeight" className="block mb-2">Total Actual Weight</label>
                    <input type="text" id="totalActualWeight" name="totalActualWeight" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="totalChargedWeight" className="block mb-2">Total Charged Weight</label>
                    <input type="text" id="totalChargedWeight" name="totalChargedWeight" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="addUserId" className="block mb-2">Add User Id</label>
                    <input type="text" id="addUserId" name="addUserId" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="paymentTerm" className="block mb-2">Payment Term</label>
                    <input type="text" id="paymentTerm" name="paymentTerm" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="at" className="block mb-2">At</label>
                    <input type="text" id="at" name="at" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="contents" className="block mb-2">Contents</label>
                    <input type="text" id="contents" name="contents" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="reason" className="block mb-2">Reason</label>
                    <input type="text" id="reason" name="reason" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6 col-span-3">
                    <label htmlFor="docAttached" className="block mb-2">Doc Attached</label>
                    <input type="text" id="docAttached" name="docAttached" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="dateAttached" className="block mb-2">Date</label>
                    <input type="text" id="dateAttached" name="dateAttached" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <label htmlFor="timeAttached" className="block mb-2">Time</label>
                    <input type="text" id="timeAttached" name="timeAttached" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6 col-span-3">
                    <label htmlFor="connectFrom" className="block mb-2">Connect From</label>
                    <input type="text" id="connectFrom" name="connectFrom" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <input type="checkbox" id="hold" name="hold" className="mr-2" readOnly />
                    <label htmlFor="hold" className="mb-2">Hold</label>
                </div>
                <div className="mb-6 col-span-2">
                    <label htmlFor="holdType" className="block mb-2">Hold Type</label>
                    <input type="text" id="holdType" name="holdType" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="mb-6">
                    <input type="checkbox" id="consigneeCopyAttached" name="consigneeCopyAttached" className="mr-2" readOnly />
                    <label htmlFor="consigneeCopyAttached" className="mb-2">Consignee Copy Attached</label>
                </div>
            </div>
            <hr className="my-8" />
            <div className="grid grid-cols-4 gap-6 bg-blue-100 p-6">
                <div className="col-span-4 grid grid-cols-5 gap-6 mb-6">
                    <div className="col-span-1">
                        <label htmlFor="vendor" className="block mb-2">Vendor</label>
                        <input type="text" id="vendor" name="vendor" className="w-full p-2 border border-gray-300 rounded" readOnly />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="docketNumber" className="block mb-2">Docket Number</label>
                        <input type="text" id="docketNumber" name="docketNumber" className="w-full p-2 border border-gray-300 rounded" readOnly />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="docketDate" className="block mb-2">Docket Date</label>
                        <input type="text" id="docketDate" name="docketDate" className="w-full p-2 border border-gray-300 rounded" readOnly />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="codProcess" className="block mb-2">COD Process</label>
                        <input type="text" id="codProcess" name="codProcess" className="w-full p-2 border border-gray-300 rounded" readOnly />
                    </div>
                    <div className="col-span-1">
                        <label htmlFor="codAmount" className="block mb-2">COD Amount</label>
                        <input type="text" id="codAmount" name="codAmount" className="w-full p-2 border border-gray-300 rounded" readOnly />
                    </div>
                </div>
                <div className="col-span-2">
                    <label htmlFor="status" className="block mb-2">Status</label>
                    <input type="text" id="status" name="status" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-2">
                    <label htmlFor="expectedDelivery" className="block mb-2">Expected Delivery</label>
                    <input type="text" id="expectedDelivery" name="expectedDelivery" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-1">
                    <label htmlFor="delay" className="block mb-2">Delay</label>
                    <input type="text" id="delay" name="delay" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-1 flex items-center">
                    <input type="checkbox" id="pod" name="pod" className="mr-2" readOnly />
                    <label htmlFor="pod" className="mb-2">POD</label>
                </div>
                <div className="col-span-4">
                    <label htmlFor="gpsLocation" className="block mb-2">GPS Location</label>
                    <input type="text" id="gpsLocation" name="gpsLocation" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-1">
                    <label htmlFor="bill" className="block mb-2">Bill</label>
                    <input type="text" id="bill" name="bill" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-1">
                    <label htmlFor="currentStatus" className="block mb-2">Current Status</label>
                    <input type="text" id="currentStatus" name="currentStatus" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-1">
                    <label htmlFor="speed" className="block mb-2">Speed</label>
                    <input type="text" id="speed" name="speed" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-1">
                    <label htmlFor="consignmentRemarksStatus" className="block mb-2">Consignment Remarks Status</label>
                    <input type="text" id="consignmentRemarksStatus" name="consignmentRemarksStatus" className="w-full p-2 border border-gray-300 rounded" readOnly />
                </div>
                <div className="col-span-4">
                    <label htmlFor="remarks" className="block mb-2">Remarks</label>
                    <textarea id="remarks" name="remarks" className="w-full p-2 border border-gray-300 rounded h-24" readOnly></textarea>
                </div>
            </div>
        </div>
    );
};

export default EnquiryForm;

