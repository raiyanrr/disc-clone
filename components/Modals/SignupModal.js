// import { closeSignupModal } from "@/redux/modalSlice";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import {createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth"
import { auth } from "../../firebase";
import {useDispatch, useSelector} from "react-redux"
import { setUser } from "../../redux/userSlice";
import { closeSignupModal, openSignupModal } from "../../redux/modalSlice";

function SignupModal() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(`/assets/profilePictures/pfp${Math.ceil(Math.random() * 6)}.png`)

  const dispatch = useDispatch()

  const username = useSelector(state => state.user.username)

  const isOpen = useSelector(state => state.modals.signupModal)


  async function handleSignup(){
    await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(auth.currentUser, {
        photoURL: photoUrl
    })

    dispatch(closeSignupModal())
  }

  async function loginAsGuest(){
    await signInWithEmailAndPassword(auth, "guest@gmail.com", "123456")
  }

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
        if (!currentUser) return
        dispatch(setUser(
            {
                username:currentUser.email.split("@")[0],
                photoUrl: currentUser.photoURL || photoUrl,
                uid: currentUser.uid   
            }
        ))
    
    })

    return unsub
  }, [])

  return (
    <div>
      <button 
      onClick={() => dispatch(openSignupModal())}
      className="bg-[#313338] border border-gray-300 px-4 py-1 rounded-lg text-[#f2f3f5] font-bold">
        Sign Up
      </button>

      <Modal
        open={isOpen}
        onClose={() => dispatch(closeSignupModal())}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex justify-center items-center"
      >
        <div className="w-[300px] h-[400px] bg-[#1E1F22] rounded-md">
          <div className="text-[#f2f3f5] p-3">
            <h1 className="text-2xl font-bold mb-4">Sign up to continue</h1>
            <div>
              <div className="mb-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email"
                  className="w-full rounded-md p-2 bg-[#313338] mb-2"
                />
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password"
                  className="w-full rounded-md p-2 bg-[#313338] mb-2"
                  type={"password"}
                />

                <button
                    onClick={handleSignup}
                  className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
                >
                  Create account
                </button>
              </div>
              <h1 className="text-center mb-2 font-bold">or</h1>
              <button
                onClick={loginAsGuest}
                className="bg-[#5865f2] w-full px-4 py-1 rounded-lg text-[#f2f3f5] font-bold"
              >
                Log In as Guest
              </button>
              <h1>{username}</h1>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default SignupModal;
