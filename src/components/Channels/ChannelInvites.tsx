const ChannelInvites = ({ channelInvites, chat }) => {
  return (
    <div>
      <h1>Channel Invites</h1>
      {channelInvites.map((channelInvite, key) => (
        <div key={key}>
          <button
            onClick={async () => {
              await chat.acceptChannelInvite(channelInvite);
              console.log(channelInvite);
            }}
          >
            Accept
          </button>
          <button
            onClick={async () => {
              await chat.denyChannelInvite(channelInvite);
            }}
          >
            Deny
          </button>
        </div>
      ))}
    </div>
  );
};

export default ChannelInvites;
