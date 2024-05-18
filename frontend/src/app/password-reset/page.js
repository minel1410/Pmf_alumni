"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Input from '../components/Input';
import Link from 'next/link';
import { motion } from "framer-motion";
import { useSearchParams } from 'next/navigation';

const PwReset = () => {

  const [error, setError] = useState("");
  const [email, setEmail] = useState("")
  const [linkExpired, setLinkExpired] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
 
  const token = useSearchParams().get('token')
  
  useEffect(() => {
  const fetchEmail = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/auth/password-reset?token=${token}`); 
      console.log(response.data)
      setEmail(response.data)
    } catch (error) {
      console.error(error);
      setError(error.response.data.detail);
      setLinkExpired(true)
    }
  };

  fetchEmail();
}, []); 


  const [formData, setFormData] = useState({
    e_mail: email,
    password: "",
    pwc: ""
  });
  const [errors, setErrors] = useState({
    password: "",
    pwc: ""
  });
  const [successes, setSuccesses] = useState({
    password: false,
    pwc: false
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
        password: true,
        pwc: true
    };

    if (!formData.password) {
        newErrors.password = "Polje password je obavezno";
        valid = false;
        newSuccesses.password = false;
    } else if (formData.password.length < 8) {
        newErrors.password = "Password mora imati minimalno 8 karaktera";
        valid = false;
        newSuccesses.password = false;
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
        newErrors.password =
            "Password mora sadržavati barem jedno veliko slovo i barem jedan broj";
        valid = false;
        newSuccesses.password = false;
    } else {
        if (formData.password !== formData.pwc) {
            newErrors.password = "Passwordi se ne podudaraju";
            newErrors.pwc = "Passwordi se ne podudaraju";
            valid = false;
            newSuccesses.password = false;
            newSuccesses.pwc = false;
        } else {
            newSuccesses.password = true;
            newSuccesses.pwc = true;
        }
    }

    if (!formData.pwc) {
        newErrors.pwc = "Polje confirm password je obavezno";
        valid = false;
        newSuccesses.pwc = false;
    }

    setErrors(newErrors);
    setSuccesses(newSuccesses);

    if (valid) {
        try {
            const response = await axios.post(
                "http://localhost:8000/auth/password-reset",
                {
                    email: email,
                    new_password: formData.password
                    }
            );
            setResetSuccess(true)
        } catch (error) {
            console.log(error)
        }
    }
};


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full h-full sm:h-4/5 xl:w-3/5 relative overflow-hidden bg-white rounded-lg flex justify-center items-center px-10"
    >
      { linkExpired ? (

        <div className="flex flex-col-reverse md:flex-row justify-around items-center gap-5">
            <div className="flex flex-col w-full">
                <h1 className="text-2xl font-bold text-gray-800 mt-8">
  Link je istekao
</h1>
<p className="text-lg text-gray-500">Izgleda da je ovaj zahtjev za reset lozinke istekao. Molimo podnesite novi zahtjev</p>
<button
          className="mt-6 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
        onClick={() => window.location.href = "/password-recovery"}
        >
          novi zahtjev
        </button>
            </div>
            <img
          className=""
          src="/other/expired.svg"
          alt="Expired svg"
          width={350}
          height={350}
        />
        </div>

      ) : (
        <form className="h-full flex flex-col items-center justify-center px-12">
        <h1 className="mb-6 text-picton-blue-500 text-5xl font-bold font-mono">
            Postavite novu lozinku
        </h1>
        <Input
          label="New password"
          type="password"
          name="password"
          onChange={handleChange}
          errorMessage={errors.password}
          error={errors.password}
          value={formData.password}
          success={successes.password}
          disabled = {resetSuccess}
        />
        <Input
          label="Confirm new password"
          type="password"
          name="pwc"
          onChange={handleChange}
          errorMessage={errors.pwc}
          error={errors.pwc}
          value={formData.pwc}
          success={successes.pwc}
          disabled = {resetSuccess}
        />
        <p className={ resetSuccess ? ("text-md text-green-500") : ("hidden")}>Uspješno ste resetovali lozinku</p>
        <button
          onClick={handleSubmit}
          className="mt-6 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
        >
          POSTAVI NOVU LOZINKU
        </button>
        <p className="mt-3 text-blue-gray-500">
            Sjetili ste se lozinke?{" "}
          <a href="/auth" className="text-picton-blue-500">
            Nazad na login.
          </a>
        </p>
      </form>
      )}
    </motion.div>
  );
};

export default PwReset;
