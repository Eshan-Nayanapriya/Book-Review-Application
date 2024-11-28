import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
};

const userSlice = createSlice({
  name: "user",
  initialState : initialValue,
  reducers: {
    setUserLoginDetails: (state, action) => {
      state = { ...action.payload };
    },
  },
});

export const {setUserLoginDetails} = userSlice.actions;

export default userSlice.reducer;
