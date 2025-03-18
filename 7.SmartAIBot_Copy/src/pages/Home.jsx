import React, { useContext, useState, useEffect, useRef } from "react";
import "../App.css";
import { FaArrowUpLong } from "react-icons/fa6";
import { dataContext } from "../context/UserContext";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function Home() {
  const { input, setInput } = useContext(dataContext);
  const [chatHistory, setChatHistory] = useState([]);
  const currentMessageRef = useRef(""); // Store message state in a ref

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("response", (message) => {
      console.log("Received message chunk:", message);
      currentMessageRef.current += message; // Append message chunk properly
      setChatHistory((prevHistory) => {
        // Ensure last message is updated in real-time
        const updatedHistory = [...prevHistory];
        if (
          updatedHistory.length > 0 &&
          updatedHistory[updatedHistory.length - 1].sender === "bot"
        ) {
          updatedHistory[updatedHistory.length - 1].text = currentMessageRef.current;
        } else {
          updatedHistory.push({ sender: "bot", text: message });
        }
        return updatedHistory;
      });
    });

    socket.on("message_complete", () => {
      console.log("Message complete");
      currentMessageRef.current = ""; // Reset the message after completion
    });

    return () => {
      socket.off("connect");
      socket.off("response");
      socket.off("message_complete");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setChatHistory((prevHistory) => [...prevHistory, userMessage]);
    setInput("");

    currentMessageRef.current = ""; // Reset before starting a new message
    socket.emit("message", input);
  };

  return (
    <div className="home">
      <nav>
        <div className="logo">TourBOT</div>
      </nav>
      <div className="chat-container">
        {chatHistory.map((message, index) => (
          <div key={index} className="message-wrapper">
            <div className={`message ${message.sender}`}>{message.text}</div>
          </div>
        ))}
      </div>
      <form className="input-box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ask Something..."
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button type="submit">
          <FaArrowUpLong />
        </button>
      </form>
    </div>
  );
}

export default Home;
