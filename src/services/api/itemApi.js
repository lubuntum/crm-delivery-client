import axios from "axios"
import { CHANGE_ITEM_READY_STATE, CREATE_ITEM_FOR_ORDER, GET_ITEMS_BY_ORDER_ID, SERVER_URL } from "./urls"

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
export const updateItemReadyStateRequest = async (id, isReady, token) => {
    console.log(id, isReady, token)
    return await axios.patch(`${SERVER_URL}${CHANGE_ITEM_READY_STATE}?id=${id}&isReady=${isReady}`, {},
        {headers: {Authorization: token}
    })
}