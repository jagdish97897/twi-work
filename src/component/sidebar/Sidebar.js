import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../navbar/Navbar'
import { GiDividedSquare } from "react-icons/gi";
import { FaRegCircle } from "react-icons/fa";
function Sidebar() {
    const [isOpenParties, setIsOpenParties] = useState(false); // State to track whether the Home dropdown is open
    const [isOpenTaxes, setIsOpenTaxes] = useState(false); // State to track whether the History dropdown is open
    const [isOpenOrderManagement, setIsOpenOrderManagement] = useState(false); // State to track whether the Order Management dropdown is open
    const [isOpenBookingoperation, setIsOpenBookingoperation] = useState(false); // State to track whether the Order Management dropdown is open
    const [isOpenDeliveryoperation, setIsOpenDeliveryoperation] = useState(false); // State to track whether the Order Management dropdown is open
    const [isOpenReports, setIsOpenReports] = useState(false); // State to track whether the Order Management dropdown is open
  
    const toggleDropdownContract = () => {
      setIsOpenParties(!isOpenParties); 
      setIsOpenTaxes(false);
      setIsOpenDeliveryoperation(false);
      setIsOpenReports(false);
      setIsOpenBookingoperation(false);
      setIsOpenOrderManagement(false);
    };
  
    const toggleDropdownManageDocument = () => {
      setIsOpenTaxes(!isOpenTaxes); 
      setIsOpenParties(false);
      setIsOpenBookingoperation(false);
      setIsOpenReports(false);
      setIsOpenDeliveryoperation(false);
      setIsOpenOrderManagement(false);
    };
  
    const toggleDropdownOrderManagement = () => {
      setIsOpenOrderManagement(!isOpenOrderManagement);
      setIsOpenParties(false);
      setIsOpenBookingoperation(false);
      setIsOpenReports(false);
      setIsOpenDeliveryoperation(false);
      setIsOpenTaxes(false);
    };
    const toggleDropdownBookingoperation = () => {
      setIsOpenBookingoperation(!isOpenBookingoperation); 
      setIsOpenParties(false);
      setIsOpenOrderManagement(false);
      setIsOpenReports(false);
      setIsOpenDeliveryoperation(false);
      setIsOpenTaxes(false);
    };
    const toggleDropdownDeliveryoperation = () => {
      setIsOpenDeliveryoperation(!isOpenDeliveryoperation); 
      setIsOpenParties(false);
      setIsOpenOrderManagement(false);
      setIsOpenReports(false);
      setIsOpenBookingoperation(false);
      setIsOpenTaxes(false);
    };
  
    const toggleDropdownReports= () => {
      setIsOpenReports(!isOpenReports); 
      setIsOpenParties(false);
      setIsOpenOrderManagement(false);
      setIsOpenBookingoperation(false);
      setIsOpenTaxes(false);
      setIsOpenDeliveryoperation(false);
    };

  return (
<>
<Navbar /> 

<div className="flex  h-screen bg-red-400">
        <div className="flex-shrink-0 w-64 bg-gradient-to-b from-gray-500 to-gray-900">
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-grow overflow-y-auto">
              <ul className="flex flex-col py-4">
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownContract}>
                    <GiDividedSquare/>
                    <span className="ml-2">Parties</span>
                  </div>
                  {/* Render the Home dropdown content if isOpenHome is true */}
                  {isOpenParties && (
                    <div className="ml-6">
                      <Link to="/protected/component/sidebar/Sidebar/parties/party" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Party</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/parties/supplychainpartner" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Supply Chain Partner</span>
                      </Link>
                

                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownManageDocument}>
                    <GiDividedSquare/>
                    <span className="ml-2">Taxes</span>
                  </div>
                  {isOpenTaxes && (
                    <div className="ml-6">
                      <Link to="/protected/component/sidebar/Sidebar/taxes/gst" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">GST</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/taxes/tds" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">TDS Master</span>
                      </Link>
                      {/* Add more History sublinks as needed */}
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownOrderManagement}>
                    <GiDividedSquare/>
                    <span className="ml-2">General Master</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenOrderManagement && (
                    <div className="ml-6">
                      <Link to="/protected/component/sidebar/Sidebar/generalmaster/route" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Route</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/generalmaster/station" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Station</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/generalmaster/loadtype" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Load Type</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/generalmaster/vehiclemodel" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Vehicle Model</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/generalmaster/vehicle" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Vehical</span>
                      </Link>
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownBookingoperation}>
                    <GiDividedSquare/>
                    <span className="ml-2">Warehouse</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenBookingoperation && (
                    <div className="ml-6">
                      <Link to="/protected/component/sidebar/Sidebar/warehouse/comoditygroup" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Comodity Group</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/warehouse/content" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Content</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/warehouse/checklist" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Check List</span>
                      </Link>
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownDeliveryoperation}>
                   <GiDividedSquare/>
                    <span className="ml-2">Miscellaneous</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenDeliveryoperation && (
                    <div className="ml-6">
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/country" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Country</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/state" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">State</span>
                      </Link>  
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/city" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">City</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/area" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Area</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/zone" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Zone</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/department" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Department</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/ratezone" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Rate Zone</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/currency" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Currency</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/zipcode" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Zip code</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/miscellaneous/unit" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Unit</span>
                      </Link>
                   
                    </div>
                  )}
                </li>
                
                <li className="px-4">
                  <div className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer" onClick={toggleDropdownReports}>
                    <GiDividedSquare/>
                    <span className="ml-2">List Reports</span>
                  </div>
                  {/* Render the Order Management dropdown content if isOpenOrderManagement is true */}
                  {isOpenReports && (
                    <div className="ml-6">
                      <Link to="/protected/component/sidebar/Sidebar/listreports/partyreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Party report</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/listreports/branchreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Branch report</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/listreports/stationreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                        <FaRegCircle/>
                        <span className="ml-2">Station report</span>
                      </Link>
                
                      <Link to="/protected/component/sidebar/Sidebar/listreports/godownreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Godown report</span>
                      </Link>

                      <Link to="/protected/component/sidebar/Sidebar/listreports/contentreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Content report</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/listreports/vehiclereport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Vehicle report</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/listreports/driverreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Driver report</span>
                      </Link>
                      <Link to="/protected/component/sidebar/Sidebar/listreports/brokerreport" className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer">
                      <FaRegCircle/>
                        <span className="ml-2">Broker report</span>
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
  )
}

export default Sidebar
