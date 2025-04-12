import axios from "axios"
import { ACCOUNT_DATA, LOGIN, REGISTER, SERVER_URL } from "./urls"

export const loginRequest = async (email, pass) => {
    const data = {email: email, password: pass}
    return await axios.post(`${SERVER_URL}${LOGIN}`, data)
}
export const registerRequest = async (accountData) => {
    return await axios.post(`${SERVER_URL}${REGISTER}`, accountData)
}
export const getAccountDataRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${ACCOUNT_DATA}`, {
        headers: {Authorization: token}
    })
}