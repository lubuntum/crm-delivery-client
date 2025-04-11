import axios from "axios"
import { CREATE_ORDER, ORGANIZATION_ORDERS, SERVER_URL } from "./urls"

export const createOrderRequest = async (order, token) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDER}`, order, {
        headers:{Authorization: token}
    })
}
export const getOrganizationOrders = async (token) => {
    return await axios.get(`${SERVER_URL}${ORGANIZATION_ORDERS}`, {
        headers:{Authorization: token}
    })
}