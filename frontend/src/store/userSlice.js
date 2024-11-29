import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
  avatar : "",
  role : "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.avatar = action.payload?.avatar;
      state.role = action.payload?.role;
    },
    logout : (state, action) => {
      state._id = "";
      state.name = "";
      state.email = "";
      state.avatar = "";
      state.role = "";
    }
  },
});

export const { setUserLoginDetails, logout } = userSlice.actions;

export default userSlice.reducer;
