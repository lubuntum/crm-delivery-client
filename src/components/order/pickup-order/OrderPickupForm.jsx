import { useEffect, useState } from "react"
import "../../../styles/orders/create_order_page/create_order.css"
import "../../../styles/orders/order_pickup/order_pickup.css"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { ROUTES } from "../../../routes"
import { DIGIT_REGEX } from "../../../services/validation/validationRegexes"
import { createOrderPickupRequest, getOrderPickupByOrderIdRequest } from "../../../services/api/orderPickupApi"
export const OrderPickupForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {getToken} = useAuth()
    const [order, setOrder] = useState()
    const [orderPickup, setOrderPickup] = useState({
        itemsCount: "",
        comment: "",
        orderId: null
    })
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
                const orderTemp = response.data
                setOrder(orderTemp)
                //Если статус Taken это значит что уже есть orderPickup и можно его запросить
                if (orderTemp.status !== ORDER_STATUSES.PICKED && orderTemp.status !== ORDER_STATUSES.CREATED)
                    await getOrderPickupByOrderId(orderTemp.id)
                setStatus(STATUSES.IDLE)
            } catch(err) {
                setStatus(STATUSES.ERROR)
            }
        }
        const getOrderPickupByOrderId = async (orderId) => {
            const response = await getOrderPickupByOrderIdRequest(getToken(), orderId)
            setOrderPickup(response.data)
        }
        getOrderById()
    }, [])

    const changeOrderStatusHandler = async (orderStatus) => {
        //Если заказ не имеет текущих статусов, здесь с ним работа закончена
        if (order.status !== ORDER_STATUSES.CREATED && order.status !== ORDER_STATUSES.PICKED 
            && order.status !== ORDER_STATUSES.TAKEN) return
        try {
            const response = await changeOrderStatusRequest(order.id, orderStatus, getToken())
            setOrder(prev => ({...prev, status: response.data}))
            setStatus(STATUSES.IDLE)
        } catch (err) {
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }
    const createOrderPickupHandler = async () => {
        if (order?.status !== ORDER_STATUSES.PICKED) return 
        if (!DIGIT_REGEX.test(orderPickup.itemsCount)) {
            setStatus(STATUSES.VALIDATION_ERROR)
            return
        }
        try {
            const orderPickupData = orderPickup
            orderPickupData.orderId = order.id
            await createOrderPickupRequest(getToken(), orderPickupData)
            await changeOrderStatusHandler(ORDER_STATUSES.TAKEN)
            setStatus(STATUSES.SUCCESS)
        } catch(err) {
            setStatus(STATUSES.ERROR)
        }
    }
    const orderPickupHandler = async (e) => {
        const {name, value} = e.target
        setOrderPickup((prevData) => ({
            ...prevData,
            [name]: value
        }))
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
                            <div className="formTitle">
                            <p>Забрать заказ</p>
                            {status === STATUSES.VALIDATION_ERROR && <p className="errorText">Формат некоторых полей неверен</p>}
                            {status === STATUSES.SUCCESS && <p className="successText">Заказ успешно забран</p>}
                            </div>
                            <div className="formInputs">
                                <input type="number" step={1} min={1} required name = "itemsCount" placeholder="Количество" value={orderPickup.itemsCount} onChange={orderPickupHandler} />
                                <textarea name="comment" placeholder="Комментарий" value={orderPickup.comment} onChange={orderPickupHandler}/>
                                <button className={order?.status !== ORDER_STATUSES.PICKED && "blocked"} onClick={createOrderPickupHandler}>Забрать</button>
                                <button className={order?.status !== ORDER_STATUSES.TAKEN && "blocked"} onClick={() => changeOrderStatusHandler(ORDER_STATUSES.INSPECTION)}>Доставлено</button>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        </>
    )
}