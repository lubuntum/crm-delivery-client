import axios from "axios"
import { LOGIN, REGISTER, SERVER_URL } from "./urls"

export const loginRequest = async (email, pass) => {
    const data = {email: email, pass: pass}
    return await axios.post(`${SERVER_URL}${LOGIN}`, data)
}
export const registerRequest = async (accountData) => {
    return await axios.post(`${SERVER_URL}${REGISTER}`, accountData)
}