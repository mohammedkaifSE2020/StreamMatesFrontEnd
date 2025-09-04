import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";

import ChatLoader from "../components/ChatLoader";
import CallButton from "../components/CallButton";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

function ChatPage() {

  const { id: targetUserId } = useParams();

  const [channel, setChannel] = useState<any>(null);
  const [chatClient, setChatClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  const { authdata: authuser } = useAuthUser();

  const { data: streamToken } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authuser,
  })

  useEffect(() => {
    const initChat = async () => {
      if (!streamToken || !authuser) return;

      try {
        const client = StreamChat.getInstance(STREAM_API_KEY);

        const channelid = [authuser._id, targetUserId].sort().join("-");

        await client.connectUser({
          id: authuser._id,
          name: authuser.username,
          image: authuser.avatar
        }, streamToken.token);

        const currChannel = client.channel("messaging", channelid, {
          members: [authuser._id, targetUserId]
        })

        setChannel(currChannel);
        setChatClient(client);

        await currChannel.watch();

        setLoading(false);


      } catch (error) {
        console.error("Error initializing chat:", error);
        toast.error("Could not connect to chat. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    initChat();
  }, [streamToken, authuser, targetUserId])

  const videoCall = () => {
    if (channel) {
      const callUrl = `${window.location.origin}/call/${channel.id}`;

      channel.sendMessage({
        text: `Join me for a video call : ${callUrl}`
      })

      toast.success("Call link sent in chat")
    }
  }
  if (loading || !chatClient || !channel) return <ChatLoader />;

  return (
    <div className="h-[93vh]">
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className="w-full relative">
            <CallButton handleVideoCall={videoCall} />
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput focus />
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage