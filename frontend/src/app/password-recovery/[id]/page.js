"use client"

import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Input from '../../components/Input';
import Link from 'next/link';


const PwRecovery = () => {
  const [formData, setFormData] = useState({
    email: ""
  });
  const [errors, setErrors] = useState({
    email: ""
  });
  const [successes, setSuccesses] = useState({
    email: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};
    const newSuccesses = {
      email: true
    };

    if (!formData.email) {
      newErrors.email = "Email je obavezan";
      valid = false;
      newSuccesses.email = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Unesite validnu email adresu";
      newSuccesses.email = false;
      valid = false;
    }

    setSuccesses(newSuccesses);
    setErrors(newErrors);

    if (valid) {
      console.log(formData);
      axios
        .post("http://localhost:8000/password-recovery", formData)
        .then((response) => {
          setSuccesses(newSuccesses);
          setErrors(newErrors);
          console.log("success", response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      setErrors(newErrors);
      setSuccesses(newSuccesses);
    }
  };

  return (
    <div className="container w-full h-full sm:h-4/5 xl:w-3/5 relative overflow-hidden bg-white rounded-lg flex justify-center items-center px-10">
      <div className='flex flex-col justify-center items-center'>
        <FontAwesomeIcon icon={faKey} className='bg-picton-blue-200 p-5 rounded-full text-6xl text-picton-blue-500'></FontAwesomeIcon>
        <div className='text-center mt-6 mb-12'>
          <p className='text-3xl text-bold text-picton-blue-500 mb-2'>Zaboravljena lozinka?</p>
          <p className='text-md text-blue-gray-300'>Bez brige. Unesite email i poslaćemo Vam upute za reset.</p>
        </div>
        <Input label="Email" name="email" type="email" onChange={handleChange}
          errorMessage={errors.email}
          error={errors.email}
          value={formData.email}
          success={successes.email}></Input>
        <button onClick={handleSubmit} className="mt-6 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full">
          Resetuj Password
        </button>
        <Link href="/auth">
        <div className='flex gap-3 items-center pt-5'>
          <div className='bg-blue-gray-100 py-1 px-2 text-blue-gray-300 text-md rounded-full'>
            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
          </div>
          <p className='text-lg text-blue-gray-300'>Nazad na login</p>
        </div>
        </Link>
        
      </div>
    </div>
  );
};

export default PwRecovery;
