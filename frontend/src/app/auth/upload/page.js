"use client";

import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import "../auth.css";
import Progress from '../interests/components/progress';
import axios from 'axios';

const App = () => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState({ error: false, text: "" });
  const [selectedFile, setSelectedFile] = useState("No file chosen");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
        } else {
          window.location.href = '/auth';
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = '/auth';
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setSelectedFile(event.target.files[0].name);
  };

  const handleSubmit = async () => {
  if (!image) {
    setError({
      error: true,
      text: "Molimo prikacite sliku"
    });
  } else {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('user', JSON.stringify(user));

      const response = await axios.post(
        "http://localhost:8000/auth/diploma-upload",
        formData,
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location.href = '/';
      } else {
        window.location.href = '/auth';
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError({
          error: true,
          text: "Dozvoljeni formati su jpg, jpeg, png, svg, heic"
        });
      } else {
        console.error('Error:', error.response ? error.response.data : error.message);
        window.location.href = '/auth';
      }
    }
  }
};


  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="container w-full h-full md:h-4/5 relative bg-white overflow-hidden sm:rounded-lg flex flex-col justify-start items-start"
    >
      <Progress step={3} />
      <div className="px-16 h-full w-full flex justify-center items-center">
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-10"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG, HEIC or GIF
                </p>
                <p className="text-md mt-2 text-gray-500 dark:text-gray-400">
                  {selectedFile}
                </p>
              </div>
              <input
                id="dropzone-file"
                type="file"
                name="diploma"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-24 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-sm py-4 px-6 rounded-lg bg-picton-blue-500 text-white shadow-md shadow-picton-blue-500/10 hover:shadow-lg hover:shadow-picton-blue-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none block w-full"
            onClick={handleSubmit}
          >
            dalje
          </button>
          {error.error && <p className="text-red-500">{error.text}</p>}
        </div>
      </div>
    </motion.div>
  );
};

export default App;
