import { useState } from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";

const Dashboard = ({ chat, user }) => {
  const [window, setWindow] = useState("");
  const [menu, setMenu] = useState(0);

  // console.log(user);

  return (
    <div className="Dashboard">
      <main>
        <div>{user.is.pub}</div>
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

        {window && (
          <div>
            <ChatWindow chat={chat} publicKey={window} />
          </div>
        )}
      </main>

      <aside>
        <div style={{ display: menu === 0 ? "block" : "none" }}>
          <ContactList chat={chat} setWindow={setWindow} />
        </div>

        <div>
          <span onClick={() => setMenu(0)}>Contacts</span>
          <span onClick={() => setMenu(1)}>Group Chats</span>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
