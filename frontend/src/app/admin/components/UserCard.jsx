"use client";

import { useState } from "react";
import FeatherIcon from "feather-icons-react";

const UserCard = ({ userParam }) => {
  const user = {
    id: userParam["id"],
    name: userParam["ime"],
    lastname: userParam["prezime"],
    email: userParam["email"],
    is_admin: userParam["is_admin"],
    diploma_picture: userParam["diploma_slika"],
    is_verified: userParam["verifikovan"],
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full p-4 flex flex-col rounded-lg shadow-md border transition-all duration-300 ease-in-out bg-white">
      <div
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="grid grid-cols-3 md:grid-cols-9 hover:cursor-pointer items-center"
      >
        <p className="col-span-1 font-medium text-gray-700">#{user.id}</p>
        <div className="flex gap-3 items-center col-span-2 md:col-span-3">
          <img
            src={`http://localhost:8000/files/images/profile/id/${user.id}`}
            className="h-10 w-10 rounded-full border"
            alt="Profile"
          />
          <p className="font-medium text-gray-700">{user.name + " " + user.lastname}</p>
        </div>
        <p className="hidden lg:block col-span-3 text-gray-700">{user.email}</p>
        <div className="items-center gap-2 hidden lg:flex col-span-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <p className="text-gray-700">{user.is_verified ? "Verifikovan" : "Nije verifikovan"}</p>
        </div>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="mt-4 py-8 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Korisnički ID:</p>
              <p className="text-gray-700">{user.id}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Ime</p>
              <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Prezime</p>
              <p className="text-gray-700">{user.lastname}</p>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Administrator status</p>
              <div>
                {user.is_admin ? (
                  <span className="text-blue-600">Admin</span>
                ) : (
                  <button className="text-blue-600 hover:underline">Dodijeli admina</button>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Verifikacija</p>
              <div className="flex items-center gap-2">
                <a
                  href={`http://localhost:8000/files/images/diploma/${user.diploma_picture}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 border-2 border-picton-blue-500 rounded-md"
                >
                  Pogledaj diplomu
                </a>
                
              </div>
              <button className=" text-white px-6 py-2 bg-picton-blue-500 rounded-md">Verifikuj</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
