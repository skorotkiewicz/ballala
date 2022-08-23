import { useState } from "react";
import ChatWindow from "./ChatWindow";
import ContactList from "./ContactList";

const Dashboard = ({ chat, user }) => {
  const [window, setWindow] = useState("");

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
        <ContactList chat={chat} setWindow={setWindow} />
      </aside>
    </div>
  );
};

export default Dashboard;
