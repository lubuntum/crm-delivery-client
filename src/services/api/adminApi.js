import axios from "axios"
import { CHANGE_ORGANIZATION_ACTIVE_STATUS, GET_ORGANIZATIONS, SERVER_URL } from "./urls"

export const getOrganizationsRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${GET_ORGANIZATIONS}`, {
        headers: {Authorization: token}
    })
}
export const changeOrganizationActiveStatusRequest = async (token, organization) => {
    return await axios.post(`${SERVER_URL}${CHANGE_ORGANIZATION_ACTIVE_STATUS}`, organization, {
        headers: {Authorization: token}
    })
}