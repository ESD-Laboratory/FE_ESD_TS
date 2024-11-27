import { createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../utils/storage";


interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    id: '',
    email: '',
    name: '',
    token: '',
  }
}

const getInitialState = (): UserState => {
  const user = getUser()
  if (user === null) {
    return initialState
  }
  return { ...initialState, user }
}

export const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload
    },
    removeUser: (state) => {
      state.user = {
        id: '',
        email: '',
        name: '',
        token: '',
      }
    }
  }
})