import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
// import { API } from "../../global/Constants";

const initialState = {
  auth: false,
  userId: 0,
};

const __asyncLogin = createAsyncThunk(
  "userSlice/asyncLogin",
  async (payload) => {
    const result = await axios
      // .post(API + "/user/login", payload)
      .post("", payload)
      .then((response) => {
        localStorage.setItem("token", response.data.data);
        return true;
      })
      .catch(() => false);

    return result;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.auth = false;
      state.userId = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__asyncLogin.fulfilled, (state, payload) => {
      state.auth = payload.payload.auth;
      state.userId = payload.payload.userId;
    });
  },
});

export default userSlice;
export const { logout } = userSlice.actions;
export { __asyncLogin };
