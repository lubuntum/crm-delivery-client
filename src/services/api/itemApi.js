import axios from "axios"
import { CREATE_ITEM_FOR_ORDER, GET_ITEMS_BY_ORDER_ID, SERVER_URL } from "./urls"

export const createItemRequest = async (item, token) => {
    return await axios.post(`${SERVER_URL}${CREATE_ITEM_FOR_ORDER}`, item, {
        headers: {Authorization: token}
    })
}

export const getItemsByOrderIdRequest = async (orderId, token) => {
    return await axios.get(`${SERVER_URL}${GET_ITEMS_BY_ORDER_ID}/${orderId}`, {
        headers: {Authorization: token}
    })
}