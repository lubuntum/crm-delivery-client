import axios from "axios"
import { ACCOUNT_INFO, SERVER_URL } from "./urls"

export const accountInfo = async (token) => {
    return await axios.get(`${SERVER_URL}${ACCOUNT_INFO}`, {
        headers:{Authorization: token}
    })
}