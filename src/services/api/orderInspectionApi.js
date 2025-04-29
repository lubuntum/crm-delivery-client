import axios from "axios"
import { CREATE_ORDER_INSPECTION, GET_ORDER_INSPECTION_BY_ORDER_ID, SERVER_URL } from "./urls"

export const createOrderInspectionRequest = async (orderInspectionData, token) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDER_INSPECTION}`, orderInspectionData, {
        headers: {Authorization: token}
    })
}

export const getOrderInspectionByOrderIdRequest = async(token, orderId) => {
    console.log(`${SERVER_URL}${GET_ORDER_INSPECTION_BY_ORDER_ID}/${orderId}`)
    return await axios.get(`${SERVER_URL}${GET_ORDER_INSPECTION_BY_ORDER_ID}/${orderId}`, {
        headers: {Authorization: token}
    })
}