import { useState, useEffect, useRef } from "react";
import { scrollToBottom } from "../../lib/util";

const ChatWindow = ({ chat, publicKey }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const loaded = useRef(null);
  const messagesEndRef = useRef(null);

  const messagesHandler = async () => {
    const contactMessagesListener = await chat.loadMessagesOfContact(publicKey);

    contactMessagesListener.on((messages) => {
      setMessages([...messages]);
    });
  };

  useEffect(() => {
    scrollToBottom(messagesEndRef);
  }, [messages]);

  async function send() {
    await chat.sendMessageToContact(publicKey, message);
    setMessage("");
  }

  useEffect(() => {
    loaded.current !== publicKey && messagesHandler();
    loaded.current = publicKey;
  }, []);

  return (
    <div className="ChatWindow">
      <h2>Messages</h2>

      <div>
        <details style={{ float: "right" }}>
          <summary>Actions</summary>
          <button
            onClick={async () => {
              await chat.removeContact(publicKey);
            }}
          >
            Remove user from contacts
          </button>
        </details>
      </div>

      <div>
        {messages.map((message, key) => (
          <div key={key}>
            <small>{message.time}</small>
            {/* <small>{message.owner}</small>{" "} */}
            <p>{message.msg}</p>
            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>

      <div>
        <div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div>
          <button onClick={send}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
