import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../global/Constants";

const initialState = {
  access_token: "",
  name: "",
};

const __asyncLogin = createAsyncThunk(
  "userSlice/asyncLogin",
  async (payload) => {
    const result = await axios
      .post(API + "/login", payload)
      .then((response) => {
        return response.data.success;
      })
      .catch(() => false);

    return result;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, payload) => {
      state.access_token = payload.payload.access_token;
      state.name = payload.payload.name;
    },
    logout: (state) => {
      state.access_token = "";
      state.name = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__asyncLogin.fulfilled, (state, payload) => {
      // state.access_token = payload.payload.access_token;
    });
  },
});

export default userSlice;
export const { login, logout } = userSlice.actions;
export { __asyncLogin };
