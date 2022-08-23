import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App({ chat }) {
  const [username, setUsername] = useState("");

  const user = useRef(
    chat.gun.user().recall({ sessionStorage: true }, (e) => {})
  );

  useEffect(() => {
    chat.gun.user(user.current?.is?.alias).once((e) => {
      user.current.alias = e.alias;

      setUsername(e.alias);
    });
  }, [user.current]);

  return (
    <div className="App">
      {username ? (
        <Dashboard chat={chat} user={user.current} />
      ) : (
        <Login chat={chat} />
      )}
    </div>
  );
}

export default App;
