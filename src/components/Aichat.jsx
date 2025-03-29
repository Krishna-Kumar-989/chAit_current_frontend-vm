import React, { useState, useEffect, useRef, useLayoutEffect ,useContext} from "react";
import "./ChatArea.css";
import Sidebar from "./sidebar";
import { io } from "socket.io-client";
import Cookies from "js-cookie";
import { FiAlignLeft, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { SelectedcontactContext } from '../context/SelectedcontactContext';




const ChatArea = () => {





const { loginuser } = useContext(SelectedcontactContext);



// Current login user
const currentLoginUserId = loginuser;//localStorage.getItem("login_user");
console.log("logged in user is:+"+loginuser);



  const [message, setMessage] = useState(""); // Message being typed
  const [messages, setMessages] = useState([]); // List of chat messages

  const [selectedContact, setSelectedContact] = useState(null);

  const [oldmessages, setoldmessages] = useState([]);

  const [loadingOldMessages, setLoadingOldMessages] = useState(true); // Loading state

  const [selectedcontactname, setselectedcontactname] = useState(null);

  const [isVisible, setIsvisible] = useState(false);

  const [isVisibleinfo, setIsvisibleinfo] = useState(false);

  const navigate = useNavigate();


  
  const { selectedcontextContact } = useContext(SelectedcontactContext);
  




  


  useEffect(() => {
    // Set selected contact and name from context when it changes
    if (selectedcontextContact) {
     console.log("this is context :" + JSON.stringify(selectedcontextContact))

      setSelectedContact(selectedcontextContact.reference);
      setselectedcontactname(selectedcontextContact.username);
    }
  }, [selectedcontextContact]); // Only re-run when selectedcontextContact changes






















  const handleSelectedContact = (contactId) => {
    // setSelectedContact(contactId.reference);
    // setselectedcontactname(contactId.username);
    // console.log("Updated selected contact in parent:", contactId);
  };



  useLayoutEffect(() => {
    const timer = setTimeout(() => {
      setMessages([]);
      setLoadingOldMessages(true);

      const oldChats = JSON.parse(localStorage.getItem("old_chats")) || [];

      // Map the oldChats array to a new format
      const dispmsg = oldChats.map((chat) => ({
        message: chat.message,
        messagetype: chat.messagetype,
        senderId: chat.sender,
        recipientId: chat.reciever,
      }));

      setoldmessages(dispmsg);
      console.log("messages added to old" + loadingOldMessages);
      setLoadingOldMessages(false); // Set loading to false after fetching messages
      //setMessages([]); // Clear messages when changing contacts
    }, 90);
  }, [selectedcontextContact]);

  const socket = useRef(null); // Store socket instance using useRef

  const reciever = selectedcontextContact.reference;



  useEffect(() => {
    // Initialize socket connection
    socket.current = io("http://localhost:3001/chat", {
      autoConnect: false,
      query: { token: Cookies.get("authToken") },
    });

    // Connect to the socket
    socket.current.connect();

    // Register the user to the socket after connection
    socket.current.on("connect", () => {
      console.log("Chat socket connected");
      socket.current.emit("register", currentLoginUserId);
    });

    // Listen for incoming chat messages
    socket.current.on("chat_to_server", (receivedMessage) => {
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    });

    // Cleanup on component unmount
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);





async 
















  // Handle sending a message
  const handleSend = () => {













    
    
// Current login user
const currentLoginUserId = loginuser;//localStorage.getItem("login_user");











    if (message.trim() !== "") {
      console.log("Sending message:", message);

      const sent_json_chat = {
        messagetype: "text",
        message: message,
        senderId: currentLoginUserId,
        recipientId: reciever,
      };

      // Emit the message to the server
      socket.current.emit("chat_to_server", sent_json_chat);

      // Optionally add the sent message to the UI immediately
      setMessages((prevMessages) => [
        ...prevMessages,
        { ...sent_json_chat, message },
      ]);
      setMessage(""); // Clear the input field after sending
    }
  };

















  return (
    <div className="container">
      {isVisible && <Sidebar />}

      <div className="chat-area">
        <div className="topchatbar">
          <button
            className="showsidebar"
            onClick={() => {
              setIsvisible((prevstate) => !prevstate);
            }}
          >
            <FiAlignLeft size ={20}/>{" "}
          </button>

          <h3 className="chatheader">{selectedcontextContact.username}</h3>

          <button
            className="showsidebar"
            onClick={() => {
              navigate("/contactinfo");
            }}
          >
            <FiInfo  size = {20}/>
          </button>
        </div>

        <div className="chatlistview">
          <ul className="messages">
            {oldmessages.map((msg, index) => (
              <li
                key={index}
                className={
                  msg.senderId === currentLoginUserId
                    ? "message-sent"
                    : msg.recipientId === currentLoginUserId
                      ? "message message-received"
                      : "message"
                }
              >
                <div className="sender">
                  {msg.senderId === currentLoginUserId
                    ? "You"
                    : msg.senderId === selectedcontextContact.reference
                      ? selectedcontextContact.username
                      : ""}
                </div>

                {(msg.senderId === currentLoginUserId ||
                  msg.recipientId === currentLoginUserId) && (
                  <div className="text">{msg.message}</div>
                )}
              </li>
            ))}

            {messages.map((msg, index) => (
              <li
                key={index}
                className={
                  msg.senderId === currentLoginUserId
                    ? "message-sent"
                    : msg.recipientId === currentLoginUserId
                      ? "message message-received"
                      : "message"
                }
              >


                <div className="sender">
                  {msg.senderId === currentLoginUserId
                    ? "You"
                    : msg.senderId ===  selectedcontextContact.reference
                      ? selectedcontextContact.username
                      : ""}
                </div>

                {(msg.senderId === currentLoginUserId ||
                  msg.recipientId === currentLoginUserId) && (
                  <div className="text">{msg.message}</div>
                )}
              </li>
            ))}
          </ul>
        </div>


        <div className="message-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="minputarea"
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;
