import { useState, React } from "react";
import Input from "../../components/Input";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    pwc: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    pwc: "",
  });
  const [successes, setSuccesses] = useState({
    name: false,
    lastname: false,
    email: false,
    password: false,
    pwc: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = {};
    const newSuccesses = {
      name: true,
      lastname: true,
      email: true,
      password: true,
      pwc: true,
    };

    if (!formData.name) {
      newErrors.name = "Polje ime je obavezno";
      valid = false;
      newSuccesses.name = false;
    }

    if (!formData.lastname) {
      newErrors.lastname = "Polje prezime je obavezno";
      valid = false;
      newSuccesses.lastname = false;
    }

    if (!formData.email) {
      newErrors.email = "Email je obavezan";
      valid = false;
      newSuccesses.email = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Unesite validnu email adresu";
      valid = false;
      newSuccesses.email = false;
    }

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
      }
    }

    if (!formData.pwc) {
      newErrors.pwc = "Polje confirm password je obavezno";
      valid = false;
      newSuccesses.pwc = false;
    }

    setSuccesses(newSuccesses);
    setErrors(newErrors);

    if (valid) {
      console.log(formData);
      axios
        .post("/login", formData)
        .then((response) => {
          setSuccesses(newSuccesses);
          setErrors(newErrors);
          console.log(response.data);
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
    <div className="form-container sign-up-container absolute top-0 h-full transition duration-500 ease-in-out -left-full w-full opacity-0 z-1 lg:left-0 lg:w-1/2">
      <form
        className="h-full flex flex-col items-center justify-center px-12 bg-white"
        onSubmit={handleSubmit}
      >
        <h1 className="mb-6 text-picton-blue-500 text-5xl font-bold font-mono">
          Sign up
        </h1>
        <Input
          label="Ime"
          type="text"
          name="name"
          onChange={handleChange}
          errorMessage={errors.name}
          error={errors.name}
          value={formData.name}
          success={successes.name}
        />
        <Input
          label="Prezime"
          type="text"
          name="lastname"
          onChange={handleChange}
          errorMessage={errors.lastname}
          error={errors.lastname}
          value={formData.lastname}
          success={successes.lastname}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={handleChange}
          errorMessage={errors.email}
          error={errors.email}
          value={formData.email}
          success={successes.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          onChange={handleChange}
          errorMessage={errors.password}
          error={errors.password}
          value={formData.password}
          success={successes.password}
        />
        <Input
          label="Confirm password"
          type="password"
          name="pwc"
          onChange={handleChange}
          errorMessage={errors.pwc}
          error={errors.pwc}
          value={formData.pwc}
          success={successes.pwc}
        />
        <button
          type="submit"
          className="mt-6 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
        >
          Sign up
        </button>
        <p className="mt-3 text-blue-gray-500 lg:hidden">
          Već imate račun? <a href="#">Prijavite se.</a>
        </p>
      </form>
    </div>
  );
};

export default SignUp