import axios from "axios"
import {SERVER_URL, SUBSCRIBE_NOTIFICATIONS, UNSUBSCRIBE_NOTIFICATIONS } from "./urls"

export const checkEmployeesNotificationRequests = async (token) => {
    return await axios.post(`${SERVER_URL}${SUBSCRIBE_NOTIFICATIONS}`, {}, {
        headers:{Authorization: token}
    })
}
export const unsubscribeNotifications = async (token) => {
    return await axios.post(`${SERVER_URL}${UNSUBSCRIBE_NOTIFICATIONS}`, {}, {
        headers:{Authorization: token}
    })
}