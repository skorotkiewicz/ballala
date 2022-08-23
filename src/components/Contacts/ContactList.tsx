import { useEffect, useState, useRef } from "react";
import AddContact from "./AddContact";
import Contact from "./Contact";
import ContactInvites from "./ContactInvites";

const ContactList = ({ chat, setWindow }) => {
  const [contacts, setContacts] = useState([]);
  const [contactsInvites, setContactsInvites] = useState([]);
  const loaded = useRef(false);

  const contactHandler = async () => {
    const contactsListener = await chat.loadContacts();
    const contactInvitesListener = await chat.loadContactInvites();

    contactsListener.on(async (contacts) => {
      setContacts(contacts);
    });

    contactInvitesListener.on((contactInvites) => {
      setContactsInvites(contactInvites);
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
