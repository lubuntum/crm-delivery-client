import axios from "axios"
import { CREATE_ORDER, ORDERS_BY_ACCOUNT, SERVER_URL } from "./urls"

export const createOrderRequest = async (order, token) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDER}`, order, {
        headers:{Authorization: token}
    })
}
export const getOrdersByAccount = async (token) => {
    return await axios.get(`${SERVER_URL}${ORDERS_BY_ACCOUNT}`, {
        headers:{Authorization: token}
    })
}