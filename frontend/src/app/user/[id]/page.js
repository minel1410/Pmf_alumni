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
import Input from "@/app/components/Input";

/* function Sablon() {
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
} */


const BasicInfo = ({ user, owner }) => {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [modalPictureOpen, setModalPictureOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
  ime: user.ime,
  prezime: user.prezime,
  zanimanje: user.zanimanje,
  mjesto_stanovanja: user.mjesto_stanovanja,
});

const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };


  const updateAvatar = (imgSrc) => {
    avatarUrl.current = imgSrc;
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleDeleteClick = () => {
    openToast(
    
    <div class="flex p-4">
      <div class="flex-shrink-0">
        <svg class="flex-shrink-0 size-4 text-red-500 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
        </svg>
      </div>
      <div class="ms-3">
        <p class="text-sm text-gray-700 dark:text-neutral-400">
          Uspjesno ste ažurirali podatke
        </p>
      </div>
    </div>
    );
    setModalProfileOpen(false);
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg flex justify-between items-start p-4">
      <div className="flex gap-2 items-center">
        <div className="relative">
          <img
            src={`http://localhost:8000/files/images/profile/id/${user.id}`}
            className="w-20 h-20 rounded-full"
            alt="Profile"
          />
          {owner && <button
            className="absolute -bottom-2 left-0 right-0 m-auto w-fit p-1 rounded-full opacity-75 bg-gray-800 hover:opacity-100 border border-gray-600 transition-all"
            title="Change photo"
            onClick={() => setModalPictureOpen(true)}
          >
            <FeatherIcon icon="edit-2" className="w-4 h-4 text-white" />
          </button>}
        </div>
        <div>
          <p className="font-bold text-md">{user.ime + " " + user.prezime}</p>
          <p className="text-gray-400">{user.zanimanje ? user.zanimanje : user.email}</p>
          <p className="text-gray-400">{user.mjesto_stanovanja}</p>
        </div>
      </div>
      {owner && <div
        onClick={handleEditClick}
        className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
        <p className="text-gray-800">Edit</p>
      </div>}

      <Modal open={modalPictureOpen} onClose={() => setModalPictureOpen(false)}>
        <div className="w-[80vw] min-h-[60vh]">
          <ImageCropper
            closeModal={() => setModalPictureOpen(false)}
            updateAvatar={updateAvatar}
            userId={user.id}
          />
        </div>
      </Modal>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex flex-col gap-3 p-5">
            <p className="text-3xl font-bold">Podaci o korisniku</p>
            <div className="flex flex-col gap-2">
              <Input
              label="Ime"
              value={formData.ime}
              onChange={(e) => {
                setFormData((prevState) => ({...prevState, ime: e.target.value }));
              }}
            />

            <Input
              label="Prezime"
              value={formData.prezime}
              onChange={(e) => {
                setFormData((prevState) => ({...prevState, prezime: e.target.value }));
              }}
            />
            <Input
              label="Zanimanje"
              value={formData.zanimanje}
              onChange={(e) => {
                setFormData((prevState) => ({...prevState, zanimanje: e.target.value }));
              }}
            />
            <Input
              label="Mjesto stanovanja"
              value={formData.mjesto_stanovanja}
              onChange={(e) => {
                setFormData((prevState) => ({...prevState, mjesto_stanovanja: e.target.value }));
              }}
            />
            </div>
        </div>
        <div className="flex justify-around gap-4 px-5">
          <button
            onClick={handleDeleteClick}
            className="bg-picton-blue-500 p-3 rounded-lg text-white w-full hover:opacity-75 transition-all"
          >
            Ažuriraj
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
};


export { ImageCropper };
function PersonalInformation({user, owner}) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
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
        <p className="text-xl font-semibold">Lične informacije</p>
        {owner && <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>}
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
            onClick={() => 
              setModalProfileOpen(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      
    </div>
  );
}

function Password({user, owner}) {
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
        {owner && <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>}
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

function AcademicInfo({user, owner}) {
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
        {owner && <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>}
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

function ProfessionalInfo({user, owner}) {
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
        {owner && <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>}
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
        <p className="text-gray-800">{user["trenutni_poslodavac"] ? user["trenutni_poslodavac"] : "Nezaposlen"}</p>
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

function Tags({tags, owner}) {
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
        {owner && <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>}
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
  const [user, setUser] = useState({});
  const [viewer, setViewer] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const [owner, setOwner] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
        if (response.status === 200) {
          setViewer(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!id) return;  

    async function fetchUserComplete() {
      try {
        const response = await axios.get(`http://localhost:8000/auth/user-info/${id}`, { withCredentials: true });
        setUser(response.data.korisnik);
        setTags(response.data.tags);
        setOwner(response.data.korisnik.id === viewer.id);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError(error); 
        setLoading(false); 
      }
    }

    fetchUserComplete();
  }, [id, viewer]);  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div role="status">
          <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Došlo je do greške pri učitavanju podataka.</p> 
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="flex flex-col gap-3 w-full">
        <p className="text-3xl font-bold">Moj profil</p>
        <BasicInfo user={user} owner={owner}/> 
        <Password user={user} owner={owner} /> 
        <PersonalInformation user={user} owner={owner} /> 
        <AcademicInfo user={user} /> 
        <ProfessionalInfo user={user} owner={owner} /> 
        <Tags tags={tags} owner={owner} /> 
      </div>
    </ToastProvider>
  );
}



