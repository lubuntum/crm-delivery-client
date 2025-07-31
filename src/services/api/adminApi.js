import axios from "axios"
import { ADD_ORGANIZATION, CHANGE_ORGANIZATION_ACTIVE_STATUS, GET_ORDERS_BETWEEN_DATES_BY_ORGANIZATION, GET_ORGANIZATIONS, SERVER_URL } from "./urls"

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
export const addOrganizationRequest = async (token, organization) => {
    return await axios.post(`${SERVER_URL}${ADD_ORGANIZATION}`, organization, {
        headers: {Authorization: token}
    })
}
export const getOrdersBetweenDatesByOrganization = async (token, startDate, endDate, organizationId) => {
    return await axios.get(`${SERVER_URL}${GET_ORDERS_BETWEEN_DATES_BY_ORGANIZATION}?startDate=${startDate}&endDate=${endDate}&organizationId=${organizationId}`, {
        headers: {Authorization: token}
    })
}