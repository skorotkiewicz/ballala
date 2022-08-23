import { useState } from "react";

const AddContact = ({ chat }) => {
  const [username, setUsername] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [info, setInfo] = useState("");

  return (
    <div>
      <p>Add contact</p>

      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Public Key"
          value={publicKey}
          onChange={(e) => setPublicKey(e.target.value)}
        />
      </div>

      <div>
        <button
          onClick={async () => {
            const add = await chat.addContact(username, publicKey);
            // setInfo(add);
            console.log(add);
          }}
        >
          Add contact
        </button>
      </div>

      <div>{info}</div>
    </div>
  );
};

export default AddContact;
