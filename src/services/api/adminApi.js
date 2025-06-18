import axios from "axios"
import { GET_ORGANIZATIONS, SERVER_URL } from "./urls"

export const getOrganizationsRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${GET_ORGANIZATIONS}`, {
        headers: {Authorization: token}
    })
}