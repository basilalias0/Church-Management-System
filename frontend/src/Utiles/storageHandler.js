import { jwtDecode } from "jwt-decode"
export const getuserToken=()=>{
    return sessionStorage.getItem("userToken") || null

}
export const getDecodeData=()=>{
    return sessionStorage.getItem("userToken")? jwtDecode(sessionStorage.getItem("userToken")):null
}