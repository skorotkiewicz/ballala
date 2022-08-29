import { useEffect, useRef, useState } from "react";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import { useData } from "./contexts/DataContext";

function App({ chat }) {
  const [username, setUsername] = useState("");
  const user = useRef(null);
  const { auth } = useData();

  const authHandler = async () => {
    const bck = await chat.authBack();
    if (bck) {
      user.current = { is: bck };
      setUsername(bck.alias);
    }
  };

  useEffect(() => {
    authHandler();
  }, [auth]);

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
