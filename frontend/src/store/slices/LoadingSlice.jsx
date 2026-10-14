import { createSlice } from "@reduxjs/toolkit";
import { isLoadingReduser } from "../redusers/LoadingReduser";
import { addResetCase } from "./resetSlice";
const initialState = {
    loading: false
}
const LoadingSlice = createSlice({
    name: "loadingSlice",
    initialState,
    reducers: {
        isLoading: isLoadingReduser
    },

    //Reset when Logout
    extraReducers: (builder) => {
        addResetCase(builder, initialState);
    },
})

export const { isLoading } = LoadingSlice.actions
export default LoadingSlice.reducer