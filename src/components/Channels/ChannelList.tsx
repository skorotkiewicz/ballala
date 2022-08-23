import { useEffect, useState, useRef } from "react";
import Channel from "./Channel";
import ChannelInvites from "./ChannelInvites";
import CreateChannel from "./CreateChannel";

const ChannelList = ({ chat, setWindow }) => {
  const [channels, setChannels] = useState([]);
  const [channelInvites, setChannelInvites] = useState([]);
  const loaded = useRef(false);

  const channelHandler = async () => {
    const channelsListener = await chat.loadChannels();
    const channelInvitesListener = await chat.loadChannelInvites();

    channelsListener.on((channels) => {
      console.log(channels);
      setChannels(channels);
    });

    channelInvitesListener.on((channelInvites) => {
      setChannelInvites(channelInvites);

      //   for (const channelInvite of channelInvites) {
      //     chat.acceptChannelInvite(channelInvite) ||
      //       chat.denyChannelInvite(channelInvite);
      //   }
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
      <ChannelInvites channelInvites={channelInvites} chat={chat} />
      <Channel channels={channels} setWindow={setWindow} chat={chat} />
    </div>
  );
};

export default ChannelList;
