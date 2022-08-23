const ContactInvites = ({ contactsInvites, chat }) => {
  return (
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
  );
};

export default ContactInvites;
