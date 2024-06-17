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
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const updateAvatar = (imgSrc) => {
    // Assuming avatarUrl is a state or ref to hold the avatar URL
    setFormData((prevState) => ({
      ...prevState,
      avatar: imgSrc,
    }));
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/auth/update-info/${user.id}`, formData);

      if (response.status === 200) {
        openToast(
          <div className="flex p-4">
            <div className="flex-shrink-0">
              <svg
                className="flex-shrink-0 size-4 text-teal-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
            </div>
            <div className="ms-3">
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Uspješno ste ažurirali podatke.
              </p>
            </div>
          </div>
        );
        setModalProfileOpen(false);
      }
    } catch (error) {
      openToast(
        <div className="flex p-4">
          <div className="flex-shrink-0">
            <svg
              className="flex-shrink-0 size-4 text-red-500 mt-0.5"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
            </svg>
          </div>
          <div className="ms-3">
            <p className="text-sm text-gray-700 dark:text-neutral-400">
              Došlo je do greške prilikom ažuriranja podataka
            </p>
          </div>
        </div>
      );
    }
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
          {owner && (
            <button
              className="absolute -bottom-2 left-0 right-0 m-auto w-fit p-1 rounded-full opacity-75 bg-gray-800 hover:opacity-100 border border-gray-600 transition-all"
              title="Change photo"
              onClick={() => setModalPictureOpen(true)}
            >
              <FeatherIcon icon="edit-2" className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
        <div>
          <p className="font-bold text-md">{`${user.ime} ${user.prezime}`}</p>
          <p className="text-gray-400">{user.zanimanje || user.email}</p>
          <p className="text-gray-400">{user.mjesto_stanovanja}</p>
        </div>
      </div>
      {owner && (
        <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
          <p className="text-gray-800">Edit</p>
        </div>
      )}

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
              name="ime"
              value={formData.ime}
              onChange={handleChange}
            />
            <Input
              label="Prezime"
              name="prezime"
              value={formData.prezime}
              onChange={handleChange}
            />
            <Input
              label="Zanimanje"
              name="zanimanje"
              value={formData.zanimanje}
              onChange={handleChange}
            />
            <Input
              label="Mjesto stanovanja"
              name="mjesto_stanovanja"
              value={formData.mjesto_stanovanja}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-around gap-4 px-5">
          <button
            onClick={handleUpdateClick}
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



function PersonalInformation({ user, owner }) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);
  const [formData, setFormData] = useState({
    ime: user.ime,
    prezime: user.prezime,
    email: user.email,
    broj_telefona: user.broj_telefona,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleUpdateClick = async () => {
    try {
      const response = await axios.put(`http://localhost:8000/auth/update-details/${user.id}`, formData);

      if (response.status === 200) {
        openToast(
          <div className="flex p-4">
            <div className="flex-shrink-0">
              <svg
                className="flex-shrink-0 size-4 text-teal-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
            </div>
            <div className="ms-3">
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Uspješno ste ažurirali podatke.
              </p>
            </div>
          </div>,
        );
        setModalProfileOpen(false);
      }
    } catch (error) {
      openToast(
        <div className="flex p-4">
              <div className="flex-shrink-0">
                <svg
                  className="flex-shrink-0 size-4 text-red-500 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                </svg>
              </div>
              <div className="ms-3">
                <p className="text-sm text-gray-700 dark:text-neutral-400">
                  Došlo je do greške prilikom ažuriranja podataka
                </p>
              </div>
            </div>,
      );
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Lične informacije</p>
        {owner && (
          <div
            onClick={handleEditClick}
            className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
            <p className="text-gray-800">Edit</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <p className="text-gray-600 font-light">Ime</p>
          <p className="text-gray-800">{user.ime}</p>
        </div>
        <div>
          <p className="text-gray-600 font-light">Prezime</p>
          <p className="text-gray-800">{user.prezime}</p>
        </div>
        <div>
          <p className="text-gray-600 font-light">Email</p>
          <p className="text-gray-800">{user.email}</p>
        </div>
        <div>
          <p className="text-gray-600 font-light">Broj telefona</p>
          <p className="text-gray-800">{user.broj_telefona}</p>
        </div>
      </div>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex flex-col gap-3 p-5">
          <p className="text-3xl font-bold">Ažuriranje ličnih informacija</p>
          <div className="flex flex-col gap-2">
            <Input
              label="Ime"
              name="ime"
              value={formData.ime}
              onChange={handleChange}
            />
            <Input
              label="Prezime"
              name="prezime"
              value={formData.prezime}
              onChange={handleChange}
            />
            <Input
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Broj telefona"
              name="broj_telefona"
              value={formData.broj_telefona}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="flex justify-around gap-4 px-5">
          <button
            onClick={handleUpdateClick}
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
}

function Password({ user, owner }) {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const { open: openToast } = useContext(ToastContext);

  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirm: "",
  });

  const [errors, setErrors] = useState({});
  const [successes, setSuccesses] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleDeleteClick = async () => {
    try {
    const response = await axios.put(`http://localhost:8000/auth/update-pw/${user.id}`, formData);
      if (response.status === 200) {
        openToast(
          <div className="flex p-4">
            <div className="flex-shrink-0">
              <svg
                className="flex-shrink-0 size-4 text-teal-500 mt-0.5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"></path>
              </svg>
            </div>
            <div className="ms-3">
              <p className="text-sm text-gray-700 dark:text-neutral-400">
                Uspješno ste ažurirali podatke.
              </p>
            </div>
          </div>
        );
        setModalProfileOpen(false);
      }
    } catch (error) {
      openToast(
            <div className="flex p-4">
              <div className="flex-shrink-0">
                <svg
                  className="flex-shrink-0 size-4 text-red-500 mt-0.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
                </svg>
              </div>
              <div className="ms-3">
                <p className="text-sm text-gray-700 dark:text-neutral-400">
                  Došlo je do greške prilikom ažuriranja podataka
                </p>
              </div>
            </div>
          );
      if (error.response) {
        if (error.response.status === 401) {
          setErrors((prevState) => ({
            ...prevState,
            current_password: "Stari password nije tačan",
          }));
        } else if (error.response.status === 400) {
          setErrors((prevState) => ({
            ...prevState,
            new_password_confirm: "Novi passwordi se ne podudaraju",
          }));
        } else {
          
        }
      }
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Password</p>
        {owner && (
          <div
            onClick={handleEditClick}
            className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
            <p className="text-gray-800">Edit</p>
          </div>
        )}
      </div>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex flex-col gap-3 p-5">
          <p className="text-3xl font-bold">Promjena passworda</p>
          <div className="flex flex-col gap-2">
            <Input
              label="Stari password"
              type="password"
              name="current_password"
              value={formData.current_password}
              success={successes.current_password}
              error={errors.current_password}
              errorMessage={errors.current_password}
              onChange={handleChange}
            />
            <Input
              label="Novi password"
              type="password"
              name="new_password"
              value={formData.new_password}
              success={successes.new_password}
              error={errors.new_password}
              errorMessage={errors.new_password}
              onChange={handleChange}
            />
            <Input
              label="Potvrdite novi password"
              type="password"
              name="new_password_confirm"
              value={formData.new_password_confirm}
              success={successes.new_password_confirm}
              error={errors.new_password_confirm}
              errorMessage={errors.new_password_confirm}
              onChange={handleChange}
            />
            <div className="flex justify-around gap-4">
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
          </div>
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

const ProfessionalInfo = ({ user, owner }) => {
  const [modalProfileOpen, setModalProfileOpen] = useState(false);
  const [formData, setFormData] = useState({
    zanimanje: user.zanimanje,
    poslodavac: user.trenutni_poslodavac !== 'null' ? user.trenutni_poslodavac : 'Nezaposlen',
    linkedin: user.linkedin_profil,
    cv: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
     ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
  setFormData((prevState) => ({
    ...prevState,
    cv: e.target.files[0], 
  }));
};

  const handleEditClick = () => {
    setModalProfileOpen(true);
  };

  const handleUpdateClick = async () => {
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await axios.put(`http://localhost:8000/auth/update-professional-info/${user.id}`, formDataToSend, {
        headers: {
          'Content-Type':'multipart/form-data',
        },
      });

      if (response.status === 200) {
        
        setModalProfileOpen(false);
      }
    } catch (error) {
      
      console.error('Error updating professional info:', error);
    }
  };

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Informacije o zaposlenju</p>
        {owner && (
          <div
            onClick={handleEditClick}
            className="px-4 py-1 border-2 border-gray-300 rounded-md flex items-start gap-2 cursor-pointer hover:bg-gray-100 transition-colors"
          >
            <FeatherIcon icon="edit" className="w-5 h-5 p-0 text-gray-800" />
            <p className="text-gray-800">Edit</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <p className="text-gray-600 font-light">Zanimanje</p>
          <p className="text-gray-800">{user.zanimanje}</p>
        </div>
        <div>
          <p className="text-gray-600 font-light">Poslodavac</p>
          <p className="text-gray-800">{user.trenutni_poslodavac !== 'null' ? user.trenutni_poslodavac : "Nezaposlen"}</p>
        </div>
        <div>
          <p className="text-gray-600 font-light">LinkedIn</p>
          <a href={user.linkedin_profil} className="underline">{user.linkedin_profil}</a>
        </div>
        <div>
          <a href={`http://localhost:8000/files/cvs/${user.id}`} target="_blank" rel="noopener noreferrer">
            <button className="px-4 py-2 bg-picton-blue-500 text-white rounded-md">Pogledaj CV</button>
          </a>
        </div>
      </div>

      <Modal open={modalProfileOpen} onClose={() => setModalProfileOpen(false)}>
        <div className="flex flex-col gap-3 p-5">
          <p className="text-3xl font-bold">Ažuriranje informacija o zaposlenju</p>
          <div className="flex flex-col gap-2">
            <Input
              label="Zanimanje"
              type="text"
              name="zanimanje"
              value={formData.zanimanje}
              onChange={handleChange}
            />
            <Input
              label="Poslodavac"
              type="text"
              name="poslodavac"
              value={formData.poslodavac? formData.poslodavac : 'Nezaposlen'}
              onChange={handleChange}
            />
            <Input
              label="LinkedIn profil"
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <div>
              <label className="block font-medium text-gray-900 dark:text-white" htmlFor="file_input">Uploadajte CV</label>
              <input 
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
                id="file_input" 
                type="file"
                name="cv"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex justify-around gap-4 mt-3">
            <button
              onClick={handleUpdateClick}
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
        </div>
      </Modal>
    </div>
  );
};
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
        
      </div>

      

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

function DeleteUser({user, owner}) {

  const [modalDeleteOpen, setModalDelteOpen] = useState(false);


  const handleEditClick = () => {
    setModalDelteOpen(true);
  };

  const handleDeleteClick = () => {
    axios.delete(`http://localhost:8000/auth/delete-user/${user.id}`)
  };

  

  return (
    <div className="border-2 border-gray-200 rounded-lg p-4">
      <div className="flex w-full justify-between">
        <p className="text-xl font-semibold">Obriši profil</p>
        {owner && <div
          onClick={handleEditClick}
          className="px-4 py-1 border-2 bg-red-500 rounded-md flex items-start gap-2 cursor-pointer hover:opacity-75 transition-colors"
        >
          
          <p className="text-white">Obriši</p>
        </div>}
      </div>

      <Modal open={modalDeleteOpen} onClose={() => setModalDelteOpen(false)}>
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold">Jeste li sigurni da želite obrisati svoj račun?</p>
          <div className="flex justify-around gap-4">
          <button
            onClick={handleDeleteClick}
            className="bg-red-500 p-3 rounded-lg text-white w-full"
          >
            Obriši
          </button>
          <button
            className="bg-white border-2 border-black p-3 rounded-lg text-black w-full"
            onClick={() => setModalDelteOpen(false)}
          >
            Nazad
          </button>
        </div>
        </div>
        
      </Modal>
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
        <DeleteUser user={user} owner={owner}></DeleteUser>
      </div>
    </ToastProvider>
  );
}



