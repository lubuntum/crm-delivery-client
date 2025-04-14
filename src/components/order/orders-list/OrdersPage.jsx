import { useEffect, useMemo, useState } from "react"
import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrdersList } from "./OrdersList"
import { getOrganizationOrders } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { STATUSES } from "../../../statuses"

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
        {
            Header: "Имя",
            accessor: "clientFullName",
            Filter: defaultColumnFilter
        },
        {
            Header: "Почта",
            accessor: "clientEmail",
            Filter: defaultColumnFilter
        },
        {
            Header: "Номер",
            accessor: "clientPhone",
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
                setOrders(response.data.map(order => {
                    order.clientFullName = `${order.clientSecondName} ${order.clientName} ${order.clientPatronymic}`
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