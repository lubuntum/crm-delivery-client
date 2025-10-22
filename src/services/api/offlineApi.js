import axios from "axios"
import { GET_ORDER_FINISH_LIST_BY_IRDERS_ID, GET_ORDER_PICKUP_LIST_BY_ORDERS_ID, SERVER_URL } from "./urls"

export const getOrderPickupListByOrdersId = async (ordersId, token) => {
    console.log(token)
    return await axios.get(`${SERVER_URL}${GET_ORDER_PICKUP_LIST_BY_ORDERS_ID}`, {
        headers: {Authorization: token},
        params: {ordersId: ordersId},
        paramsSerializer: {
            indexes: null
        }
    })
}

export const getOrderFinishListByOrdersId = async (ordersId, token) => {
    return await axios.get(`${SERVER_URL}${GET_ORDER_FINISH_LIST_BY_IRDERS_ID}`, {
        headers: {Authorization: token}, 
        params: {ordersId: ordersId},
        paramsSerializer: {
            indexes: null
        }
    })
}