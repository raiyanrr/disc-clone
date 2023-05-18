import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import {addDoc, collection, serverTimestamp} from "firebase/firestore"
import { db } from "../firebase";
import {useSelector, useDispatch} from "react-redux"
import { openLoginModal } from "../redux/modalSlice";

function MessageInput({serverId, channelId}) {

    const [message, setMessage] = useState("")
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    async function sendMessage(){

        if (!user.username) {
            dispatch(openLoginModal())
            return
        }
        await addDoc(collection(db, "servers", serverId, "channels", 
        channelId, "messages" 
        ), 
        {
            uid: user.uid,
            username: user.username,
            photoUrl: user.photoUrl,
            message: message,
            timestamp: serverTimestamp()

        })

        setMessage("")
    }
  return (
    <div className="fixed bottom-0 w-full pb-5 flex justify-center  p-3 bg-[#313338]">
      <div className="flex w-full sm:w-[70%] rounded-lg sm:-ml-[312px] justify-center bg-[#383A40]">
        <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => {
            if (e.key === "Enter"){
                sendMessage()
            }
        }}
          className="h-12 p-3 text-[#f2f3f5] rounded-md  w-full bg-[#383A40] resize-none outline-none"
          placeholder="Message"
        ></textarea>
        <PaperAirplaneIcon 
        onClick={sendMessage}
        className="w-7 -rotate-45 mr-5 text-gray-500" />
      </div>
    </div>
  )
}

export default MessageInput