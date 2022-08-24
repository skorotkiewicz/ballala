import { useState, useRef, useEffect } from "react";

const PublicChannels = ({ chat, setWindow }) => {
  const [channels, setChannels] = useState([]);
  const loaded = useRef(false);

  const channelMessagesHandler = async () => {
    const publicChannels = await chat.loadPublicChannels();

    publicChannels.on((channels) => {
      setChannels([...channels]);
    });
  };

  useEffect(() => {
    !loaded.current && channelMessagesHandler();
    loaded.current = true;
  }, []);

  return (
    <div>
      <h1>Public Channels</h1>

      <div className="publicChannels-list">
        {channels.map((channel, key) => (
          <div key={key}>
            <div>{channel.name}</div>
            <div>
              <button
                onClick={() => {
                  chat.joinPublicChannel(channel);
                  setWindow(channel);
                }}
              >
                Join
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicChannels;
