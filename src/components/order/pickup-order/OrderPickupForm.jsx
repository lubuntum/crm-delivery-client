import { useEffect, useState } from "react"
import "../../../styles/orders/create_order_page/create_order.css"
import "../../../styles/orders/order_pickup/order_pickup.css"
import { useLocation } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
export const OrderPickupForm = () => {
    const location = useLocation()
    const {getToken} = useAuth()
    const [order, setOrder] = useState()

    const [status, setStatus] = useState(STATUSES.IDLE)
    useEffect(()=> {
        if (!location.state) return
        const order = location.state.order
        console.log(order)
        setOrder(order)
    }, [])

    const changeOrderStatusHandler = async (orderStatus) => {
        try {
            const response = await changeOrderStatusRequest(order.id, orderStatus, getToken())
            setOrder(prev => ({...order, status: response.data}))
        } catch (err) {
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    return(
        <>
            <div className="contentWrapper">
                {order?.status === ORDER_STATUSES.CREATED ? 
                    <div className="proposalContainer"> 
                        <p>Хотите начать работу с текущим заказом ?</p>
                        <button onClick={()=> changeOrderStatusHandler(ORDER_STATUSES.PICKED)}>Взять заказ</button> 
                    </div> :
                    
                    <div className="formWrapper">
                        <div className="form">
                            <div className="orderTitle">
                                Забрать заказ
                            </div>
                            <div className="formInputs">
                                <input type="text" placeholder="Количество" />
                                <textarea placeholder="Комментарий"/>
                                <button className={order?.status !== ORDER_STATUSES.PICKED && "blocked"}>Подтвердить</button>
                                <button className={order?.status !== ORDER_STATUSES.TAKEN && "blocked"}>Доставлено</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}