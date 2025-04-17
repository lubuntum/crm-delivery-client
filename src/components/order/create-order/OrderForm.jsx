import { useEffect, useState } from "react"
import "../../../styles/statuses/statuses.css"
import "../../../styles/orders/create_order_page/create_order.css"
import { useLocation } from "react-router-dom"
import { STATUSES } from "../../../statuses"
import { EMAIL_REGEX } from "../../../services/validation/validationRegexes"
import { createOrderRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
export const OrderForm = () => {
    const {getToken} = useAuth()
    const [status, setStatus] = useState({name: STATUSES.IDLE, message: ""})
    const [isView, setIsView] = useState(false)
    const location = useLocation()

    const [errorMessage, setErrorMessage] = useState("")
    const [order, setOrder] = useState({
        address: "", 
        comment: "",
        clientName: "",
        clientSecondName: "",
        clientPatronymic: "",
        clientFullName: "",
        clientEmail: "",
        clientPhone: ""
    })
    useEffect(()=>{
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) return
        setIsView(true)
        const getOrderById = async () => {
            try {
                setStatus(STATUSES.LOADING)
                const response = await getOrderByIdRequest(param.get("id"), getToken())
                const orderTemp = response.data
                orderTemp.clientFullName = `${orderTemp.clientSecondName} ${orderTemp.clientName} ${orderTemp.clientPatronymic}`
                setOrder(orderTemp)
                setStatus(STATUSES.IDLE)
            } catch(err) {
                setStatus(STATUSES. ERROR)
            }
        }
        getOrderById()
        
    }, [])
    const createOrderHandler = async () => {
        try {
            const orderData = getFormattedOrderData()
            console.log(orderData)
            if (orderData.clientPhone.length !== 11) {
                setStatus({name: STATUSES.ERROR, message: "Введите номер в нужном формате"})
                return
            }
            if (orderData.clientEmail && !orderData.clientEmail.match(EMAIL_REGEX)) {
                setStatus({name: STATUSES.ERROR, message: "Введите почту корректно"})
                return
            }
            await createOrderRequest(orderData, getToken())
            setStatus(STATUSES.SUCCESS)
            resetForm()
        } catch(err) {
            setStatus({name: STATUSES.ERROR, message: "Ошибка при отправке формы"})
        }
    }
    const orderDataHandler = (e) => {
        const {name, value} = e.target
        setOrder((prevData) => ({
            ...prevData, 
            [name]: value
        }))
    }
    const getFormattedOrderData = () => {
        const {clientFullName, ...orderData} = order
        const [clientSecondName, clientName , clientPatronymic] = clientFullName.split(" ")
        if (!clientSecondName || !clientName || !clientPatronymic ) return null
        orderData.clientName = clientName
        orderData.clientSecondName = clientSecondName
        orderData.clientPatronymic = clientPatronymic
        return orderData
    }
    const resetForm = () => {
        setOrder({
            address: "", 
            comment: "",
            clientName: "",
            clientSecondName: "",
            clientPatronymic: "",
            clientFullName: "",
            clientEmail: "",
            clientPhone: ""
        })
        setTimeout(()=>{
            setStatus(STATUSES.IDLE)
        }, 5000)
    }
    return (
        <>
        <div className="contentWrapper">
            <div className="formWrapper">
                <div className="form">
                {status === STATUSES.LOADING && <div className="loadingBar"></div>}
                    <div className="formTitle">
                        {status.name === STATUSES.ERROR ? <p className="errorText"> {status.message}</p> : <p>Форма заказа</p> }
                    </div>
                    <div className="formInputs">
                        <input type="text" value = {order.clientFullName}placeholder="ФИО" name="clientFullName" onChange={orderDataHandler}/>
                        <input type="text" value = {order.clientPhone} placeholder="Номер телефона" name="clientPhone" onChange={orderDataHandler}/>
                        <input type="text" value = {order.clientEmail} placeholder="Почта (опционально)" name="clientEmail" onChange={orderDataHandler}/>
                        <input type="text" value = {order.address} placeholder="Адрес" name="address" onChange={orderDataHandler}/>
                        <textarea rows={5} value = {order.comment} placeholder="Комментарий" name="comment" onChange={orderDataHandler}/>
                        {!isView ? 
                            <button className={status === STATUSES.SUCCESS && "successBtn"} onClick={createOrderHandler} disabled = {status === STATUSES.SUCCESS}>
                                {status === STATUSES.SUCCESS ? "Создано" : "Создать"} 
                            </button> :
                            
                            <button className="blocked">Созданный заказ</button>}
                        
                    </div>
                </div>
                
            </div>     
        </div>
            
        </>
    )
}