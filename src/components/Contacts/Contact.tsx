import { truncate } from "../../lib/util";

const Contact = ({ contacts, setWindow, chat }) => {
  return (
    <div>
      <h1>Contacts</h1>
      {contacts.map((contact, key) => (
        <div
          className="Contact"
          key={key}
          onClick={() => {
            setWindow(contact.pubKey);
          }}
        >
          <div className="avatar">XXX</div>
          <div className="box">
            <p className="b-name">{contact.alias}</p>
            <p className="b-pubkey">{truncate(contact.pubKey, 10, 10, 40)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact;
