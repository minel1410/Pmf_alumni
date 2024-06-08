"use client"

import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";

const UserCard = ({ user }) => {
  // Stanje koje prati da li je dropdown otvoren ili zatvoren
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full p-4 flex justify-between items-center rounded-lg shadow-md border">
      <p>#12323</p>
      <div className="flex gap-3">
        <img src="/avatar/no-avatar.svg" className="h-5 w-5" />
        <p>Minel Salihagic</p>
      </div>
      <p>msalihagic@hmail.com</p>
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <p>Verifikovan</p>
      </div>

      {/* Dodajemo uslovni prikaz dropdowna */}
      <div className="relative">
        <div
          className="p-1 border rounded-lg cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Omogućujemo da klikom na ikonu promenimo stanje dropdowna
        >
          <FeatherIcon
            icon="chevron-down"
            className={`w-5 h-5 transform transition-transform ${
              isDropdownOpen ? "rotate-180" : "" // Dodajemo klasu za rotaciju ikone kada je dropdown otvoren
            }`}
          />
        </div>
        {/* Dynamically render dropdown content based on isDropdownOpen state */}
        {isDropdownOpen && (
          <div className="absolute top-8 right-0 bg-white border rounded-lg shadow-md p-2">
            {/* Ovdje dodajte sadržaj dropdowna */}
            <p>Dropdown sadržaj</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
