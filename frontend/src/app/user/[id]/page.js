"use client";

import { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Modal from "@/app/components/Modal";
import FeatherIcon from "feather-icons-react";
import ToastContext from "@/app/components/Toast/ToastService";
import ToastProvider from "@/app/components/Toast/ToastProvider";
import ImageCropper from "@/app/components/ImageCropper/ImageCropper";
import { usePathname  } from "next/navigation";
import Link from "next/link";

function Sablon() {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

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
    <div className="border-2 border-gray-200 rounded-lg p-4">
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

function BasicInfo({user}) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const avatarUrl = useRef(
    "/avatar/no-avatar.svg"
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
            src={user["profilna_slika"] ? "/avatar/no-avatar.svg" : "/logo/pmf_svg_blue.svg"}
            className="w-20 h-20 rounded-full"
            alt="Profile"
          />
          <button
            className="absolute -bottom-2 left-0 right-0 m-auto w-fit p-1 rounded-full opacity-75 bg-gray-800 hover:opacity-100 border border-gray-600 transition-all"
            title="Change photo"
            onClick={() => setModalPictureOpen(true)}
          >
            <FeatherIcon icon="edit-2" className="w-4 h-4 text-white" />
          </button>
        </div>
        <div>
          <p className="font-bold text-md">{user["ime"] + " " + user["prezime"]}</p>
          <p className="text-gray-400">{user["zanimanje"] ? user["zanimanje"] : user["email"]}</p>
          <p className="text-gray-400">{user["mjesto_stanovanja"]}</p>
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
          <button className="p-5 w-full text-white bg-picton-blue-500 mt-5 rounded-md hover:opacity-75 transition-all">
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

function PersonalInformation({user}) {
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
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Lične informacije</p>
        <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>
      </div>


    
    <div className="grid grid-cols-2 gap-10">
      <div>
        <p className="text-gray-600 font-light">Ime</p>
        <p className="text-gray-800">{user["ime"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Prezime</p>
        <p className="text-gray-800">{user["prezime"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Email</p>
        <p className="text-gray-800">{user["email"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Broj telefona</p>
        <p className="text-gray-800">{user["broj_telefona"]}</p>
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
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Password</p>
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

function AcademicInfo({user}) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

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

  const godinaDiplomiranja = new Date(user["godina_diplomiranja"]);
const formatiranDatum = `${godinaDiplomiranja.getDate()}.${godinaDiplomiranja.getMonth() + 1}.${godinaDiplomiranja.getFullYear()}`;


  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Akademske informacije</p>
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

    <div className="grid grid-cols-2 gap-10">
      <div>
        <p className="text-gray-600 font-light">Studij</p>
        <p className="text-gray-800">{user["studij_naziv"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Odsjek</p>
        <p className="text-gray-800">{user["odsjek_naziv"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Smjer</p>
        <p className="text-gray-800">{user["smjer_naziv"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Broj indeksa</p>
        <p className="text-gray-800">{user["broj_indeksa"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Datum diplomiranja</p>
        <p className="text-gray-800">{formatiranDatum}</p>
      </div>
    </div>


    </div>
  );
}

function ProfessionalInfo({user}) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

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
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Informacije o zaposlenju</p>
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

<div className="grid grid-cols-2 gap-10">
      <div>
        <p className="text-gray-600 font-light">Zanimanje</p>
        <p className="text-gray-800">{user["zanimanje"]}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">Poslodavac</p>
        <p className="text-gray-800">{user["odsjek_naziv"] ? user["odsjek_naziv"] : "Nezaposlen"}</p>
      </div>
      <div>
        <p className="text-gray-600 font-light">LinkedIn</p>
        <a href={user["linkedin_profil"]} className="underline">{user["linkedin_profil"]}</a>
      </div>
      <div>
      <button className="px-4 py-2 bg-picton-blue-500 text-white rounded-md">Pogledaj CV</button>
      </div>
    </div>



    </div>
  );
}

function Tags({tags}) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

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
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Interesi</p>
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

<div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, index) => (
            <div
              key={index}
              className="px-3 py-1 border border-picton-blue-500 text-picton-blue-500 rounded-full hover:shadow-2xl"
            >
              {tag}
            </div>
          ))}
    </div>




    </div>
  );
}


export default function Main() {
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
  const [tags, setTags] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (!id) return;  // Ako ID nije dostupan, ne izvršavaj dalje

    async function fetchUserComplete() {
      try {
        const response = await axios.get(`http://localhost:8000/auth/user-info/${id}`, { withCredentials: true });
        setUser(response.data.korisnik);
        setTags(response.data.tags);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserComplete();
  }, []);  // useEffect se izvršava kada se ID promijeni


  return (
    <ToastProvider>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-3xl font-bold">Moj profil</p>
        <BasicInfo user={user} /> 
        <Password user={user} /> 
        <PersonalInformation user={user} /> 
        <AcademicInfo user={user} /> 
        <ProfessionalInfo user={user} /> 
        <Tags tags={tags} /> 
        
      </div>
    </ToastProvider>
  );
}

