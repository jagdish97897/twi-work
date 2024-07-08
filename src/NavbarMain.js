import React from 'react';

function NavbarMain() {


    return (
        <nav className="bg-gradient-to-b from-gray-50 to-green-500">
            <div className="max-w-7xl mx-4 sm:mx-6 lg:mx-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                    <a href="https://www.twcpl.in/">
                            <img
                                className="h-16 w-auto"
                                src="/twcpl.png"
                                alt="Logo"
                            />
                        </a>
                    </div>

                    <div className="flex items-center">
                        <div className="ml-auto flex items-center">
                            <div className="flex items-center mr-4">
                                <FaPhone className="mr-1" />
                                <span>+91 97558 56913</span>
                            </div>
                            <div className="flex items-center" onClick={handleEmailClick} style={{cursor: 'pointer'}}>
                                <FaEnvelope className="mr-1" />
                                <span>jagdish0000singh@gmail.com</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavbarMain;
