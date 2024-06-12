"use client"
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

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
                src={`http://localhost:8000/files/images/profile/${user_picture || ''}`}
                alt="user photo"
                className="w-16 h-16 rounded-full"
                />
            <div className="flex flex-col justify-around w-full">
                <div className="w-full flex justify-between items-center">
                    <p className="font-bold">{latest_message.primalac_ime + " " + latest_message.primalac_prezime}</p>
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

    return (
        <div>
            <div className="flex flex-col gap-3">
                {chats.map((chat, index) => (
                    <UserChat key={index} latest_message={chat} user_id={user.id} user_picture={chat.primalac_slika} primalac_id={user.primalac_id} posiljalac_id={user.posiljalac_id} />
                ))}
            </div>
        </div>
    );
}
