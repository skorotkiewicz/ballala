import { useState } from "react";
import ChatWindow from "./Contacts/ChatWindow";
import ContactList from "./Contacts/ContactList";
import ChannelList from "./Channels/ChannelList";
import ChatWindowChannel from "./Channels/ChatWindowChannel";

const Dashboard = ({ chat, user }) => {
  const [window, setWindow] = useState<any>(null);
  const [menu, setMenu] = useState(0);

  return (
    <div className="Dashboard">
      <main>
        <div>
          <small>{user.is.pub}</small>
        </div>
        <div>{user.alias}</div>

        <div>
          <button
            onClick={() => {
              chat.logout();
            }}
          >
            Logout
          </button>
        </div>

        {window?.kind === "channel" && (
          <ChatWindowChannel chat={chat} window={window} />
        )}

        {window && window?.kind !== "channel" && (
          <ChatWindow chat={chat} publicKey={window} />
        )}
      </main>

      <aside>
        <div style={{ display: menu === 0 ? "block" : "none" }}>
          <ContactList chat={chat} setWindow={setWindow} />
        </div>
        <div style={{ display: menu === 1 ? "block" : "none" }}>
          <ChannelList chat={chat} setWindow={setWindow} />
        </div>

        <div>
          <span
            onClick={() => {
              setMenu(0);
              setWindow(null);
            }}
          >
            Contacts
          </span>
          <span
            onClick={() => {
              setMenu(1);
              setWindow(null);
            }}
          >
            Channels
          </span>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
