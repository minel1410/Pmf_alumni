"use client";

import {useState, useEffect} from 'react'
import { motion } from "framer-motion";
import Progress from "./components/progress";
import "../auth.css";
import Tag from "./components/tag";
import axios from 'axios'

const App = () => {
  const [interests, setInterests] = useState([]); 
const[tags, setTags] = useState([])
const[user, setUser] = useState({})

 useEffect(() => {
    async function fetchTags() {
      try {
        const response = await axios.get("http://localhost:8000/auth/tags");
        if (response.status === 200) {
          setTags(response.data);
          console.log(response.data);
        } else {
          console.error("Neuspješan zahtjev za tagovima");
        }
      } catch (error) {
        console.error("Greška prilikom dohvatanja tagova:", error);
      }
    }

    async function fetchUser() {
      try {
        const response = await axios.get("http://localhost:8000/auth/get_cookies");
        if (response.status === 200) {
          setUser(response.data);
          console.log(response.data);
        } else {
          console.error("Neuspješan zahtjev za userom");
          window.location.href = '/auth'
        }
      } catch (error) {
        console.error("Greška prilikom dohvatanja usera:", error);
        window.location.href = '/auth'
      }
    }

    fetchTags();
    fetchUser();
  }, []);
  // Funkcija za ažuriranje stanja interesa
  const handleTagClick = (id) => {
    if (!interests.includes(id)) {
      setInterests([...interests, id]); // Dodaj novi interes u niz
    } else {
      setInterests(interests.filter((interest) => interest !== id)); // Ukloni interes iz niza
    }
    console.log(interests)
  };

  /* async handleSubmit () {

    try{
      await axios.post("http;//localhost:8000/auth/interests-post")
    }catch (error) {
        console.error("Greška prilikom dohvatanja usera:", error);
        window.location.href = '/auth'
      }
  } */


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full h-full md:h-4/5 relative bg-white overflow-hidden  sm:rounded-lg flex flex-col justify-start items-start"
    >
      <Progress step={2}></Progress>
      <div className="px-16 h-full w-full flex justify-center items-center">
        <div className='flex flex-wrap gap-3'>
  {tags.map(tag => (
    <Tag key={tag.tag_id} text={tag.naziv} onTagClick={handleTagClick} id={tag.tag_id}></Tag>
  ))}
  <button
          type="submit"
          className="mt-24 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-picton-blue-500/10 hover:shadow-lg hover:shadow-picton-blue-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
          onClicke = {handleSubmit}
        >
          Sign up
        </button>
</div>

      </div>
    </motion.div>
  );
};

export default App;
