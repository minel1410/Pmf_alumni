"use client";

import { useState } from "react";
import FeatherIcon from "feather-icons-react";
import Modal from "@/app/components/Modal";
import axios from "axios";




const UserCard = ({ userParam }) => {
  const [user, setUser] = useState({
    id: userParam["id"],
    name: userParam["ime"],
    lastname: userParam["prezime"],
    email: userParam["email"],
    is_admin: userParam["is_admin"],
    diploma_picture: userParam["diploma_slika"],
    is_verified: userParam["verifikovan"],
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);

  const handleEditClick = () => {
    // Logic for editing user information
    // For example, opening a modal to edit user details
  };

  const handleDeleteClick = async () => {
    try {
      await axios.delete(`http://localhost:8000/auth/delete-user/${user.id}`);
      setModalDeleteOpen(false);
      // Optionally, update state or perform other actions after deletion
    } catch (error) {
      console.error('Greška prilikom brisanja korisnika:', error);
      // Handle error, if necessary
    }
  };

  const assignAdmin = async () => {
    try {
      await axios.put(`http://localhost:8000/admin/assign-admin/${user.id}`);
      setUser({ ...user, is_admin: true });
    } catch (error) {
      console.error('Greška prilikom dodjele administratorskih prava:', error);
      // Handle error, if necessary
    }
  };

  const verify = async () => {
    try {
      await axios.put(`http://localhost:8000/admin/verify/${user.id}`);
      setUser({ ...user, is_verified: true });
    } catch (error) {
      console.error('Greška prilikom verifikacije korisnika:', error);
      // Handle error, if necessary
    }
  };

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
          <p className="font-medium text-gray-700">{user.name} {user.lastname}</p>
        </div>
        <p className="hidden lg:block col-span-3 text-gray-700">{user.email}</p>
        <div className="items-center gap-2 hidden lg:flex col-span-2">
          <div className={user.is_verified ? "w-3 h-3 rounded-full bg-green-500" : "w-3 h-3 rounded-full bg-red-500"}></div>
          <p className="text-gray-700">{user.is_verified ? "Verifikovan" : "Nije verifikovan"}</p>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="mt-4 py-8 border-t border-gray-200">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Korisnički ID:</p>
              <p className="text-gray-700">{user.id}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Ime:</p>
              <p className="text-gray-700">{user.name}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Prezime:</p>
              <p className="text-gray-700">{user.lastname}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Administrator status:</p>
              <div>
                {user.is_admin ? (
                  <span className="text-blue-600">Admin</span>
                ) : (
                  <button onClick={assignAdmin} className="text-blue-600 hover:underline hover:cursor-pointer">Dodijeli admina</button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-700 font-medium">Verifikacija:</p>
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
              <button onClick={verify} className="text-white px-6 py-2 bg-picton-blue-500 rounded-md">Verifikuj</button>
            </div>
            <div>
              <button onClick={() => setModalDeleteOpen(true)} className="p-3 bg-red-500 text-white hover:opacity-75 rounded-md">
                Obriši korisnika
              </button>
            </div>
          </div>
        </div>
      </div>

      <Modal open={modalDeleteOpen} onClose={() => setModalDeleteOpen(false)}>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Jeste li sigurni da želite obrisati ovaj račun?</p>
          <div className="flex justify-around gap-4">
            <button onClick={handleDeleteClick} className="bg-red-500 p-3 rounded-lg text-white w-full">
              Obriši
            </button>
            <button onClick={() => setModalDeleteOpen(false)} className="bg-white border-2 border-black p-3 rounded-lg text-black w-full">
              Nazad
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserCard;
