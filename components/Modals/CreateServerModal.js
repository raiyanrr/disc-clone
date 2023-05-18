import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { PlusIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/solid";
import {addDoc, collection, serverTimestamp, setDoc, doc} from "firebase/firestore"
import { db } from "../../firebase";
function CreateServerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [serverName, setServerName] = useState("");

  async function createServer(){
    const docRef = await addDoc(collection(db, "servers"), {
        name: serverName,
        timestamp: serverTimestamp()
    })

    await setDoc(doc(db, "servers", docRef.id, "channels", "general"), {
        name: "general"
    })
    setIsOpen(false)
    setServerName("")

  }
  return (
    <div>
      <div 
      onClick={() => setIsOpen(true)}
      className="hover:bg-green-600 w-12 h-12 cursor-pointer rounded-full flex justify-center items-center bg-[#313338] text-[#dbdee1] font-bold text-lg hover:rounded-xl">
        <PlusIcon className="w-8" />
      </div>

      <Modal 
      className="flex justify-center items-center"
      open={isOpen} onClose={() => setIsOpen(false)}>

<div className="w-[300px] h-[400px] bg-[#1E1F22] rounded-md p-1">
          <div
            onClick={() => setIsOpen(false)}
            className="cursor-pointer"
          >
            <XCircleIcon className="w-8 text-white" />
          </div>
          <div className="text-[#f2f3f5] p-3">
            <h1 className="text-2xl font-bold mb-4">Create Server</h1>

            <div className="space-y-3">
              <input
              onChange={e => setServerName(e.target.value)}
                className="w-full px-4 py-1 rounded-lg text-[#f2f3f5] bg-[#383A40] resize-none outline-none"
                placeholder="Server Name"
              />
              <button
                onClick={createServer}
                className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
              >
                Create server
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateServerModal;
