import axios from "axios"
import { CREATE_ORG_REGISTRATION_REQUEST, SERVER_URL, UPDATE_ORG_REGISTRATION_REQUEST_STATUS } from "./urls"

export const createOrganizationRequest = async (organizationRequest) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORG_REGISTRATION_REQUEST}`, organizationRequest)
}
export const updateOrganizationRequestStatus = async (organizationRequest, token) => {
    return await axios.post(`${SERVER_URL}${UPDATE_ORG_REGISTRATION_REQUEST_STATUS}`, organizationRequest, {
        headers: {Authorization: token}
    })
}