import { useEffect, useState, useRef } from "react";
import Channel from "./Channel";
import ChannelInvites from "./ChannelInvites";
import CreateChannel from "./CreateChannel";
import { useData } from "../../contexts/DataContext";

const ChannelList = ({ chat }) => {
  const { setWindow } = useData();

  const [channels, setChannels] = useState([]);
  const [channelInvites, setChannelInvites] = useState([]);
  const loaded = useRef(false);

  const channelHandler = async () => {
    const channelsListener = await chat.loadChannels();
    const channelInvitesListener = await chat.loadChannelInvites();

    channelsListener.on((channels) => {
      setChannels([...channels]);
    });

    channelInvitesListener.on((channelInvites) => {
      setChannelInvites([...channelInvites]);
    });

    // chat.inviteToChannel(channel, username, publicKey, domainName);
    // chat.leaveChannel(channel);
  };

  useEffect(() => {
    !loaded.current && channelHandler();
    loaded.current = true;
  }, []);

  return (
    <div>
      <CreateChannel chat={chat} />
      <button onClick={() => setWindow("publicChannels")}>
        Public Channels
      </button>
      <ChannelInvites channelInvites={channelInvites} chat={chat} />
      <Channel channels={channels} setWindow={setWindow} />
    </div>
  );
};

export default ChannelList;
