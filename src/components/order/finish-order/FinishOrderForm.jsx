import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"

export const FinishOrderForm = () => {
    const [status, setStatus] = useState()
    const navigate = useNavigate()
    const {getToken} = useAuth()

    const [order, setOrder] = useState(null)
    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) navigate(-1)
        const getOrderById = async () => {
            try {
                setStatus(STATUSES.LOADING)
                const response = await getOrderByIdRequest(param.get("id"), getToken())
                console.log(order)
                setOrder(response.data)
                setStatus(STATUSES.IDLE)
            } catch(err) {
                console.error(err)
                setStatus(STATUSES.ERROR)
            }
        }
        getOrderById()
    }, [])
    const validateOrderStatus = () => {
        return order && (order.status === ORDER_STATUSES.READY || 
            order.status === ORDER_STATUSES.COMING || 
            order.status === ORDER_STATUSES.COMPLETED)
    }
    return (
        <div className="contentWrapper">
            {status === STATUSES.LOADING && <div className="loadingBar"> </div>}
            {(order && !validateOrderStatus())&& <p>Заказ пока не готов к отправке</p>}
            {validateOrderStatus() && <p>Форма для финиша</p>}
        </div>
    )
}