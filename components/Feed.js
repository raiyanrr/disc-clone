import { HashtagIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import MessageInput from "./MessageInput";
import { query, collection, orderBy, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

function Feed({ serverId }) {
  const router = useRouter();
  const channelId = router.query.channelID;

  const [messages, setMessages] = useState([]);
  const [channelName, setChannelName] = useState("");
  const lastMessageRef = useRef(null)

  function scrollToBottom(){
    lastMessageRef.current?.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])


  useEffect(() => {
    if (!channelId) return;

    const q = query(
      collection(db, "servers", serverId, "channels", channelId, "messages"),
      orderBy("timestamp", "asc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs);
    });

    return unsub;
  }, [serverId, channelId]);

  useEffect(() => {
    if (!serverId || !channelId) return;

    async function getChannelName(){
        const docRef = await getDoc(doc(db, "servers", serverId, "channels", channelId))
        const name = docRef.data().name
        setChannelName(name)
    }

    getChannelName()

  }, [serverId, channelId]);
  return (
    <div className="bg-[#313338] w-full">
      <FeedHeader name={channelName} />
      <MessageInput serverId={serverId} channelId={channelId} />
      <div className="pb-[100px]">{messages.map(message => (
        <Message
        data={message.data()}
        serverId={serverId}
        channelId={channelId}
        id={message.id}
        key={message.id}
        />
      ))}

      <div ref={lastMessageRef}></div>
      
      </div>
    </div>
  );
}

function FeedHeader({ name }) {
  return (
    <header className="h-12 bg-[#313338] border-b-2 border-[#1f2123] sticky top-0  w-full p-2.5">
      <div className="flex justify-between text-[#f2f3f5]">
        <div className="text-[#f2f3f5] flex font-semibold rounded-md space-x-2">
          <HashtagIcon className="w-5" />
          <h1 className="text-base font-bold text-[#f2f3f5]">{name}</h1>
        </div>
      </div>
    </header>
  );
}

export default Feed;
