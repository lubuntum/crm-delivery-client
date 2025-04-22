import axios from "axios"
import { ORGANIZATION_MATERIALS, SERVER_URL } from "./urls"

export const getMaterialByOrganizationId = async (token) => {
    return await axios.get(`${SERVER_URL}${ORGANIZATION_MATERIALS}`, {
        headers: {Authorization: token}
    })
}