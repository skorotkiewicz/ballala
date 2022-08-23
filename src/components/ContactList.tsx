import { useEffect, useState } from "react";
import AddContact from "./AddContact";

const ContactList = ({ chat, setWindow }) => {
  //   const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactsInvites, setContactsInvites] = useState([]);
  let contactsId = [];
  let contactsInvitesId = [];

  const contactHandler = async () => {
    const contactsListener = await chat.loadContacts();
    const contactInvitesListener = await chat.loadContactInvites();

    // console.log(await chat);

    contactsListener.on(async (contacts) => {
      setContacts(contacts);

      //   for (const contact of contacts) {
      //     if (!contactsId.includes(contact.pubKey)) {
      //       setContacts((prev) => [...prev, contact]);
      //       contactsId.push(contact.pubKey);
      //     }
      //   }

      // for (const contact of contacts) {
      //   const contactMessagesListener = await chat.loadMessagesOfContact(
      //     contact.pubKey,
      //     contact.name
      //   );
      //   contactMessagesListener.on((messages) => {});
      // }
    });

    contactInvitesListener.on((contactInvites) => {
      setContactsInvites(contactInvites);

      // console.log(contactInvites);

      //   for (const contactInvite of contactInvites) {
      //     if (!contactsInvitesId.includes(contactInvite.pubKey)) {
      //       setContactsInvites((prev) => [...prev, contactInvite]);
      //       contactsInvitesId.push(contactInvite.pubKey);
      //     }
      //   }

      // for (const contactInvite of contactInvites) {
      //     chat.acceptContactInvite(
      //         contactInvite.alias,
      //         contactInvite.pubKey,
      //         contactInvite.name,
      //     );
      // }
    });
  };

  useEffect(() => {
    contactHandler();
  }, []);

  return (
    <div>
      <AddContact chat={chat} />

      <div>
        <h1>Contact Invites</h1>
        {contactsInvites.map((contactInvite, key) => (
          <div key={key}>
            {/* <strong>{contactInvite.alias}</strong> */}
            {/* <p>{contactInvite.pubKey}</p> */}
            <button
              onClick={async () => {
                await chat.acceptContactInvite(
                  contactInvite.alias,
                  contactInvite.pubKey
                );

                // chat.addContact(contactInvite.alias, contactInvite.pubKey);
              }}
            >
              Accept {contactInvite.alias}
            </button>
            <button
              onClick={async () => {
                await chat.denyContactInvite(contactInvite.pubKey);
              }}
            >
              Deny {contactInvite.alias}
            </button>
          </div>
        ))}
      </div>
      <div>
        <h1>Contacts</h1>
        {contacts.map((contact, key) => (
          <div key={key}>
            <p>{contact.alias}</p>
            <p>{contact.pubKey}</p>

            <div>
              <button
                onClick={() => {
                  setWindow(contact.pubKey);
                }}
              >
                Chat with {contact.alias}
              </button>
            </div>
            <div>
              <button
                onClick={async () => {
                  await chat.removeContact(contact.pubKey);
                }}
              >
                Remove {contact.alias} from contacts
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
