import React, { useEffect, useState } from "react";
import LoginModal from "../Modals/LoginModal";
import SignupModal from "../Modals/SignupModal";
import { useSelector, useDispatch } from "react-redux";
import { onSnapshot, query, collection, getDoc, doc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { signoutUser } from "../../redux/userSlice";
import { auth, db } from "../../firebase";
import { HashtagIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import Link from "next/link";
import { PlusIcon, XCircleIcon } from "@heroicons/react/24/solid";
import Modal from "@mui/material/Modal";
import { addDoc } from "firebase/firestore";

function ChannelList({ serverId }) {
  const user = useSelector((state) => state.user);
  const [channels, setChannels] = useState([]);
  const [serverName, setServerName] = useState("");

  const router = useRouter();
  const channelID = router.query.channelID;

  function CreateChannelModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedChannelName, setSelectedChannelName] = useState("");

    async function createChannel() {
      await addDoc(collection(db, "servers", serverId, "channels"), {
        name: selectedChannelName,
      });
    }

    return (
      <div>
        <div onClick={() => setIsOpen(true)}>
          <PlusIcon className="w-5 cursor-pointer" />
        </div>
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="flex justify-center items-center"
        >
          <div className="w-[300px] h-[400px] bg-[#1E1F22] rounded-md p-1">
            <div className="cursor-pointer">
              <XCircleIcon className="w-8 text-white" />
            </div>
            <div className="text-[#f2f3f5] p-3">
              <h1 className="text-2xl font-bold mb-4">Create channel</h1>

              <div className="space-y-3">
                <input
                  onChange={(e) => setSelectedChannelName(e.target.value)}
                  className="w-full px-4 py-1 rounded-lg text-[#f2f3f5] bg-[#383A40] resize-none outline-none"
                  placeholder="Channel Name"
                />
                <button
                  onClick={createChannel}
                  className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
                >
                  Create channel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  function ChannelListHeader({ name, serverId }) {
    return (
      <header className="h-12 bg-transparent border-b-2 border-[#1f2123] sticky top-0 p-2.5">
        <div className="flex justify-between text-[#f2f3f5]">
          <h1 className="text-base font-bold text-[#f2f3f5]">{name}</h1>
          <div className="flex space-x-2">
            <CreateChannelModal serverId={serverId} />
          </div>
        </div>
      </header>
    );
  }

  useEffect(() => {
    if (!serverId) return;

    const q = query(collection(db, "servers", serverId, "channels"));
    const unsub = onSnapshot(q, (snapshot) => {
      setChannels(snapshot.docs);
    });

    return unsub;
  }, [serverId]);

  useEffect(() => {
    if (!serverId) return;

    async function getServerName() {
      const docRef = await getDoc(
        doc(db, "servers", serverId)
      );
      const name = docRef.data().name;
      setServerName(name);
    }

    getServerName();
  }, [serverId]);

  return (
    <div className="bg-[#2b2d31] w-[240px]">
      <ChannelListHeader name={serverName} />

      <div>
        <div className="fixed w-[240px] px-2">
          {channels.map((channel) => (
            <Link key={channel.id} href={"/" + serverId + "/" + channel.id}>
              <ChannelListItem name={channel.data().name} id={channel.id} />
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 h-12 p-2.5 border-t-2 w-[240px] border-[#1f2123]">
        {!user.username ? (
          <div className="flex space-x-5">
            <SignupModal />
            <LoginModal />
          </div>
        ) : (
          <UserProfile user={user} />
        )}
      </div>
    </div>
  );
}

function UserProfile({ user }) {
  const dispatch = useDispatch();

  async function handleSignout() {
    await signOut(auth);
    dispatch(signoutUser());
  }
  return (
    <div className="flex space-x-2">
      <img className="w-8 h-8 object-cover rounded-full" src={user.photoUrl} />
      <div className="flex justify-between space-x-16 pr-4">
        <div className="">
          <h3 className="text-[#f2f3f5] font-bold">{user.username}</h3>
        </div>

        <button
          onClick={handleSignout}
          className="whitespace-nowrap bg-red-500 px-2 rounded-lg text-[#f2f3f5] font-bold text-sm"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}

function ChannelListItem({ name, id }) {
  const router = useRouter();
  const channelId = router.query.channelID;
  return (
    <li
      className={`
      ${channelId === id && "bg-white bg-opacity-10"}
      text-[#f2f3f5] flex font-semibold rounded-md mt-1 space-x-2 hover:bg-white hover:bg-opacity-5 p-1 cursor-pointer`}
    >
      <HashtagIcon className="w-5" />
      <div>
        <h3 className="text-[16px]">{name}</h3>
      </div>
    </li>
  );
}

export default ChannelList;
