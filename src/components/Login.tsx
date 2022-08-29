import { useState } from "react";
import { useData } from "./../contexts/DataContext";

const Login = ({ chat }) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [info, setInfo] = useState<any>({});
  const { setAuth } = useData();

  async function join(type: string) {
    let join: any;

    switch (type) {
      case "register":
        join = await chat.createUser(username, password);
        setAuth(join);
        break;

      case "login":
        join = await chat.join(username, password);
        setAuth(join);
        break;
    }

    if (join.err) setInfo({ status: "err", message: join.err });
  }

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button onClick={() => join("login")}>Login</button>
        <button onClick={() => join("register")}>Register</button>
      </div>
      <div>
        {info && info.status === "err" && (
          <span style={{ color: "red" }}>{info.message}</span>
        )}
      </div>
    </div>
  );
};

export default Login;
