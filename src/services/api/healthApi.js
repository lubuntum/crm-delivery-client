import axios from "axios"
import { HEALTH, SERVER_URL } from "./urls"

export const checkServerHealth = () => {
    return axios.get(`${SERVER_URL}${HEALTH}`, { timeout: 2500 })
}