import { useState } from "react";

const AddContact = ({ chat }) => {
  const [userContact, setUserContact] = useState("");

  return (
    <div>
      <h1>Add Contact</h1>

      <div>
        <input
          type="text"
          placeholder="User ID"
          value={userContact}
          onChange={(e) => setUserContact(e.target.value)}
        />
      </div>

      <div>
        <button
          onClick={async () => {
            const uc = userContact.split("|||");
            await chat.addContact(uc[0], uc[1]);
          }}
        >
          Add contact
        </button>
      </div>
    </div>
  );
};

export default AddContact;
