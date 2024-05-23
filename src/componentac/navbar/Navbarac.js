import React, { useState, useEffect, useRef } from 'react';
import { PiDotsThreeOutlineVerticalLight } from 'react-icons/pi';

function Navbarac() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    return (
        <nav className="bg-gradient-to-b from-gray-50 to-green-500">
            <div className="max-w-8xl mx-4  px-4 sm:px-6 lg:px-8 ">
                <div className="flex items-center justify-between h-16 ">
                    <div className="flex-shrink-0 flex">
                        <a href="https://www.twcpl.in/">
                            <img
                                className="h-16 w-auto"
                                src="/twcpl.png"
                                alt="Logo"
                            />
                        </a>
                        <div className="relative flex items-center mx-24 bg-gradient-to-b from-yellow-300 to-green-500">
                        <button
                            onClick={toggleDropdown}
                            className="text-white hover:text-white px-2 py-2 rounded-md text-sm font-medium focus:outline-none flex items-center"
                        >
                            <PiDotsThreeOutlineVerticalLight className="h-5 w-5" />
                        </button>
                        {isDropdownOpen && (
                            <div ref={dropdownRef} className="origin-top-right absolute left-8 mt-16 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                <div className="py-1 bg-gradient-to-b from-gray-50 to-green-500">
                                    <a href="/protected/component/sidebar/Sidebar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">MASTER</a>
                                    <a href="/protected/componentop/sidebarop/Sidebarop" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">OPERATIONS</a>
                                    <a href="/protected/componentac/sidebarac/Sidebarac" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">ACCOUNTS</a>
                                </div>
                            </div>
                        )}
                    </div>
                        
                    </div>



                    <span className="text-white">Hi Jagdish</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbarac;


// import React, { useState } from 'react';
// import { BsPersonCircle } from "react-icons/bs";

// function Navbarac() {
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <nav className="bg-gradient-to-b from-gray-50 to-green-500">
//             <div className="max-w-7xl mx-4 sm:mx-6 lg:mx-8">
//                 <div className="flex items-center justify-between h-16">
//                     <div className="flex-shrink-0">
//                         <a href="https://www.twcpl.in/">
//                             <img
//                                 className="h-16 w-auto"
//                                 src="/twcpl.png"
//                                 alt="Logo"
//                             />
//                         </a>

//                     </div>

//                     <div className=" flex items-center">
//                         <button
//                             onClick={toggleDropdown}
//                             className="text-white  hover:text-white px-3 py-2 rounded-md text-sm font-medium focus:outline-none flex gap-8"
//                         >
//                             <span >Hi Jagdish</span>
//                             <BsPersonCircle className="h-5 w-5 " />
//                         </button>
//                         {isDropdownOpen && (
//                             <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
//                                 <div className="py-1" >
//                                     <a href="/About" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">About us</a>
//                                     <a href="/feedback" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Feedback</a>
//                                     <a href="/Help" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">Help</a>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </nav>
//     );
// }

// export default Navbarac;

// import React from 'react'

// function Navbarac() {
//   return (
//     <div>
//       gff
//     </div>
//   )
// }

// export default Navbarac
