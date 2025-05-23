import "../css/order_list_style.css"

import { useCallback, useEffect, useMemo, useState } from "react"
import { getOrganizationOrders } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { formatDateLocalDate } from "../../../services/date/dateFormattes"

import { OrderItem } from "./OrderItem"

import { ReactComponent as CrmFilterIcon } from "../../../res/icons/crm_filter_icon.svg"

import { STATUSES } from "../../../statuses"

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
            setOrders(formattedOrders)
        } catch (err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
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

    return (
        <div className="contentWrapper">
            <div className="ordersListWrapper">
                <div className="pageTitle">
                    <p>Список заказов</p>
                </div>
                <div className="ordersListContainer">
                    {loading ? (
                        <div className="ordersLoadingContainer">
                            <p>Загрузка данных...</p>
                        </div>
                    ) : (
                    filteredOrders.map((order, index) => (
                        <OrderItem key={`orderItem${index}`} data={order}/>
                    )))}
                </div>

                <div className="ordersFilterContainer">
                    <div className="inputOrdersContainer">
                        <input className="customInput"
                               type="text"
                               placeholder="Поиск..."
                               required
                               onChange={handleFilterChange}/>
                        <CrmFilterIcon className="svgIcon"/>
                    </div>
                </div>
            </div>
        </div> 
    )
}