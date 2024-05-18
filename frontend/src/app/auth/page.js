"use client";
import "./auth.css";
import React, { useEffect } from "react";
import axios from "axios";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { motion } from "framer-motion"

const Authentication = () => {



  const signUpButtonRef = React.createRef();
  const signInButtonRef = React.createRef();
  const containerRef = React.createRef();

  React.useEffect(() => {
    const signUpButton = signUpButtonRef.current;
    const signInButton = signInButtonRef.current;
    const container = containerRef.current;

    signUpButton.addEventListener("click", () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener("click", () => {
      container.classList.remove("right-panel-active");
    });

    return () => {
      signUpButton.removeEventListener("click", () => {});
      signInButton.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
      className="container w-full h-full md:h-4/5 relative overflow-hidden bg-white sm:rounded-lg"
      id="container"
      ref={containerRef}
    >
      <SignUp></SignUp>
      <SignIn></SignIn>
      <div className="overlay-container w-4/5 h-screen hidden lg:block">
        <div className="overlay">
          <div className="overlay-panel overlay-left px-8 py-4">
            <div className="flex items-end gap-2">
              <img
                className=""
                src="/logo/pmf_svg.svg"
                alt="PMF Logo"
                width={50}
                height={50}
              />
              <p className="text-white text-xl p-0 text-left">
                Alumni Prirodno-matematičkog fakulteta Univerziteta u Sarajevu
              </p>
            </div>
            <div className="flex flex-col justify-center items-center h-5/6 px-8">
              <p className="text-white text-3xl font-bold mb-5 text-center">
                Dobrodošli nazad!
              </p>
              <p className="text-center text-white text-md">
                Da biste mogli imati pristup personalizovanom sadržaju molimo da
                se prijavite sa ličnim podacima
              </p>
              <button
                className="ghost mt-8 p-4 border border-white w-4/6 text-white text-xl rounded-full hover:bg-white hover:text-picton-blue-500 transition-all uppercase"
                id="signIn"
                ref={signInButtonRef}
              >
                PRIJAVA
              </button>
            </div>
          </div>

          <div className="overlay-panel overlay-right">
            <div className="flex flex-col justify-center items-center h-5/6 px-8">
              <p className="text-white text-3xl font-bold mb-5 text-center">
                Nemate račun?
              </p>
              <p className="text-center text-white text-md">
                Pridružite nam se i uživajte u personaliziranom iskustvu
                prilagođenom vašim potrebama
              </p>
              <button
                className="ghost mt-8 p-4 border border-white w-4/6 text-white text-xl rounded-full hover:bg-white hover:text-picton-blue-500 transition-all uppercase"
                id="signIn"
                ref={signUpButtonRef}
              >
                REGISTRACIJA
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Authentication;



