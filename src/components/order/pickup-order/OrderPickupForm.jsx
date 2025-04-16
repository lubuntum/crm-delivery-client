import { useEffect, useState } from "react"
import "../../../styles/orders/create_order_page/create_order.css"
import "../../../styles/orders/order_pickup/order_pickup.css"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { ROUTES } from "../../../routes"
export const OrderPickupForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {getToken} = useAuth()
    const [order, setOrder] = useState()

    const [status, setStatus] = useState(STATUSES.IDLE)
    useEffect(()=> {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) {
            navigate(-1)
        }
        const getOrderById = async() => {
            try {
                setStatus(STATUSES.LOADING)
                const response = await getOrderByIdRequest(param.get("id"), getToken())
                setOrder(response.data)
                setStatus(STATUSES.IDLE)
            } catch(err) {
                setStatus(STATUSES.ERROR)
            }
        }
        getOrderById()
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
                {status === STATUSES.LOADING && <div className="loadingBar"> </div>}
                {order && order.status === ORDER_STATUSES.CREATED && 
                    <div className="proposalContainer"> 
                        <p>Хотите начать работу с текущим заказом ?</p>
                        <button onClick={()=> changeOrderStatusHandler(ORDER_STATUSES.PICKED)}>Взять заказ</button> 
                    </div>
                }
                {order && order.status !== ORDER_STATUSES.CREATED &&
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