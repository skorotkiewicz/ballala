import { useState } from "react";

const CreateChannel = ({ chat }) => {
  const [channelName, setChannelName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  async function create() {
    await chat.createChannel(channelName, isPrivate);
  }

  return (
    <div>
      <h1>Create Channel </h1>
      <div>
        <input
          type="text"
          placeholder="New channel name"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
      </div>

      <div>
        <label>
          Private channel
          <input
            type="checkbox"
            defaultChecked={isPrivate}
            onChange={() => setIsPrivate((prev) => !prev)}
          />
        </label>
      </div>

      <div>
        <button onClick={create}>Create Channel</button>
      </div>
    </div>
  );
};

export default CreateChannel;
