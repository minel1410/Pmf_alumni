"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import FeatherIcon from "feather-icons-react";
import ToastProvider from "@/app/components/Toast/ToastProvider";
import ChatBubble from "../components/ChatBubble";

const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    if (isNaN(messageDate.getTime())) {
        return ""; // Vrati prazan string ako datum nije validan
    }

    const currentDate = new Date();

    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Poruka je poslana danas, samo prikažemo vrijeme
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // Poruka nije poslana danas, prikažemo datum i vrijeme
      const day = messageDate.getDate().toString().padStart(2, '0');
      const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
      const year = messageDate.getFullYear();
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${day}.${month}.${year}. ${hours}:${minutes}`;
    }
  };

export default function Main() {
  const [user, setUser] = useState({});
  const [chatWith, setChatWith] = useState({})
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true); 
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
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchChatWith = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/auth/user-info/${id}`);
        if (response.status === 200) {
          console.log("USER: ", response.data)
          setChatWith(response.data.korisnik);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchChatWith();
  }, [id]);


  useEffect(() => {
    if (user.id) {
      const fetchMessages = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/chat/messages?id1=${user.id}&id2=${id}`);
          setMessages(response.data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchMessages();

      const ws = new WebSocket(`ws://localhost:8000/chat/ws/${id}`);
      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === "new_message") {
          const receivedMessage = {
            tekst_poruke: message.message,
            posiljalac_id: message.sender_id,
            primalac_id: message.receiver_id,
            datum_slanja: new Date().toISOString(), // Promijenjeno iz datum_prijema u datum_slanja
          };
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        }
      };
      setSocket(ws);
      return () => ws.close();
    }
  }, [user.id, id]);

  const formatMessageTime = (timestamp) => {
    const messageDate = new Date(timestamp);
    if (isNaN(messageDate.getTime())) {
        return ""; // Vrati prazan string ako datum nije validan
    }

    const currentDate = new Date();

    if (
      messageDate.getDate() === currentDate.getDate() &&
      messageDate.getMonth() === currentDate.getMonth() &&
      messageDate.getFullYear() === currentDate.getFullYear()
    ) {
      // Poruka je poslana danas, samo prikažemo vrijeme
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    } else {
      // Poruka nije poslana danas, prikažemo datum i vrijeme
      const day = messageDate.getDate().toString().padStart(2, '0');
      const month = (messageDate.getMonth() + 1).toString().padStart(2, '0');
      const year = messageDate.getFullYear();
      const hours = messageDate.getHours().toString().padStart(2, '0');
      const minutes = messageDate.getMinutes().toString().padStart(2, '0');
      return `${day}.${month}.${year}. ${hours}:${minutes}`;
    }
  };

  const handleSendMessage = async () => {
    console.log("Sending message...");
    try {
      await axios.post("http://localhost:8000/chat/messages", {
        posiljalac_id: user.id,
        primalac_id: id,
        tekst_poruke: newMessage,
      });
      console.log("Message sent successfully.");
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <ToastProvider>
      <div className="w-full rounded-lg overflow-hidden">
        <div className="px-4 py-2 bg-picton-blue-500 flex items-center justify-between">
          <div className="flex gap-3 items-center">
            <div className="">
              <img 
              src={`http://localhost:8000/files/images/profile/id/${id}`}
              alt="" 
              className="w-16 h-16 rounded-full" />
            </div>
            <div className="flex flex-col">
              <p className="text-white font-md">{chatWith.ime + " " + chatWith.prezime}</p>
              <p className="font-sm text-gray-400">{chatWith.broj_telefona}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 flex flex-col gap-3 overflow-y-scroll overflow-x-clip h-[70vh]">
          {isLoading ? (
            <div role="status" className="w-full h-full items-center justify-center">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
</div>
          ) : (
            messages.map((message, index) => (
              <ChatBubble
                key={index}
                viewer={user.id}
                sender={message.posiljalac_id}
                receiver={message.primalac_id}
                name={chatWith.ime + " " + chatWith.prezime}
                content={message.tekst_poruke}
                time={formatMessageTime(message.datum_slanja)}
              />
            ))
          )}
        </div>
        <div className="w-full p-3">
          <div className="relative flex">
            <input
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-300 rounded-md py-3"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                }
              }}
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

