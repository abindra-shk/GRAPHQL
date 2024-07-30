import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  user: {
    id: string;
    username: string;
  } | null;
  token: string | null;
  room: string | null;
}

const initialState: UserState = {
  user: null,
  token: null,
  room: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: { id: string; username: string }; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.room = null;
    },
    setRoom: (state, action: PayloadAction<string>) => {
      state.room = action.payload;
    },
  },
});

export const { setUser, logout, setRoom } = userSlice.actions;

export default userSlice.reducer;
