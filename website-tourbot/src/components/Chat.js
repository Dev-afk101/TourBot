import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import io from "socket.io-client";

// Connect to Flask-SocketIO server
const socket = io("http://127.0.0.1:5000");

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const lastBotIndexRef = useRef(null); // Track last bot message index

  useEffect(() => {
    socket.on("response", (chunk) => {
      console.log("Received chunk:", chunk); // Debugging

      setMessages((prevMessages) => {
        let updatedMessages = [...prevMessages];

        if (lastBotIndexRef.current !== null) {
          // Append to last bot message
          updatedMessages[lastBotIndexRef.current] = {
            ...updatedMessages[lastBotIndexRef.current],
            text: updatedMessages[lastBotIndexRef.current].text + chunk,
          };
        } else {
          // Create new bot message
          lastBotIndexRef.current = updatedMessages.length;
          updatedMessages.push({ text: chunk, sender: "bot", type: "text" });
        }

        console.log("Updated Messages:", updatedMessages); // Debugging
        return updatedMessages;
      });

      scrollToBottom();
    });

    socket.on("interactive_response", (data) => {
      console.log("Interactive Response Received:", data); // Debugging

      if (!data.places || !Array.isArray(data.places)) return; // Prevent errors
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", type: "interactive", data },
      ]);
      scrollToBottom();
    });

    socket.on("message_complete", () => {
      setTimeout(() => {
        lastBotIndexRef.current = null; // Reset after response is complete
      }, 100);
    });

    return () => {
      socket.off("response");
      socket.off("interactive_response");
      socket.off("message_complete");
    };
  }, []);

  const sendMessage = () => {
    const userMessage = input.trim();
    if (userMessage === "") return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, sender: "user", type: "text" },
    ]);
    setInput("");
    lastBotIndexRef.current = null; // Reset bot index so a new response is created
    socket.emit("message", userMessage);
    setTimeout(() => scrollToBottom(), 300); // Delayed smooth scroll
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Assistant</h2>
      </div>

      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.type === "text" ? (
              <span className="message-text">{msg.text}</span>
            ) : (
              <div className="interactive-response">
                <h3>📍 Recommended Places</h3>
                {msg.data.places.map((place, i) => (
                  <div key={i} className="place">
                    <img src={place.image} alt={place.name} className="place-img" />
                    <h4>{place.name}</h4>
                    <p>⭐ {place.review}</p>
                    <a href={place.location} target="_blank" rel="noopener noreferrer">
                      View on Google Maps
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-footer">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
