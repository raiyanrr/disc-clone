import React, { useEffect, useState } from "react";
import ServerListItem from "./ServerListItem";
import { onSnapshot, query, collection, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import CreateServerModal from "../Modals/CreateServerModal";

function ServerList() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "servers"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      setServers(snapshot.docs);
    });

    return unsub;
  }, []);

  return (
    <div className="z-50 bg-[#1E1F22] w-[72px] h-full flex flex-col  items-center">
      <nav className="py-4 fixed top-0">
        <ul className=" space-y-4 mb-4">
          {servers.map((server) => (
            <Link href={"/" + server.id + "/general"}>
              <ServerListItem id={server.id} key={server.id} label={server.data().name} />
            </Link>
          ))}
        </ul>

        <CreateServerModal />
      </nav>
    </div>
  );
}

export default ServerList;
