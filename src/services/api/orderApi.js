import axios from "axios"
import { CHANGE_ORDER_STATUS, CREATE_ORDER, GET_ORDER_BY_ID, GET_ORDERS_TOTAL_STATS_BY_ORGANIZATION, ORGANIZATION_ORDERS, REMOVE_ORDER, SERVER_URL, UPDATE_ORDER } from "./urls"

export const createOrderRequest = async (order, token) => {
    return await axios.post(`${SERVER_URL}${CREATE_ORDER}`, order, {
        headers:{Authorization: token}
    })
}
export const updateOrderRequest = async (order, token) => {
    return await axios.patch(`${SERVER_URL}${UPDATE_ORDER}`, order, {
        headers: {Authorization: token}
    })
}
export const removeOrderRequest = async (order, token) => {
    return await axios.post(`${SERVER_URL}${REMOVE_ORDER}`, order, {
        headers: {Authorization: token}
    })
}
export const changeOrderStatusRequest = async (orderId, status, token) => {
    return await axios.post(`${SERVER_URL}${CHANGE_ORDER_STATUS}`, {orderId: orderId, status: status}, {
        headers: {Authorization: token}
    })
}
export const getOrganizationOrders = async (token) => {
    return await axios.get(`${SERVER_URL}${ORGANIZATION_ORDERS}`, {
        headers:{Authorization: token}
    })
}
export const getOrderByIdRequest = async (id, token) => {
    return await axios.get(`${SERVER_URL}${GET_ORDER_BY_ID}/${id}`, {
        headers: {Authorization: token}
    })
}
export const getOrdersTotalStatsByOrganizationRequest = async (token) => {
    return await axios.get(`${SERVER_URL}${GET_ORDERS_TOTAL_STATS_BY_ORGANIZATION}`, {
        headers: {Authorization: token}
    })
}