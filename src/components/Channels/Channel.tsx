import { truncate } from "../../lib/util";

const Channel = ({ channels, setWindow, chat }) => {
  return (
    <div>
      <h1>Channels</h1>

      {channels.map((channel, key) => (
        <div
          className="Channel"
          key={key}
          onClick={async () => {
            // await chat.joinPublicChannel(channel);
            console.log(channel);
            setWindow(channel);
          }}
        >
          <div className="avatar">
            {channel.isPrivate ? "Private" : "Public"}
          </div>
          <div className="box">
            <p className="b-name">
              {channel.name} <small>{channel.userCount} users</small>
            </p>
            <p className="b-pubkey">
              {truncate(channel.latestMsg || "", 10, 10, 40)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Channel;

// import { truncate } from "../../lib/util";

// const Contact = ({ contacts, setWindow, chat }) => {
//   return (
//     <div>
//       <h1>Contacts</h1>
//       {contacts.map((contact, key) => (
//         <div
//           className="Contact"
//           key={key}
//           onClick={() => {
//             setWindow(contact.pubKey);
//           }}
//         >
//           <div className="avatar">XXX</div>
//           <div className="box">
//             <p className="b-name">{contact.alias}</p>
//             <p className="b-pubkey">{truncate(contact.pubKey, 10, 10, 40)}</p>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Contact;
