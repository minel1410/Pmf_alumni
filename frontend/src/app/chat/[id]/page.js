"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import ToastProvider from "@/app/components/Toast/ToastProvider";
import ChatBubble from "../components/ChatBubble";

export default function Main() {
  const [user, setUser] = useState({});
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const pathname = usePathname();
  const segments = pathname.split("/");
  const id = segments[segments.length - 1];
  const [socket, setSocket] = useState(null);

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
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:8000/chat/messages", {
          params: { id1: id, id2: 62 }
        });
        if (response.status === 200) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchMessages();
  }, [id, user]);

  useEffect(() => {
    if (user.id) {
      const ws = new WebSocket(`ws://localhost:8000/chat/ws/${user.id}`);
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      setSocket(ws);
      return () => ws.close();
    }
  }, [user.id]);

  const handleSendMessage = async () => {
    try {
      await axios.post("http://localhost:8000/chat/messages", {
        posiljalac_id: 62,
        primalac_id: 61,
        tekst_poruke: newMessage,
      });
      setNewMessage("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ToastProvider>
      <div className="w-full rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-picton-blue-500 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="relative">
              <span className="absolute text-green-500 right-0 bottom-0">
                <svg width="20" height="20">
                  <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                </svg>
              </span>
              <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" className="w-16 h-16 rounded-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-white font-md">Minel Salihagić</p>
              <p className="font-sm text-gray-400">062584050</p>
            </div>
          </div>
          <div>
            <FeatherIcon icon="trash-2" className="w-8 h-8 text-white"></FeatherIcon>
          </div>
        </div>
        <div className="bg-white p-8 flex flex-col gap-3 overflow-y-scroll overflow-x-clip h-[75vh]">
          {messages.map((message, index) => (
            <ChatBubble
              key={index}
              viewer={user["id"]}
              sender={message.posiljalac_id}
              receiver={message.primalac_id}
              name="Minel Salihagic"
              content={message.tekst_poruke}
              time={message.datum_slanja}
            />
          ))}
        </div>
        <div className="w-full p-3">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-300 rounded-md py-3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                onClick={handleSendMessage}
              >
                <span className="font-bold">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-6 w-6 ml-2 transform rotate-90">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </ToastProvider>
  );
}
