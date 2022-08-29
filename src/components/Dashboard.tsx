import { useState } from "react";
import ChatWindow from "./Contacts/ChatWindow";
import ContactList from "./Contacts/ContactList";
import ChannelList from "./Channels/ChannelList";
import ChatWindowChannel from "./Channels/ChatWindowChannel";
import PublicChannels from "./Channels/PublicChannels";
import { useData } from "../contexts/DataContext";

const Dashboard = ({ chat, user }) => {
  const [menu, setMenu] = useState(0);
  const { window, setWindow, setAuth } = useData();

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
              setAuth(null);
            }}
          >
            Logout
          </button>
        </div>

        {window === "publicChannels" && (
          <PublicChannels setWindow={setWindow} chat={chat} />
        )}

        {window?.kind === "channel" && (
          <ChatWindowChannel chat={chat} window={window} />
        )}

        {window &&
          window?.kind !== "channel" &&
          window !== "publicChannels" && (
            <ChatWindow chat={chat} publicKey={window} />
          )}
      </main>

      <aside>
        {/* <button onClick={() => chat.reset()}>Reset</button> */}

        <div style={{ display: menu === 0 ? "block" : "none" }}>
          <ContactList chat={chat} />
        </div>
        <div style={{ display: menu === 1 ? "block" : "none" }}>
          <ChannelList chat={chat} />
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
