"use client";

import { useState, useContext, useRef } from "react";
import Modal from "@/app/components/Modal";
import FeatherIcon from "feather-icons-react";
import ToastContext from "@/app/components/Toast/ToastService";
import ToastProvider from "@/app/components/Toast/ToastProvider";
import ImageCropper from "@/app/components/ImageCropper/ImageCropper";

function Sablon() {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg",
  );

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleDeleteClick = () => {
    openToast(
      <div className="flex gap-4 pe-5">
        <div>
          <h1>OK</h1>
          <p className="text-red-600">Uspješno ste sačuvali promjene</p>
        </div>
        <button className="mx-3 bg-blue-600 p-3 border border-black rounded-lg">
          Undo
        </button>
      </div>,
    );
    setModalProfileOpen(false);
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg flex justify-between p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Naslov</p>
        <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>
      </div>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex justify-around gap-4">
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 p-3 rounded-lg text-white w-full"
          >
            Delete
          </button>
          <button
            className="bg-white border-2 border-black p-3 rounded-lg text-black w-full"
            onClick={() => setModalProfileOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

function BasicInfo() {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg",
  );

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleDeleteClick = () => {
    openToast(
      <div className="flex gap-4 pe-5">
        <div>
          <h1>OK</h1>
          <p className="text-gray-600">Uspješno ste sačuvali promjene</p>
        </div>
        <button className="mx-3 bg-gray-200 p-3 border border-black rounded-lg">
          Undo
        </button>
      </div>,
    );
    setModalProfileOpen(false);
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg flex justify-between items-start p-4">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <img
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            className="w-20 h-20 rounded-full"
            alt="Profile"
          />
          <button
            className="absolute -bottom-2 left-0 right-0 m-auto w-fit p-1 rounded-full bg-gray-800 hover:bg-gray-700 border border-gray-600"
            title="Change photo"
            onClick={() => setModalPictureOpen(true)}
          >
            <FeatherIcon icon="edit-2" className="w-4 h-4 text-white" />
          </button>
        </div>
        <div>
          <p className="font-bold text-md">Jack Adams</p>
          <p className="text-gray-400">Product Designer</p>
          <p className="text-gray-400">Los Angeles</p>
        </div>
      </div>
      <div
        onClick={handleEditClick}
        className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
        <p className="text-gray-800">Edit</p>
      </div>

      <Modal open={modalPictureOpen} onClose={() => setModalPictureOpen(false)}>
        <div className="w-[80vw] min-h-[60vh]">
          <ImageCropper
            closeModal={() => setModalPictureOpen(false)}
            updateAvatar={updateAvatar}
          />
          <button className="p-5 w-full text-white bg-picton-blue-500 mt-3 rounded-md hover:opacity-75 transition-all">
            PROMIJENI SLIKU
          </button>
        </div>
      </Modal>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex justify-around gap-4">
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 p-3 rounded-lg text-white w-full"
          >
            Delete
          </button>
          <button
            className="bg-white border-2 border-black p-3 rounded-lg text-black w-full"
            onClick={() => setModalProfileOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

function PersonalInformation() {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg",
  );

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleDeleteClick = () => {
    openToast(
      <div className="flex gap-4 pe-5">
        <div>
          <h1>OK</h1>
          <p className="text-red-600">Uspješno ste sačuvali promjene</p>
        </div>
        <button className="mx-3 bg-blue-600 p-3 border border-black rounded-lg">
          Undo
        </button>
      </div>,
    );
    setModalProfileOpen(false);
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg flex justify-between p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Naslov</p>
        <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>
      </div>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex justify-around gap-4">
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 p-3 rounded-lg text-white w-full"
          >
            Delete
          </button>
          <button
            className="bg-white border-2 border-black p-3 rounded-lg text-black w-full"
            onClick={() => setModalProfileOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

function Password() {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const avatarUrl = useRef(
    "https://avatarfiles.alphacoders.com/161/161002.jpg",
  );

  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleDeleteClick = () => {
    openToast(
      <div className="flex gap-4 pe-5">
        <div>
          <h1>OK</h1>
          <p className="text-red-600">Uspješno ste sačuvali promjene</p>
        </div>
        <button className="mx-3 bg-blue-600 p-3 border border-black rounded-lg">
          Undo
        </button>
      </div>,
    );
    setModalProfileOpen(false);
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg flex justify-between p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Naslov</p>
        <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>
      </div>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex justify-around gap-4">
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 p-3 rounded-lg text-white w-full"
          >
            Delete
          </button>
          <button
            className="bg-white border-2 border-black p-3 rounded-lg text-black w-full"
            onClick={() => setModalProfileOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default function Main() {
  return (
    <ToastProvider>
      <div className="flex flex-col gap-3">
        <p className="text-3xl font-bold">Moj profil</p>
        <BasicInfo></BasicInfo>
        <PersonalInformation></PersonalInformation>
        <Password></Password>
      </div>
    </ToastProvider>
  );
}
