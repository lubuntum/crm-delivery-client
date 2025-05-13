import { useEffect, useMemo, useState } from "react"
import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrdersList } from "./OrdersList"
import { getOrganizationOrders } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { STATUSES } from "../../../statuses"
import { formatDateLocalDate } from "../../../services/date/dateFormattes"

export const OrdersPage = () => {
    const {getToken} = useAuth()

    const [orders, setOrders] = useState(null)
    const [status, setStatus] = useState(STATUSES.IDLE)

    const defaultColumnFilter = ({column: {filterValue, setFilter}}) => {
        return (
            <input value={filterValue || ''} onChange={e => setFilter(e.target.value || undefined)} placeholder={`Найти ...`} />
        )
    }
    const columns = useMemo(() => [
        {   Header: "Номер",
            accessor: "serialNumber",
            Filter: defaultColumnFilter
        },
        {
            Header: "Имя",
            accessor: "clientFullName",
            Filter: defaultColumnFilter
        },
        {
            Header: "Номер",
            accessor: "clientPhone",
            Filter: defaultColumnFilter
        },
        {
            Header: "Дата",
            accessor: "createdAt",
            Filter: defaultColumnFilter
        },
        {
            Header: "Адрес",
            accessor: "address",
            Filter: defaultColumnFilter
        },
        {
            Header: "Статус",
            accessor: "status",
            Filter: defaultColumnFilter
        }
    ])

    useEffect(() => {
        const getOrdersData = async () => {
            try {
                const response = await getOrganizationOrders(getToken())
                const sortedOrders = response.data.sort((a, b) => {return new Date(b.createdAt) - new Date(a.createdAt)})
                setOrders(sortedOrders.map(order => {
                    order.clientFullName = `${order.clientSecondName} ${order.clientName} ${order.clientPatronymic}`
                    order.createdAt = formatDateLocalDate(order.createdAt)
                    return order
                }))
            } catch(err) {
                setStatus(STATUSES.ERROR)
            }
        }
        getOrdersData()
    }, [])
    return (
        <>
            <HeaderComponent />
            <OrdersList data={orders} columns={columns} />
            <FooterComponent/>
        </>
    )
}