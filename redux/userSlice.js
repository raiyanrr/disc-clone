import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username:null,
    photoUrl: null,
    uid: null

}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.username = action.payload.username,
        state.photoUrl = action.payload.photoUrl,
        state.uid = action.payload.uid
    },

    signoutUser : (state) => {
        state.username = null,
        state.photoUrl = null,
        state.uid = null
    }
  }
});

export const {setUser, signoutUser} = userSlice.actions

export default userSlice.reducer