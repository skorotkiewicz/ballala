import {} from "react";
import { useState, useEffect, useCallback, useRef } from "react";

const ChatWindowChannel = ({ window, chat }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const loaded = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const channelMessagesHandler = async () => {
    const channelMessagesListener = await chat.loadMessagesOfChannel(window);

    channelMessagesListener.on((messages) => {
      console.log(messages);
      setMessages(messages);
      scrollToBottom();
    });
  };

  const send = useCallback(async () => {
    await chat.sendMessageToChannel(window, message, {
      action: "join",
      alias: chat.gun.user().alias,
      pubKey: chat.gun.user().is.pub,
      name: "grizzly.crypto",
    });

    setMessage("");
  }, [message]);

  useEffect(() => {
    loaded.current !== window.key && channelMessagesHandler();
    loaded.current = window.key;
  }, [window]);

  return (
    <div>
      <div className="ChatWindow">
        <h2>
          Channel {window.name} - {window.isPrivate ? "Private" : "Public"}
        </h2>

        <div>
          <details style={{ float: "right" }}>
            <summary>Actions</summary>
            <button
              onClick={async () => {
                await chat.leaveChannel(window);
              }}
            >
              Leave channel
            </button>
          </details>
        </div>

        <div className="msgs">
          {messages.map((message, key) => (
            <div key={`${key}-messages`}>
              <small>{message.time}</small>{" "}
              <small>{message.peerInfo.alias}</small> <p>{message.msg}</p>
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
    </div>
  );
};

export default ChatWindowChannel;
