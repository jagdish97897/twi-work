

import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { GiDividedSquare } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa";
import Navbarop from '../navbar/Navbarop';

function Sidebarop() {
  const [isOpenContract, setIsOpenContract] = useState(false); // State to track whether the Home dropdown is open
  const [isOpenManageDocument, setIsOpenManageDocument] = useState(false); // State to track whether the History dropdown is open
  const [isOpenOrderManagement, setIsOpenOrderManagement] = useState(false); // State to track whether the Order Management dropdown is open
  const [isOpenBookingoperation, setIsOpenBookingoperation] = useState(false); // State to track whether the Order Management dropdown is open
  const [isOpenDeliveryoperation, setIsOpenDeliveryoperation] = useState(false); // State to track whether the Order Management dropdown is open
  const [isOpenEnquiry, setIsOpenEnquiry] = useState(false); // State to track whether the Order Management dropdown is open
  const [isOpenReports, setIsOpenReports] = useState(false); // State to track whether the Order Management dropdown is open

  const toggleDropdownContract = () => {
    setIsOpenContract(!isOpenContract); // Toggle the Home dropdown state
    // Close the History and Order Management dropdowns when Home dropdown is toggled
    setIsOpenManageDocument(false);
    setIsOpenDeliveryoperation(false);
    setIsOpenReports(false);
    setIsOpenEnquiry(false);
    setIsOpenBookingoperation(false);
    setIsOpenOrderManagement(false);
  };

  const toggleDropdownManageDocument = () => {
    setIsOpenManageDocument(!isOpenManageDocument); // Toggle the History dropdown state
    // Close the Home and Order Management dropdowns when History dropdown is toggled
    setIsOpenContract(false);
    setIsOpenBookingoperation(false);
    setIsOpenEnquiry(false);
    setIsOpenReports(false);
    setIsOpenDeliveryoperation(false);
    setIsOpenOrderManagement(false);
  };

  const toggleDropdownOrderManagement = () => {
    setIsOpenOrderManagement(!isOpenOrderManagement); // Toggle the Order Management dropdown state
    // Close the Home and History dropdowns when Order Management dropdown is toggled
    setIsOpenContract(false);
    setIsOpenBookingoperation(false);
    setIsOpenEnquiry(false);
    setIsOpenReports(false);
    setIsOpenDeliveryoperation(false);
    setIsOpenManageDocument(false);
  };
  const toggleDropdownBookingoperation = () => {
    setIsOpenBookingoperation(!isOpenBookingoperation); // Toggle the Order Management dropdown state
    // Close the Home and History dropdowns when Order Management dropdown is toggled
    setIsOpenContract(false);
    setIsOpenOrderManagement(false);
    setIsOpenEnquiry(false);
    setIsOpenReports(false);
    setIsOpenDeliveryoperation(false);
    setIsOpenManageDocument(false);
  };
  const toggleDropdownDeliveryoperation = () => {
    setIsOpenDeliveryoperation(!isOpenDeliveryoperation); // Toggle the Order Management dropdown state
    // Close the Home and History dropdowns when Order Management dropdown is toggled
    setIsOpenContract(false);
    setIsOpenOrderManagement(false);
    setIsOpenEnquiry(false);
    setIsOpenReports(false);
    setIsOpenBookingoperation(false);
    setIsOpenManageDocument(false);
  };
  const toggleDropdownEnquiry= () => {
    setIsOpenEnquiry(!isOpenEnquiry); // Toggle the Order Management dropdown state
    // Close the Home and History dropdowns when Order Management dropdown is toggled
    setIsOpenContract(false);
    setIsOpenReports(false);
    setIsOpenOrderManagement(false);
    setIsOpenBookingoperation(false);
    setIsOpenManageDocument(false);
    setIsOpenDeliveryoperation(false);
  };
  const toggleDropdownReports= () => {
    setIsOpenReports(!isOpenReports); // Toggle the Order Management dropdown state
    // Close the Home and History dropdowns when Order Management dropdown is toggled
    setIsOpenContract(false);
    setIsOpenEnquiry(false);
    setIsOpenOrderManagement(false);
    setIsOpenBookingoperation(false);
    setIsOpenManageDocument(false);
    setIsOpenDeliveryoperation(false);
  };
  return (
    <>
      <Navbarop /> {/* Add the Nav component here */}
      <div className="flex  h-screen bg-red-400">
        <div className="flex-shrink-0 w-64 bg-gradient-to-b from-gray-500 to-gray-900">
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-grow overflow-y-auto">
              <ul className="flex flex-col py-4">
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownContract}>
                    <GiDividedSquare/>
                    <span className="ml-2">Contract</span>
                  </div>
                  {/* Render the Home dropdown content if isOpenHome is true */}
                  {isOpenContract && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/contract/rateslab" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Rate Slab</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/contract/freightrate" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Freight Rate</span>
                      </Link>
                      {/* Add more Home sublinks as needed */}
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownManageDocument}>
                    <GiDividedSquare/>
                    <span className="ml-2">Manage Document</span>
                  </div>
                  {/* Render the History dropdown content if isOpenHistory is true */}
                  {isOpenManageDocument && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/managedocument/documentissue" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Document Issue</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/managedocument/documentcancel" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Document Cancel</span>
                      </Link>
                      {/* Add more History sublinks as needed */}
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownOrderManagement}>
                    <GiDividedSquare/>
                    <span className="ml-2">Order Management</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenOrderManagement && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/ordermanagement/indent" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Indent</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/ordermanagement/joborder" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Job order</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/ordermanagement/vahicleplacement" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Vahicle placement</span>
                      </Link>
                     
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownBookingoperation}>
                    <GiDividedSquare/>
                    <span className="ml-2">Booking Operation</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenBookingoperation && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/bookingoperation/consignment" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Consignment</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/bookingoperation/vehiclehire" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Vehicle hire</span>
                      </Link>
                      {/* Add more Order Management sublinks as needed */}
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownDeliveryoperation}>
                   <GiDividedSquare/>
                    <span className="ml-2">Delivery operation</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenDeliveryoperation && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/deliveryoperation/unloading" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Unloading</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/deliveryoperation/pod" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">POD</span>
                      </Link>
                   

                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownEnquiry}>
                    <GiDividedSquare/>
                    <span className="ml-2">Enquiry</span>
                  </div>

                  {isOpenEnquiry && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/enquiry/byconsignment" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">By consignment</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/enquiry/multiple" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Multiple</span>
                      </Link>
                   
                      <Link to="/protected/componentop/sidebarop/Sidebarop/enquiry/bill" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Bill</span>
                      </Link>
                   
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownReports}>
                    <GiDividedSquare/>
                    <span className="ml-2">Reports</span>
                  </div>
                  {isOpenReports && (
                    <div className="ml-6">
                      <Link to="/protected/componentop/sidebarop/Sidebarop/reports/registerreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Registers report</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/reports/analysisreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Analysis report</span>
                      </Link>
                   
                      <Link to="/protected/componentop/sidebarop/Sidebarop/reports/stockreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Stock report</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/reports/misreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">MIS report</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/reports/pendingreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Pending Report</span>
                      </Link>
                      <Link to="/protected/componentop/sidebarop/Sidebarop/reports/costingreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Costing report</span>
                      </Link>
                   
                    </div>
                  )}
                </li>

              </ul>
            </div>
          </div>
        </div>
        <div className="flex-grow bg-gray-200">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Sidebarop;



// import React from 'react'

// function Sidebarop() {
//   return (
//     <div>
//       hgghhgh
//     </div>
//   )
// }

// export default Sidebarop
