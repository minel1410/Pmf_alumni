"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Layout = ({children}) => {
    
    const [user, setUser] = useState({});

   useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
        if (response.status === 200) {
            setUser(response.data)
          console.log(response.data);
        }
      } catch (error) {

      }
    };
    fetchUser();
  }, []);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const dropdownRef = useRef(null);
    const sidebarRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            setSidebarOpen(false);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setSidebarOpen(false);
            } else {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize(); 
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    async function logOut(){
        try {
            const response = await axios.delete("http://localhost:8000/auth/log_out", { withCredentials: true });
            if (response.status === 200) {
                window.location.href = '/auth'
              console.log(response.data);
            }
          } catch (error) {
    
          }
    }

    return (
        <>
            <nav className="fixed top-0 z-30 w-full bg-white border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start">
                            <button
                                onClick={toggleSidebar}
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                aria-controls="dropdown-user"
                                type="button"
                                aria-expanded={dropdownOpen ? "true" : "false"}
                                data-dropdown-toggle="logo-sidebar"
                            >
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a href="#" className="flex ms-2 md:me-24">
                                <img src="/logo/pmf_svg_blue.svg" className="h-8 me-3" alt="PMF Logo" />
                                <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap">PMF Alumni</span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3" ref={dropdownRef}>
                                <div>
                                    <button
                                        onClick={toggleDropdown}
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="/logo/pmf_svg.svg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div
                                    className={`z-50 ${dropdownOpen ? 'block' : 'hidden'} absolute top-12 md:top-9 right-4 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-xl`}
                                    id="dropdown-user"
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p className="text-sm text-gray-900" role="none">
                                            {user["ime"] + " " + user["prezime"]}
                                                                                    </p>
                                        <p className="text-sm font-medium text-gray-900 truncate" role="none">
                                            {user["email"]}
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li
                                        onClick={logOut}>
                                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <aside
                ref={sidebarRef}
                className={`bg-white h-screen fixed top-0 left-0 z-20 w-64 pt-20 transition-transform border-r border-gray-200 ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } md:translate-x-0`}
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
                    <ul class="space-y-2 font-medium">
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-picton-blue-300 dark:hover:bg-gray-700 group">
               
               <span class="ms-3">Početna</span>
            </a>
         </li>
         <li>
            
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-picton-blue-300 dark:hover:bg-gray-700 group">
               
               <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
               
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-picton-blue-300 dark:hover:bg-gray-700 group">
               
               <span class="flex-1 ms-3 whitespace-nowrap">Poslovi</span>
            </a>
         </li>
         <li>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-picton-blue-300 dark:hover:bg-gray-700 group">
               
               <span class="flex-1 ms-3 whitespace-nowrap">Objave</span>
            </a>
         </li>
         <li
         onClick={logOut}>
            <a href="#" class="flex items-center p-2 text-gray-900 rounded-lg hover:text-white hover:bg-picton-blue-300 dark:hover:bg-gray-700 group">
               
               <span class="flex-1 ms-3 whitespace-nowrap">Log out</span>
            </a>
         </li>
         
      </ul>
                </div>
            </aside>
            <div class="p-4 md:ml-64 h-full">
   <div class="p-4 mt-14">
    {children}
   </div>
</div>
        </>
    );
};

export default Layout;
