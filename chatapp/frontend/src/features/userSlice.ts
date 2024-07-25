import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: string | null;
  room: string | null;
}

const initialState: UserState = {
  user: null,
  room: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<string>) {
      state.user = action.payload;
    },
    setRoom(state, action: PayloadAction<string>) {
      state.room = action.payload;
    },
  },
});

export const { setUser, setRoom } = userSlice.actions;
export default userSlice.reducer;
