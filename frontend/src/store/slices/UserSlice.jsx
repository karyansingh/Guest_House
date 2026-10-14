import { createSlice } from "@reduxjs/toolkit";
import { userDetails } from "../redusers/UserReduser";
import { addResetCase } from "./resetSlice";

const initialState = {
    users: {}
}
const UserSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        users: userDetails,
    },
    //Reset when Logout
    extraReducers: (builder) => {
            addResetCase(builder, initialState);
    },
})

export const { users, logout } = UserSlice.actions
export default UserSlice.reducer