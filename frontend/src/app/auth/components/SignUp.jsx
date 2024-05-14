import { useState, useEffect, React } from "react";
import Input from "../../components/Input";
import axios from "axios";

const SignUp = () => {
  const [studies, setStudies] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/studies")
      .then((response) => {
        setStudies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  

  const[existingUser, setExistingUser] = useState(false)
  const uniqueDepartments = [
    ...new Set(studies.map((study) => study.naziv_odsjeka)),
  ];
  const [selectedDepartment, setSelectedDepartment] = useState("Odsjek za biologiju");

  const handleDepartmentChange = (e) => {
  const selectedDepartment = e.target.value;
  setSelectedDepartment(selectedDepartment);
  
  // Pronađite odabrani odjel u studies array
  const selectedDepartmentObject = studies.find((study) => study.naziv_odsjeka === selectedDepartment);

  // Ažurirajte form data s odjelom i resetirajte smjer na prazan string
  if (selectedDepartmentObject) {
    setFormData((prevState) => ({
  ...prevState,
  department_id: selectedDepartmentObject.odsjek_id,
  course_id: selectedDepartmentObject.odsjek_id === 1 ? 1 : 
             selectedDepartmentObject.odsjek_id === 2 ? 5 :
             selectedDepartmentObject.odsjek_id === 3 ? 11 :
             selectedDepartmentObject.odsjek_id === 4 ? 14 :
             selectedDepartmentObject.odsjek_id === 5 ? 16 :
             // Dodajte dodatne uvjete prema potrebi
             // Ako nijedan uvjet ne odgovara, možete postaviti neku drugu vrijednost ili ostaviti prazno
             null
}));

  } else {
    console.error("Odabrani odjel nije pronađen u studies nizu.");
  }
};
const handleCourseChange = (e) => {
  const selectedCourseId = parseInt(e.target.value);
  console.log(selectedCourseId);

  setFormData((prevState) => ({
    ...prevState,
    course_id: selectedCourseId
  }));
};



  const filteredStudies = studies.filter(
    (study) => study.naziv_odsjeka === selectedDepartment,
  );

  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    pwc: "",
    department_id: 1,
    course_id: 1
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
  // Ako je forma valjana, izvršite zahtjev prema serveru
  axios
    .post("http://localhost:8000/register", formData)
    .then((response) => {
      setSuccesses(newSuccesses);
      setErrors(newErrors);
    })
    .catch((error) => {
      console.error(error);
      // Provjerite grešku i postavite existingUser na true ako se radi o grešci da korisnik već postoji
      if (error.response && error.response.status === 409) {
        console.log("EVOGA")
        newErrors.email = "Korisnik sa datom email adresom već postoji"
       
        newSuccesses.email = false
        setErrors(newErrors)
        setSuccesses(newSuccesses);
         valid = false
      }
    });
} else {
  // Ako forma nije valjana, postavite odgovarajuće greške
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
        <div className="flex w-full gap-5">
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
        </div>
        <div className="relative h-10 my-3 w-full">
          <select
          name="department"
            value={selectedDepartment}
            onChange={handleDepartmentChange}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal
     text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
     placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 
     disabled:bg-blue-gray-50"
          >
            {uniqueDepartments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Naziv odsjeka
          </label>
        </div>
        <div className="relative h-10 my-3 w-full">
          <select
          name="course"
          onChange={handleCourseChange}
            className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal
     text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 
     placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 
     disabled:bg-blue-gray-50"
          >
            {filteredStudies.map((study) => (
              <option key={study.smjer_id} value={study.smjer_id}>
                {study.naziv_smjera}
              </option>
            ))}
          </select>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Smjer
          </label>
        </div>

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
        <p className={existingUser ? ("text-red-500") : ("hidden")}>
            Korisnik sa tom email adresom vec postoji
        </p>
      </form>
    </div>
  );
};

export default SignUp;
