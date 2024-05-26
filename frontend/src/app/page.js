"use client"
import axios from 'axios';
import { useEffect, useState } from 'react';

const PwRecovery = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true })
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>{user.ime}</h1>
    </div>
  );
};

export default PwRecovery;
