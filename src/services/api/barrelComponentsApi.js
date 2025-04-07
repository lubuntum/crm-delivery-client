import axios from "axios"
import { BARREL_COMPONENTS, SERVER_URL } from "./urls"

export const getBarrelComponentsRequest = async () => {
    return await axios.get(`${SERVER_URL}${BARREL_COMPONENTS}`)
}