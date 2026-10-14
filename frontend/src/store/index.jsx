import { configureStore } from "@reduxjs/toolkit"
import LoadingSlice from "./slices/LoadingSlice"
import UserSlice from './slices/UserSlice'

const store = configureStore({
    reducer: {
        loading: LoadingSlice,
        users: UserSlice,
    }
})

export default store
