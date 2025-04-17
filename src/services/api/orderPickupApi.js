import axios from "axios"
import { CREATE_ORDER_PICKUP, GET_ORDER_PICKUP_BY_ID, GET_ORDER_PICKUP_BY_ORDER_ID, SERVER_URL } from "./urls"

export const createOrderPickupRequest = async (token, orderPickupData) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDER_PICKUP}`, orderPickupData, {
        headers: {Authorization: token}
    })
}

export const getOrderPickupByOrderIdRequest = async (token, orderId) => {
    return await axios.get(`${SERVER_URL}${GET_ORDER_PICKUP_BY_ORDER_ID}/${orderId}`, {
        headers: {Authorization: token}
    })
}

export const getOrderPickupById = async (token, id) => {
    return await axios.get(`${SERVER_URL}${GET_ORDER_PICKUP_BY_ID}/${id}`, {
        headers: {Authorization: token}
    })
}