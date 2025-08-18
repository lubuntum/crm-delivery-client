import axios from "axios"
import { CREATE_ORG_REGISTRATION_REQUEST, GET_ORG_REGISTRATION_REQUESTS_BY_STATUS, SERVER_URL, UPDATE_ORG_REGISTRATION_REQUEST_STATUS } from "./urls"

export const createOrganizationRequest = async (organizationRequest) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORG_REGISTRATION_REQUEST}`, organizationRequest)
}
export const updateOrganizationRequestStatus = async (organizationRequest, token) => {
    return await axios.post(`${SERVER_URL}${UPDATE_ORG_REGISTRATION_REQUEST_STATUS}`, organizationRequest, {
        headers: {Authorization: token}
    })
}
export const getOrganizationRequestsByStatus = async (status, token) => {
    return await axios.get(`${SERVER_URL}${GET_ORG_REGISTRATION_REQUESTS_BY_STATUS}?status=${status}`, {
        headers:{Authorization: token}
    })
}