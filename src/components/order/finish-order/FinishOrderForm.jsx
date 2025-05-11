import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { getItemsByOrderIdRequest } from "../../../services/api/itemApi"
import { createOrderFinishRequest, getOrderFinishByOrderId } from "../../../services/api/orderFinishApi"
import { formateLocalDateForServer } from "../../../services/date/dateFormattes"

export const FinishOrderForm = () => {
    const [status, setStatus] = useState()
    const navigate = useNavigate()
    const {getToken} = useAuth()

    const [order, setOrder] = useState(null)
    const [orderFinishData, setOrderFinishData] = useState({paymentMethod:"", itemsCount: "", comment: ""})

    const [selectedOption, setSelectedOption] = useState()
    const handleFinishOrderData = (e) => {
        const {value, name} = e.target
        setOrderFinishData(prev => ({...prev, [name]: value}))
    }
    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) navigate(-1)
        const getOrderById = async () => {
            const response = await getOrderByIdRequest(param.get("id"), getToken())
            console.log(response.data)
            setOrder(response.data)
            setOrderFinishData(prev => ({...prev, orderId: response.data.id}))
        }
        //TODO Создать отдельный обьект в orderFinishData, со статистикой заказа, и использовать ее для
        //дополнения статистики курьера который выполнил заказ.
        const getOrderTotalPrice = async () => {
            const response = await getItemsByOrderIdRequest(param.get("id"), getToken())
            const items = response.data
            const totalPrice = items.reduce((acc, item) => acc + item.price, 0)
            const itemsArea = items.reduce((acc, item) => acc + item.size, 0)
            setOrder(prev => ({...prev, totalPrice: totalPrice}))
            setOrderFinishData(prev => ({...prev, orderCompleteData: {totalPrice: totalPrice, itemsArea: itemsArea, workDate: formateLocalDateForServer(new Date())}}))
        }
        const fetchData = async() => {
            try {
                setStatus(STATUSES.LOADING)
                await getOrderById()
                await getOrderTotalPrice()
                setStatus(STATUSES.IDLE)
            } catch(err) {
                console.error(err)
                setStatus(STATUSES.ERROR)
            }
        }
        fetchData()
        
    }, [])
    useEffect(()=> {
        if (!order || order.status !== ORDER_STATUSES.COMPLETED) return
        const getOrderFinishData = async() => {
            const response = await getOrderFinishByOrderId(getToken(), order.id)
            if (response.data === null) return
            setOrderFinishData(response.data)
        }
        getOrderFinishData()
    }, [order])
    const validateOrderStatus = () => {
        return order && (order.status === ORDER_STATUSES.READY || 
            order.status === ORDER_STATUSES.COMING || 
            order.status === ORDER_STATUSES.COMPLETED)
    }
    const isDataValid = () => {
        return (orderFinishData.itemsCount && orderFinishData.paymentMethod)
    }
    const isOrderCompleted = () => {
        return order.status === ORDER_STATUSES.COMPLETED
    }
    const finishOrder = async() => {
        if (!isDataValid() || isOrderCompleted()) return
        try{
            const response = await createOrderFinishRequest(getToken(), orderFinishData)
            const statusResponse = await changeOrderStatusRequest(order.id, ORDER_STATUSES.COMPLETED, getToken())
            setOrder(prev => ({...prev, status: statusResponse.data}))
            setStatus(STATUSES.SUCCESS)
            setTimeout(()=> {setStatus(STATUSES.IDLE)}, 5000)
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
    }
    const takeOrder = async () => {
        if (order.status !== ORDER_STATUSES.READY) return
        try {
            const response = await changeOrderStatusRequest(order.id, ORDER_STATUSES.COMING, getToken())
            setOrder(prev => ({...prev, status:response.data}))
            setStatus(STATUSES.SUCCESS)
            setTimeout(()=> {setStatus(STATUSES.IDLE)}, 5000)
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
    }
    return (
        <div className="contentWrapper">
            {status === STATUSES.LOADING && <div className="loadingBar"> </div>}
            {(order && !validateOrderStatus())&& <p>Заказ пока не готов к отправке</p>}
            {validateOrderStatus() && 
                <div className="formWrapper">
                    <div className="form">
                        <div className="formTitle">
                            <h4>Форма выдачи</h4>
                            {status === STATUSES.ERROR && <p className="errorText">Возникла ошибка</p>}
                            {status === STATUSES.SUCCESS && <p className="successText">Успешно</p>}
                        </div>
                        <div className="formInputs">
                            <p>ФИО: {`${order.clientName} ${order.clientSecondName} ${order.clientPatronymic}`}</p>
                            <p>Номер телефона: {order.clientPhone}</p>
                            <p>Адрес: {order.address}</p>
                            <p>Итоговая сумма заказа: {order.totalPrice}₽</p>
                        </div>
                        <label>
                            <input type="radio" name="paymentMethod" value={"CASHLESS"} onChange={handleFinishOrderData} checked={orderFinishData.paymentMethod === "CASHLESS"} />
                            <span className="custom-radio"></span>
                            Оплата по карте
                        </label>
                        <label >
                            <input type="radio" name="paymentMethod" value={"CASH"} onChange={handleFinishOrderData} checked={orderFinishData.paymentMethod === "CASH"} />
                            <span className="custom-radio"></span>
                            Оплата наличными
                        </label>
                        <input type="text" name="itemsCount" placeholder="Количество" onChange={handleFinishOrderData} value={orderFinishData.itemsCount}/>
                        <textarea name="comment" placeholder="Дополнительная информация" rows={3} onChange={handleFinishOrderData} value={orderFinishData.comment}></textarea>
                        <button className={order.status !== ORDER_STATUSES.READY && "blocked"} onClick={takeOrder}>Забрать заказ</button>
                        <button className={(!isDataValid() || isOrderCompleted() || order.status !== ORDER_STATUSES.COMING ) && "blocked"} onClick={finishOrder}>Доставить заказ</button>
                    </div>
                </div>}
        </div>
    )
}