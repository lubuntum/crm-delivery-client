import { useEffect, useState } from "react"
import { getOrganizationAccountsRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
import "./css/ready_orders_data.css"
import { getOrdersTotalStatsByOrganizationRequest } from "../../services/api/orderApi"
export const ReadyOrdersData = () => {
    const {getToken} = useAuth()
    const [ordersTotalStats, setOrdersTotalStats] = useState(null)
    useEffect(() => {
        const getOrdersTotalStats = async () => {
            try {
                const response = await getOrdersTotalStatsByOrganizationRequest(getToken())
                setOrdersTotalStats(response.data)
            } catch(err) {
                console.error(err)
            }
        }
        getOrdersTotalStats()
    }, [])
    if (!ordersTotalStats) return <div className="loading_bar"></div>
    return (
        <div className="readyOrdersDataWrapper">
            <h3>Информация о заказах</h3>
            <p>Кол-во заказов с позициями: {ordersTotalStats.ordersCount}</p>
            <p>Общая площадь: {ordersTotalStats.totalSize.toFixed(2)}м<sup>2</sup></p>
            <p>Общая сумма: {ordersTotalStats.totalPrice.toFixed(2)}₽</p>
        </div>
    )
}