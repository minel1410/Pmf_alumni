"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import Modal from "../components/Modal";
import Loader from "../components/Loader";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  
  const isToday = date.toDateString() === today.toDateString();
  
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  
  if (isToday) {
    return `${hours}:${minutes}`;
  } else {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Mjeseci su 0-indeksirani
    const year = date.getFullYear();
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
};

const UserChat = ({ latest_message, user_id, user_picture }) => {
    const formattedDate = formatDate(latest_message.datum_slanja);
    return (
        <Link href={user_id === latest_message.primalac_id ? `/chat/${latest_message.posiljalac_id}` : `/chat/${latest_message.primalac_id}`} className="w-full p-4 border shadow-md rounded-lg flex gap-5 hover:cursor-pointer">

                <img
                src={`http://localhost:8000/files/images/profile/id/${user_id === latest_message.primalac_id ? latest_message.posiljalac_id : latest_message.primalac_id}`}
                alt="user photo"
                className="w-16 h-16 rounded-full"
                />
            <div className="flex flex-col justify-around w-full">
                <div className="w-full flex justify-between items-center">
                    <p className="font-bold">{user_id === latest_message.primalac_id ? latest_message.posiljalac_ime + " " + latest_message.posiljalac_prezime : latest_message.primalac_ime + " " + latest_message.primalac_prezime}</p>
                    <p className="text-gray-500">{formattedDate}</p>
                </div>
                <div>
                    {latest_message.posiljalac_id === user_id ? (
                        <p className="text-gray-400">{latest_message.tekst_poruke}</p>
                    ) : (
                        <p className="font-bold">{latest_message.tekst_poruke}</p>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default function C() {
  const [user, setUser] = useState({});
  const [chats, setChats] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8000/auth/get_cookies", { withCredentials: true });
        if (response.status === 200) {
          setUser(response.data);
          console.log("EVO USER: ", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (user.id) {
      const fetchChats = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/chat/latest_chat?user_id=${user.id}`);
          if (response.status === 200) {
            setChats(response.data);
            console.log(response.data);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchChats();
    }
  }, [user.id]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/chat/all_user");
        if (response.status === 200) {
          setAllUsers(response.data);
          console.log("All Users: ", response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllUsers();
  }, []);

  const CustomDropdown = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
      window.location.href = `/chat/${option.value}`;
    };

    return (
      <div className="relative">
        <div
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-picton-blue-500 focus:border-2 focus:border-picton-blue-500 focus:border-t-transparent focus:outline-0"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption ? (
            <div className="flex items-center">
              <img src={`http://localhost:8000/files/images/profile/id/${selectedOption.value}`} alt={selectedOption.label} className="w-6 h-6 mr-2 rounded-full" />
              {selectedOption.label}
            </div>
          ) : (
            "Select an option"
          )}
          <span className="absolute right-2 top-2.5 text-blue-gray-500">{isOpen ? "▲" : "▼"}</span>
        </div>
        {isOpen && (
          <div className="absolute z-10 w-full bg-white border border-blue-gray-200 rounded-md mt-1 shadow-lg">
            {allUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center p-2 hover:bg-blue-gray-100 cursor-pointer"
                onClick={() => handleOptionClick({ value: user.id, label: `${user.ime} ${user.prezime}` })}
              >
                <img src={`http://localhost:8000/files/images/profile/id/${user.id}`} alt={`${user.ime} ${user.prezime}`} className="w-6 h-6 mr-2 rounded-full" />
                {user.ime} {user.prezime}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="absolute left-1/2 top-1/2"><Loader></Loader></div>;
  }

  return (
    <div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex flex-col gap-3 w-72">
          <p className="text-2xl font-bold">Započni novi razgovor</p>
          <div className="relative h-10 my-3 w-full">
            <CustomDropdown />
          </div>
        </div>
      </Modal>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-2xl font-bold">Razgovori sa korisnicima</p>
          <div
            onClick={() => setModalOpen(true)}
            className="p-2 border rounded-lg hover:cursor-pointer"
          >
            <FeatherIcon icon="plus" />
          </div>
        </div>
        {chats.map((chat, index) => (
          <UserChat
            key={index}
            latest_message={chat}
            user_id={user.id}
            user_picture={chat.primalac_slika}
            primalac_id={chat.primalac_id}
            posiljalac_id={chat.posiljalac_id}
          />
        ))}
      </div>
    </div>
  );
}