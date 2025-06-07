import "../css/order_list_style.css"

import { useCallback, useEffect, useMemo, useState } from "react"
import { getOrganizationOrders, removeOrderRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { formatDateLocalDate } from "../../../services/date/dateFormattes"

import { OrderItem } from "./OrderItem"

import { ReactComponent as CrmFilterIcon } from "../../../res/icons/crm_filter_icon.svg"

import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { Loader } from "../../loader/Loader"

const ordersStatusForSorting = [
    ORDER_STATUSES.CREATED,
    ORDER_STATUSES.PICKED,
    ORDER_STATUSES.TAKEN,
    ORDER_STATUSES.INSPECTION,
    ORDER_STATUSES.READY,
    ORDER_STATUSES.COMING,
    ORDER_STATUSES.COMPLETED
]

export const OrdersPage = () => {
    const { getToken } = useAuth()

    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [filter, setFilter] = useState("")

    const fetchOrders = useCallback(async () => {
        setLoading(true)
        try {
            const response = await getOrganizationOrders(getToken())
            const sortedOrders = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            const formattedOrders = sortedOrders.map(order => ({
                ...order,
                clientFullName: `${order.clientSecondName} ${order.clientName} ${order.clientPatronymic}`,
                createdAt: formatDateLocalDate(order.createdAt)
            }))
            //const nonCompletedOrders = formattedOrders.filter(order => order.status !== ORDER_STATUSES.COMPLETED)
            //const completedOrders = formattedOrders.filter(order => order.status === ORDER_STATUSES.COMPLETED)
            setOrders(formattedOrders.sort((a,b) => {return ordersStatusForSorting.indexOf(a.status) - ordersStatusForSorting.indexOf(b.status)}))
        } catch (err) {
            setStatus(STATUSES.ERROR)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }, [getToken])

    useEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const handleFilterChange = useCallback((e) => {
        setFilter(e.target.value)
    }, [])

    const filteredOrders = useMemo(() => {
        const searchTerm = filter.toLowerCase()
        return orders.filter(order => (
            order.serialNumber?.toLowerCase().includes(searchTerm) ||
            order.clientFullName?.toLowerCase().includes(searchTerm) ||
            order.createdAt?.toLowerCase().includes(searchTerm) ||
            order.address?.toLowerCase().includes(searchTerm) ||
            order.status?.toLowerCase().includes(searchTerm)
        ))
    }, [orders, filter])

    const removeOrder = async (order) => {
        if (order.status !== ORDER_STATUSES.CREATED) return
        try {
            const response = await removeOrderRequest({id: order.id}, getToken())
            setOrders(prev => prev.filter(item => item.id !== order.id))
        } catch (err) {
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    return (
        <div className="contentWrapper">
            <div className="ordersListWrapper">
                <div className="pageTitle">
                    <p>Список заказов</p>
                </div>
                
                <div className="ordersFilterContainer">
                    <div className="cutomInputContainer">
                        <input className="customInput"
                               type="text"
                               placeholder="Поиск..."
                               required
                               onChange={handleFilterChange}/>
                        <CrmFilterIcon className="svgIcon"/>
                    </div>
                </div>

                <div className="ordersListContainer">
                    {loading ? (
                        <div className="ordersLoadingContainer">
                            <Loader/>
                        </div>
                    ) : (
                    filteredOrders.map((order, index) => (
                        <OrderItem key={`orderItem${index}`} data={order} removeOrder={removeOrder}/>
                    )))}
                </div>
            </div>
        </div> 
    )
}