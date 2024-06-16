import { useState, React } from "react";
import Input from "../../components/Input";
import Avatar from "../../components/Avatar";
import axios from "axios";
import Link from 'next/link';


const SignIn = () => {


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [successes, setSuccesses] = useState({
    email: false,
    password: false,
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
      email: true,
      password: true,
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

    if (!formData.password) {
      newErrors.password = "Polje password je obavezno";
      valid = false;
      newSuccesses.password = false;
    }

    setSuccesses(newSuccesses);
    setErrors(newErrors);

    if (valid) {
  console.log(formData);
  axios
    .post("http://localhost:8000/auth/login", formData, {withCredentials: true})
    .then((response) => {
      setSuccesses((prevSuccesses) => ({
        ...prevSuccesses,
        email: true,
        password: true,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
        password: "",
      }));
      console.log("success", response.data);
      window.location.href = `/user/${response.data["id"]}`
    })
    .catch((error) => {
      console.error(error);
      if (error.response) {
        if (error.response.status === 404) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            email: "Korisnik sa datim emailom nije pronađen.",
          }));
          setSuccesses((prevSuccesses) => ({
            ...prevSuccesses,
            email: false,
          }));
        } else if (error.response.status === 401) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            password: "Pogrešan password",
          }));
          setSuccesses((prevSuccesses) => ({
            ...prevSuccesses,
            password: false,
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            general: "Došlo je do greške prilikom prijave",
          }));
          setSuccesses((prevSuccesses) => ({
            ...prevSuccesses,
            email: false,
            password: false,
          }));
        }
      } else if (error.request) {
        console.error("Error request:", error.request);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Nema odgovora sa servera. Pokušajte ponovo kasnije.",
        }));
        setSuccesses((prevSuccesses) => ({
          ...prevSuccesses,
          email: false,
          password: false,
        }));
      } else {
        console.error("Error message:", error.message);
        setErrors((prevErrors) => ({
          ...prevErrors,
          general: "Došlo je do greške prilikom postavljanja zahtjeva",
        }));
        setSuccesses((prevSuccesses) => ({
          ...prevSuccesses,
          email: false,
          password: false,
        }));
      }
    });
} else {
  setErrors(newErrors);
  setSuccesses(newSuccesses);
}


  };
  return (
    <div className="form-container sign-in-container absolute top-0 h-full transition duration-500 ease-in-out left-0 w-full lg:w-1/2 z-2 flex flex-col">
      <div className="flex items-end gap-2 px-10 pt-10">
        <img
          className=""
          src="/logo/pmf_svg_blue.svg"
          alt="PMF Logo"
          width={50}
          height={50}
        />
        <p className="text-picton-blue-500 text-xl p-0 text-left">
          Alumni Prirodno-matematičkog fakulteta Univerziteta u Sarajevu
        </p>
      </div>

      <form className="h-full flex flex-col items-center justify-center px-12">
        <Avatar
          className={"mb-6"}
          src="/avatar/no-avatar.svg"
          alt="Empty avatar"
        ></Avatar>
        <h1 className="mb-6 text-picton-blue-500 text-5xl font-bold font-mono">
          Log in
        </h1>
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          errorMessage={errors.email}
          error={errors.email}
          value={formData.email}
          success={successes.email}
        ></Input>
        <Input
          label="Lozinka"
          type="password"
          name="password"
          onChange={handleChange}
          success={successes.password}
          error={errors.password}
          errorMessage={errors.password}
          value={formData.password}
        ></Input>
        <div className="flex w-full justify-between">
          <div className="inline-flex items-center px-1">
            <label
              className="relative flex items-center rounded-full cursor-pointer"
              htmlFor="check"
            >
              <input
                type="checkbox"
                name="rememberMe"
                onChange={handleChange}
                value={formData.rememberMe}
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-picton-blue-900 before:opacity-0 before:transition-opacity checked:border-picton-blue-500 checked:bg-picton-blue-500 checked:before:bg-picton-blue-500 hover:before:opacity-10"
                id="check"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
            <label
              className="mt-px ms-3 font-light text-gray-700 cursor-pointer select-none"
              htmlFor="check"
            >
              Zapamti me
            </label>
          </div>
          <Link href="/password-recovery" className="font-light text-picton-blue-500">
            Zaboravljena lozinka?
          </Link>
        </div>
        <button
          onClick={handleSubmit}
          className="mt-6 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
        >
          sign in
        </button>
        <p className="mt-3 text-blue-gray-500 lg:hidden">
          Nemate račun?{" "}
          <a href="#" className="text-picton-blue-500">
            Registrujte se.
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
