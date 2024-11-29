import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
  avatar : ""
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
    },
  },
});

export const { setUserLoginDetails } = userSlice.actions;

export default userSlice.reducer;
