import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { getItemsByOrderIdRequest } from "../../../services/api/itemApi"

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
            setStatus(STATUSES.LOADING)
            const response = await getOrderByIdRequest(param.get("id"), getToken())
            console.log(response.data)
            setOrder(response.data)
        }
        const getOrderTotalPrice = async () => {
            const response = await getItemsByOrderIdRequest(param.get("id"), getToken())
            console.log(response.data)
            setOrder(prev => ({...prev, totalPrice: response.data.reduce((acc, item) => acc + item.price, 0)}))
        }
        try {
            getOrderById()
            getOrderTotalPrice()
            setStatus(STATUSES.IDLE)
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
        
    }, [])
    const validateOrderStatus = () => {
        return order && (order.status === ORDER_STATUSES.READY || 
            order.status === ORDER_STATUSES.COMING || 
            order.status === ORDER_STATUSES.COMPLETED)
    }
    const isDataValid = () => {
        return (orderFinishData.itemsCount && orderFinishData.paymentMethod)
    }
    const finishOrder = async() => {
        if (!isDataValid()) return
        console.log(orderFinishData)
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
                        <input type="text" name="itemsCount" placeholder="Количество" onChange={handleFinishOrderData}/>
                        <textarea name="comment" placeholder="Дополнительная информация" rows={3} onChange={handleFinishOrderData}></textarea>
                        <button className={!isDataValid() && "blocked"} onClick={finishOrder}>Доставить заказ</button>
                    </div>
                </div>}
        </div>
    )
}