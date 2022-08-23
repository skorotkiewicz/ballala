import { useCallback, useEffect, useRef, useState } from "react";
// import reactLogo from "./assets/react.svg";
import "./App.scss";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

function App({ chat }) {
  const [username, setUsername] = useState("");

  const user = useRef(
    chat.gun.user().recall({ sessionStorage: true }, (e) => {
      // console.log(e);
    })
  );

  useEffect(() => {
    chat.gun.user(user.current?.is?.alias).once((e) => {
      user.current.alias = e.alias;

      setUsername(e.alias);
    });
  }, [user.current]);

  // mm55mm55
  // mm66mm66

  // qqqwwweee
  // qweqweqwe
  // console.log(user);
  // useEffect(() => {
  //   setIsLogged(true);
  //   // user.current = chat.gun.user().recall({ sessionStorage: true });
  // }, [user.current]);

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
