import { useState, useEffect, useCallback, useRef } from "react";

const ChatWindow = ({ chat, publicKey }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const loaded = useRef(null);

  const messagesHandler = async () => {
    const contactMessagesListener = await chat.loadMessagesOfContact(publicKey);
    contactMessagesListener.on((messages) => {
      // setMessages(prev => [...prev, messages])
      setMessages(messages);
    });
  };

  const send = useCallback(async () => {
    await chat.sendMessageToContact(publicKey, message);
    setMessage("");
  }, [message]);

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
          //   <div>{console.log(message)}</div>
          <div key={key}>
            <small>{message.time}</small> <small>{message.owner}</small>{" "}
            <p>{message.msg}</p>{" "}
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
