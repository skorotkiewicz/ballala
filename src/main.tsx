import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UnstoppableChat from "./lib";

const chat = new UnstoppableChat(
  "http://localhost:8765/gun",
  // "https://grizzly.de1.hashbang.sh/gun",
  "grizzly.crypto"
);

// "https://grizzly.de1.hashbang.sh/gun",
// "https://gun-manhattan.herokuapp.com/gun",

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App chat={chat} />
  </React.StrictMode>
);
