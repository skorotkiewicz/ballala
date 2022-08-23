import { useEffect, useState, useRef } from "react";
import AddContact from "./AddContact";
import Contact from "./Contact";
import ContactInvites from "./ContactInvites";

const ContactList = ({ chat, setWindow }) => {
  //   const [messages, setMessages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [contactsInvites, setContactsInvites] = useState([]);
  let contactsId = [];
  let contactsInvitesId = [];
  const loaded = useRef(false);

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
    !loaded.current && contactHandler();
    loaded.current = true;
  }, []);

  return (
    <div>
      <AddContact chat={chat} />
      <ContactInvites contactsInvites={contactsInvites} chat={chat} />
      <Contact contacts={contacts} setWindow={setWindow} chat={chat} />
    </div>
  );
};

export default ContactList;
