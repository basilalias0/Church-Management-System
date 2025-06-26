import { configureStore } from "@reduxjs/toolkit"
import user from "./UserSlice"


const store = configureStore({
    reducer:{
        auth:user,
    }
})

export default store