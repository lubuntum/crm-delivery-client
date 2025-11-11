import axios from "axios"
import { CREATE_ORDER_FINISH, CREATE_ORDERS_FINISH, GET_ORDER_FINISH_BY_ORDER_ID, SERVER_URL } from "./urls"

export const createOrderFinishRequest = async (token, orderFinishData) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDER_FINISH}`, orderFinishData, {
        headers: {Authorization: token}
    })
}
export const getOrderFinishByOrderId = async (token, orderId) => {
    return await axios.get(`${SERVER_URL}${GET_ORDER_FINISH_BY_ORDER_ID}/${orderId}`, {
        headers: {Authorization: token}
    })
}
export const createOrdersFinishRequest = async (token, ordersFinishData) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDERS_FINISH}`, ordersFinishData, {
        headers: {Authorization: token}
    })
}