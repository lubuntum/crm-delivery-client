import axios from "axios"
import { GET_ORGANIZATION_DETAILS, SERVER_URL, UPDATE_ORGANIZATION_DETAILS } from "./urls"

export const getOrganizationDetailsRequest = async (token) => {
    return axios.get(`${SERVER_URL}${GET_ORGANIZATION_DETAILS}`, {
        headers: {Authorization: token}
    })
}
export const updateOrganizationDetailsRequest = async (token, organizationDetails) => {
    return axios.post(`${SERVER_URL}${UPDATE_ORGANIZATION_DETAILS}`, organizationDetails, {
        headers: {Authorization: token}
    })
}