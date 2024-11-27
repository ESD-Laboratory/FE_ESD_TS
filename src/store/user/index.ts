import { userSlice } from "./user";

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;