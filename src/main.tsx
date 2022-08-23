import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UnstoppableChat from "./lib";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const chat = new UnstoppableChat(
  "http://localhost:8765/gun",
  // "https://grizzly.de1.hashbang.sh/gun",
  "grizzly.crypto"
);

// "https://grizzly.de1.hashbang.sh/gun",
// "https://gun-manhattan.herokuapp.com/gun",

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<App chat={chat} />} />

        <Route path="/channel" element={<Channel />} />
        <Route path="/channel/:channelId" element={<Channel />} />

        <Route
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>There's nothing here!</p>
            </main>
          }
        />
      </Routes>
    </BrowserRouter> */}
    <App chat={chat} />
  </React.StrictMode>
);
