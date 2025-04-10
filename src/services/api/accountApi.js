import axios from "axios"
import { ACCOUNT_DATA, SERVER_URL } from "./urls"

export const getAccountDataRequest = async (token) => {
    console.log("passed token => ", token)
    return await axios.get(`${SERVER_URL}${ACCOUNT_DATA}`, {
        headers: {Authorization : token}
    })
}