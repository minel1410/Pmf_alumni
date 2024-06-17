"use client";

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import FeatherIcon from 'feather-icons-react';

const Layout = ({children}) => {
    
   const [user, setUser] = useState({});
  const [avatarUrl, setAvatarUrl] = useState("/avatar/no-avatar.svg");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
          if (response.data.profilna_slika) {
            setAvatarUrl(`http://localhost:8000/files/images/profile/${response.data.profilna_slika}`);
          }
          console.log(response.data);
        } else {
          window.location.href = '/auth'
        }
      } catch (error) {
        console.error("Failed to fetch user", error);
        window.location.href = '/auth'
        
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

  async function logOut() {
    try {
      const response = await axios.delete("http://localhost:8000/auth/log_out", { withCredentials: true });
      if (response.status === 200) {
        window.location.href = '/auth';
        console.log(response.data);
      }
    } catch (error) {
      console.error("Failed to log out", error);
    }
  }

    return (
        <>
            <nav className="fixed top-0 z-30 w-full bg-charade-900 border-b border-gray-200">
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
                            <a href="/" className="flex ms-2 md:me-24">
                                <img src="/logo/pmf_svg.svg" className="h-8 me-3" alt="PMF Logo" />
                                <span className="self-center text-xl font-semibold md:text-2xl whitespace-nowrap text-white">PMF Alumni</span>
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
                                            src={avatarUrl}
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
            className={`bg-charade-900 h-screen fixed top-0 left-0 z-20 w-64 pt-20 transition-transform border-gray-200 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0`}
        >
            <div className="h-full pb-4 overflow-y-auto bg-charade-900 ps-4">
                <ul className="space-y-4 font-medium">
                    <li className="mb-2">
                    
                    </li>
                    {user["is_admin"] && <li>
                        <a href="/admin" className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="users" />

                            <span className="ms-3">Admin panel</span>
                        </a>
                    </li>}
                    <li>
                        <a href="/" className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="home" />

                            <span className="ms-3">Početna</span>
                        </a>
                    </li>
                    <li>
                        <a href="/chat" className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="inbox" />

                            <span className="ms-3">Inbox</span>
                        </a>
                    </li>
                    <li>
                        <a href="/event" className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="calendar" />

                            <span className="ms-3">Eventi</span>
                        </a>
                    </li>
                    <li>
                        <a href="/jobs" className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="briefcase" />

                            <span className="ms-3">Poslovi</span>
                        </a>
                    </li>
                    {user["is_admin"] ? (
                      <li>
                        <a
                          href="/admin/all-jobs"
                          className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all"
                        >
                          <FeatherIcon icon="briefcase" />
                          <span className="ms-3">Svi poslovi</span>
                        </a>
                      </li>
                    ) : (
                      <li>
                        <a
                          href="/user/my-jobs"
                          className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all"
                        >
                          <FeatherIcon icon="briefcase" />
                          <span className="ms-3">Moji poslovi</span>
                        </a>
                      </li>
                    )}

                    <li>
                        <a href={`/user/${user["id"]}`} className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="user" />

                            <span className="ms-3">Moj profil</span>
                        </a>
                    </li>
                </ul>
                <div className="absolute bottom-0 left-0 w-full py-2 ps-4 border-t">
                    <ul className="space-y-4 font-medium">
                        <li>
                        <a href="#" className="flex items-center gap-5 p-2 py-4 text-white hover:rounded-tl-[30px] hover:rounded-bl-[30px] hover:bg-white hover:text-charade-900 transition-all">
                                                        <FeatherIcon icon="log-out" />

                            <span className="ms-3">Log out</span>
                        </a>
                    </li>
                    </ul>
                </div>
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

export default React.memo(Layout);
