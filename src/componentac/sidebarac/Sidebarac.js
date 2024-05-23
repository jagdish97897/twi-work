
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { GiDividedSquare } from 'react-icons/gi';
import { FaRegCircle } from 'react-icons/fa';
import Navbarac from '../navbar/Navbarac';

function Sidebarac() {
  const [isOpenMaster, setIsOpenMaster] = useState(false);
  const [isOpenVoucher, setIsOpenVoucher] = useState(false);

  const toggleDropdownMaster = () => {
    setIsOpenMaster(!isOpenMaster);
    setIsOpenVoucher(false);
  };

  const toggleDropdownVoucher = () => {
    setIsOpenVoucher(!isOpenVoucher);
    setIsOpenMaster(false);
  };

  return (
    <>
      <Navbarac /> {/* Add the Nav component here */}
      <div className="flex h-screen bg-red-400">
        <div className="flex-shrink-0 w-64 bg-gradient-to-b from-gray-500 to-gray-900">
          <div className="flex flex-col h-full">
            <div className="flex flex-col flex-grow overflow-y-auto">
              <ul className="flex flex-col py-4">
                <li className="px-4">
                  <div
                    className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer"
                    onClick={toggleDropdownMaster}
                  >
                    <GiDividedSquare className="text-lg" />
                    <span className="ml-2">Master</span>
                  </div>
                  {isOpenMaster && (
                    <div className="ml-6">
                      <Link
                        to="/protected/componentac/sidebarac/Sidebarac/master/groups"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Groups</span>
                      </Link>
                      <Link
                        to="/protected/componentac/sidebarac/Sidebarac/master/account"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Account</span>
                      </Link>
                      <Link
                        to="/protected/componentac/sidebarac/Sidebarac/master/type"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Type</span>
                      </Link>
                      <Link
                        to="/protected/componentac/sidebarac/Sidebarac/master/openingbalance"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Opening Balance</span>
                      </Link>
                      <Link
                        to="/protected/componentac/sidebarac/Sidebarac/master/cheque"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Cheque</span>
                      </Link>
                    </div>
                  )}
                </li>
                <li className="px-4">
                  <div
                    className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer"
                    onClick={toggleDropdownVoucher}
                  >
                    <GiDividedSquare className="text-lg" />
                    <span className="ml-2">Voucher</span>
                  </div>
                  {isOpenVoucher && (
                    <div className="ml-6">
                      <Link
                        to="/sidebar/master/receiptvoucher"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Receipt Voucher</span>
                      </Link>
                      <Link
                        to="/sidebar/master/paymentvoucher"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Payment Voucher</span>
                      </Link>
                      <Link
                        to="/sidebar/master/billpassing"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Bill Passing</span>
                      </Link>
                      <Link
                        to="/sidebar/master/contravoucher"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Contra Voucher</span>
                      </Link>
                      <Link
                        to="/sidebar/master/journalvoucher"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Journal Voucher</span>
                      </Link>
                      <Link
                        to="/sidebar/master/billdeduction"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Bill Deduction</span>
                      </Link>
                      <Link
                        to="/sidebar/master/chequedeposit"
                        className="rounded-md pl-4 flex items-center justify-start py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
                      >
                        <FaRegCircle className="text-sm" />
                        <span className="ml-2">Cheque Deposit</span>
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

export default Sidebarac;


// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { GiDividedSquare } from 'react-icons/gi';
// import { FaRegCircle } from 'react-icons/fa';
// import Navbarac from '../navbar/Navbarac';

// function Sidebarac() {
//   const [isOpenMaster, setIsOpenMaster] = useState(false);
//   const [isOpenVoucher, setIsOpenVoucher] = useState(false);

//   const toggleDropdownMaster = () => {
//     setIsOpenMaster(!isOpenMaster);
//     setIsOpenVoucher(false);
//   };

//   const toggleDropdownVoucher = () => {
//     setIsOpenVoucher(!isOpenVoucher);
//     setIsOpenMaster(false);
//   };

//   return (
//     <>
//       <Navbarac /> {/* Add the Nav component here */}
//       <div className="flex h-screen bg-red-400">
//         <div className="flex-shrink-0 w-64 bg-gradient-to-b from-gray-500 to-gray-900">
//           <div className="flex flex-col h-full">
//             <div className="flex flex-col flex-grow overflow-y-auto">
//               <ul className="flex flex-col py-4 ">
//                 <li className="px-4">
//                   <div
//                     className="rounded-md flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer"
//                     onClick={toggleDropdownMaster}
//                   >
//                     <GiDividedSquare />
//                     <span className="ml-2">Master</span>
//                   </div>
//                   {isOpenMaster && (
//                     <div className="ml-6">
//                       <Link
//                         to="/protected/componentac/sidebarac/Sidebarac/master/groups"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Groups</span>
//                       </Link>
//                       <Link
//                         to="/protected/componentac/sidebarac/Sidebarac/master/account"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Account</span>
//                       </Link>
//                       <Link
//                         to="/protected/componentac/sidebarac/Sidebarac/master/type"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Type</span>
//                       </Link>
//                       <Link
//                         to="/protected/componentac/sidebarac/Sidebarac/master/openingbalance"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Opening Balance</span>
//                       </Link>
//                       <Link
//                         to="/protected/componentac/sidebarac/Sidebarac/master/cheque"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Cheque</span>
//                       </Link>
//                     </div>
//                   )}
//                 </li>
//                 <li className="px-4">
//                   <div
//                     className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200 cursor-pointer"
//                     onClick={toggleDropdownVoucher}
//                   >
//                     <GiDividedSquare />
//                     <span className="ml-2">Voucher</span>
//                   </div>
//                   {isOpenVoucher && (
//                     <div className="ml-6">
//                       <Link
//                         to="/sidebar/master/receiptvoucher"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Receipt Voucher</span>
//                       </Link>
//                       <Link
//                         to="/sidebar/master/paymentvoucher"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Payment Voucher</span>
//                       </Link>
//                       <Link
//                         to="/sidebar/master/billpassing"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Bill Passing</span>
//                       </Link>
//                       <Link
//                         to="/sidebar/master/contravoucher"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Contra Voucher</span>
//                       </Link>
//                       <Link
//                         to="/sidebar/master/journalvoucher"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Journal Voucher</span>
//                       </Link>
//                       <Link
//                         to="/sidebar/master/billdeduction"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Bill Deduction</span>
//                       </Link>
//                       <Link
//                         to="/sidebar/master/chequedeposit"
//                         className="flex items-center py-2 text-white hover:bg-gray-700 hover:text-yellow-400 hover:scale-105 transform transition-all duration-200"
//                       >
//                         <FaRegCircle />
//                         <span className="ml-2">Cheque Deposit</span>
//                       </Link>
//                     </div>
//                   )}
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex-grow bg-gray-200">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Sidebarac;


// import React, { useState } from 'react';
// import { Link, Outlet } from 'react-router-dom';
// import { GiDividedSquare } from "react-icons/gi";
// import { FaRegCircle } from "react-icons/fa";
// import Navbarac from '../navbar/Navbarac';

// function Sidebarac() {
 
//   const [isOpenMaster, setIsOpenMaster] = useState(false); 
//   const [isOpenVoucher, setIsOpenVoucher] = useState(false); 




//   const toggleDropdownMaster = () => {
//     setIsOpenMaster(!isOpenMaster); 
//     setIsOpenVoucher(false);


//   };
//   const toggleDropdownVoucher  = () => {
//     setIsOpenVoucher(!isOpenVoucher); 
//     setIsOpenMaster(false);
    
  

//   };




//   return (
//     <>
//       <Navbarac /> {/* Add the Nav component here */}
//       <div className="flex  h-screen bg-red-400">
//         <div className="flex-shrink-0 w-64 bg-gradient-to-b from-gray-500 to-gray-900">
//           <div className="flex flex-col h-full">
//             <div className="flex flex-col flex-grow overflow-y-auto">
//               <ul className="flex flex-col py-4">
//                 <li className="px-4">
//                   <div className="flex items-center py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={toggleDropdownMaster}>
//                     <GiDividedSquare/>
//                     <span className="ml-2">Master</span>
//                   </div>
//                   {/* Render the Home dropdown content if isOpenHome is true */}
//                   {isOpenMaster && (
//                     <div className="ml-6">
//                       <Link to="/protected/componentac/sidebarac/Sidebarac/master/groups" className="flex items-center py-2 text-white hover:bg-gray-700">
//                       <FaRegCircle/>
//                         <span className="ml-2">Groups</span>
//                       </Link>
//                       <Link to="/protected/componentac/sidebarac/Sidebarac/master/account" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Account</span>
//                       </Link>
//                       <Link to="/protected/componentac/sidebarac/Sidebarac/master/type" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Type</span>
//                       </Link>
//                       <Link to="/protected/componentac/sidebarac/Sidebarac/master/openingbalance" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">opening Balance</span>
//                       </Link>
//                       <Link to="/protected/componentac/sidebarac/Sidebarac/master/cheque" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Cheque</span>
//                       </Link>
//                     </div>
//                   )}
//                 </li>
//                 <li className="px-4">
//                   <div className="flex items-center py-2 text-white hover:bg-gray-700 cursor-pointer" onClick={toggleDropdownVoucher}>
//                     <GiDividedSquare/>
//                     <span className="ml-2">Voucher</span>
//                   </div>
//                   {/* Render the History dropdown content if isOpenHistory is true */}
//                   {isOpenVoucher && (
//                     <div className="ml-6">
//                       <Link to="/sidebar/master/receiptvoucher" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Receipt Voucher </span>
//                       </Link>
//                       <Link to="/sidebar/master/paymentvoucher" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Payment Voucher</span>
//                       </Link>
//                       <Link to="/sidebar/master/billpassing" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Bill Passing</span>
//                       </Link>
//                       <Link to="/sidebar/master/contravoucher" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Contra Voucher</span>
//                       </Link>
//                       <Link to="/sidebar/master/journalvoucher" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Journal Voucher</span>
//                       </Link> 
//                       <Link to="/sidebar/master/billdeduction" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Bill Deduction</span>
//                       </Link>
//                       <Link to="/sidebar/master/chequedeposit" className="flex items-center py-2 text-white hover:bg-gray-700">
//                         <FaRegCircle/>
//                         <span className="ml-2">Cheque Deposit</span>
//                       </Link>
//                     </div>
//                   )}
//                 </li>

//               </ul>
//             </div>
//           </div>
//         </div>
//         <div className="flex-grow bg-gray-200">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// }

// export default Sidebarac;




// import React from 'react'

// function Sidebarac() {
//   return (
//     <div>
//       ghggj
//     </div>
//   )
// }

// export default Sidebarac
