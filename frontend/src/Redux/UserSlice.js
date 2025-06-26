import { createSlice } from "@reduxjs/toolkit";
import { getDecodeData, getuserToken } from "../Utiles/storageHandler";
import { jwtDecode } from "jwt-decode";

export const slicecust = createSlice({
    name: 'user',
    initialState: {
        name: getDecodeData()?.name || null,
        email: getDecodeData()?.email || null,
        token: getuserToken() || null,
        isLogin: !!getuserToken(),
        role: getDecodeData()?.role || null
    },
    reducers: {
        signup: (state, action) => {
            state.isLogin = true;
            state.token = action.payload.token;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
        login: (state, action) => {
            state.token = action.payload;
            const decoded = jwtDecode(action.payload);
            state.role = decoded.role;
            state.email = decoded.email;
            state.name = decoded.fullName;
            state.isLogin = true;
        },
        logout: (state) => {
            console.log("working");
            
            state.isLogin = false;
            state.token = null;
            state.name = null;
            state.email = null;
            state.role = null;
        }
    }
});

export const { signup, login, logout } = slicecust.actions;
export default slicecust.reducer;
