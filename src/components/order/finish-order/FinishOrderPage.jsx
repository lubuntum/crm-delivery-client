import "../css/order_finish_style.css"

import { ReactComponent as CrmPersonIcon } from "../../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmPaymentIcon } from "../../../res/icons/crm_payment_icon.svg"
import { ReactComponent as CrmAddressIcon } from "../../../res/icons/crm_location_icon.svg"
import { ReactComponent as CrmQuantityIcon } from "../../../res/icons/crm_replay_icon.svg"
import { ReactComponent as CrmCommentaryIcon } from "../../../res/icons/crm_comment_icon.svg"
import { ReactComponent as CopyIcon} from "../../../res/icons/copy_icon.svg"
import { useAuth } from "../../../services/auth/AuthProvider"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { getItemsByOrderIdRequest } from "../../../services/api/itemApi"
import { formateLocalDateForServer } from "../../../services/date/dateFormattes"
import { createOrderFinishRequest, getOrderFinishByOrderId } from "../../../services/api/orderFinishApi"
import { Loader } from "../../loader/Loader"
import { copyToClipboard } from "../../util/copyToClipboard"
import { SERVER_URL } from "../../../services/api/urls"

export const FinishOrderPage = () => {
    const navigate = useNavigate()

    const { getToken } = useAuth()

    const [status, setStatus] = useState()
    const [order, setOrder] = useState(null)
    const [completeOrder, setCompleteOrder] = useState({
        paymentMethod: "",
        itemsCount: "",
        comment: "",
        tips: "",
        deliveryPrice: "",
        completionUrl: ""
    })

    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        const orderId = param.get("id")
        if (!orderId) navigate(-1)

        const fetchOrder = async () => {
            setStatus(STATUSES.LOADING)
            try {
                await getOrderById()
                await getOrderTotalPrice()
                setStatus(STATUSES.IDLE)
            } catch (err) {
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                setStatus(STATUSES.ERROR)
                console.error(err)
            }
        }

        const getOrderById = async () => {
            const response = await getOrderByIdRequest(orderId, getToken())
            setOrder(response.data)
            setCompleteOrder(prev => ({...prev, orderId: response.data.id}))
        }

        const getOrderTotalPrice = async () => {
            const response = await getItemsByOrderIdRequest(orderId, getToken())
            const items = response.data
            const totalPrice = items.reduce((acc, item) => acc + item.price, 0)
            const itemsArea = items.reduce((acc, item) => acc + item.size, 0)
            setOrder(prev => ({...prev, totalPrice: totalPrice}))
            setCompleteOrder(prev => ({...prev, orderCompleteData: {totalPrice: totalPrice, itemsArea: itemsArea, workDate: formateLocalDateForServer(new Date())}}))
        }

        fetchOrder()
    }, [getToken])

    useEffect(() => {
        if (!order || order.status !== ORDER_STATUSES.COMPLETED) return

        const getCompleteOrderData = async () => {
            const response = await getOrderFinishByOrderId(getToken(), order.id)
            if (response.data === null) return
            setCompleteOrder(response.data)
        }

        getCompleteOrderData()
    }, [order])

    const validateOrderStatus = () => {
        return order &&
        (order.status === ORDER_STATUSES.READY ||
         order.status === ORDER_STATUSES.COMING ||
         order.status === ORDER_STATUSES.COMPLETED)
    }

    const isDataValid = () => {
        return completeOrder.itemsCount && completeOrder.paymentMethod
    }

    const isOrderComplted = () => {
        return order.status === ORDER_STATUSES.COMPLETED
    }

    const handleCompleteOrder = (e) => {
        if (isOrderComplted()) return
        const { value, name } = e.target
        setCompleteOrder(prev => ({...prev, [name]: value}))
    }

    const handleTakeOrder = async () => {
        if (order.status !== ORDER_STATUSES.READY) return

        try {
            const response = await changeOrderStatusRequest(order.id, ORDER_STATUSES.COMING, getToken())
            setOrder(prev => ({...prev, status: response.data}))
            toast.success("Заказ успешно забран!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.SUCCESS)
            setTimeout(() => {setStatus(STATUSES.IDLE)}, 5000)
        } catch (err) {
            toast.error("Ошибка при попытке забрать заказ!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    const handleComplteOrder = async () => {
        if (!isDataValid() || isOrderComplted()) return

        try {
            const response = await createOrderFinishRequest(getToken(), completeOrder)
            const statusResponse = await changeOrderStatusRequest(order.id, ORDER_STATUSES.COMPLETED, getToken())
            setOrder(prev => ({...prev, status: statusResponse.data}))
            toast.success("Заказ успешно доставлен!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.SUCCESS)
            setTimeout(() => {setStatus(STATUSES.IDLE)}, 5000)
        } catch (err) {
            toast.error("Ошибка при попытке доставки заказа!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }
    const copyServiceProvisionLink = (url) => {
        console.log(url, order.status)
        if (!url || order.status !== ORDER_STATUSES.COMPLETED) {
            toast.error("Завершите заказ для формирования документа", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        try {
            copyToClipboard(url)
            toast.success("Заказ успешно доставлен!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            toast.error("Ошибка при попытке доставки заказа!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }

    }

    return (
        <div className="contentWrapper">
            <div className="orderFinishWrapper">
                <div className="pageTitle">
                    <p>Завершение заказа</p>
                </div>

                {status === STATUSES.LOADING ? 
                <div className="orderLoadingContainer">
                    <Loader/>
                </div> : <>

                {!validateOrderStatus() &&
                <div className="orderFinishNotComplete">
                    <p>Заказ пока не готов к отправке</p>
                </div>}
                
                {validateOrderStatus() && <>
                <div className="orderFinishInputs">
                    <div className="orderFinishBioContainer">
                        <div className="orderFinishTitle">
                            <p>Данные заказчика</p>
                        </div>

                        <div className="bioItem">
                            <CrmPersonIcon className="svgIcon" />
                            <p>{`${order.clientName} ${order.clientSecondName} ${order.clientPatronymic}`}</p>
                        </div>

                        <div className="bioItem">
                            <CrmPhoneIcon className="svgIcon" />
                            <p>{order.clientPhone}</p>
                        </div>

                        <div className="bioItem">
                            <CrmAddressIcon className="svgIcon" />
                            <p>{order.address}</p>
                        </div>

                        <div className="bioItem">
                            <CrmPaymentIcon className="svgIcon" />
                            <p>{Number(order.totalPrice) + Number(completeOrder.tips) + Number(completeOrder.deliveryPrice)} ₽</p>
                        </div>
                    </div>
                    <div className="orderFinishInputsContainer">
                        <div className="orderFinishTitle">
                            <p>Для курьера</p>
                        </div>
                        <input className="customInput" placeholder="Доставка ₽ (опционально)" type="number" value={completeOrder.deliveryPrice} onChange={handleCompleteOrder} name="deliveryPrice"/>
                        <input className="customInput" placeholder="Чаевые ₽ (опционально)" type="number" value={completeOrder.tips} onChange={handleCompleteOrder} name="tips"/>
                    </div>
                    <div className="orderFinishPaymentTypeContainer">
                        <div className="orderFinishTitle">
                            <p>Тип оплаты</p>
                        </div>
                        
                        <label className="customRadio">
                            <input type="radio" 
                                    name="paymentMethod" 
                                    value={"CASHLESS"}
                                    onChange={handleCompleteOrder}
                                    checked={completeOrder.paymentMethod === "CASHLESS"}/>
                            <div className="customRadioSelect"></div>
                            <p>Оплата по карте</p>
                        </label>
                        <label className="customRadio">
                            <input type="radio" 
                                    name="paymentMethod" 
                                    value={"CASH"}
                                    onChange={handleCompleteOrder}
                                    checked={completeOrder.paymentMethod === "CASH"}/>
                            <div className="customRadioSelect"></div>
                            <p>Оплата наличными</p>
                        </label>
                        <label className="customRadio">
                            <input type="radio" 
                                    name="paymentMethod" 
                                    value={"KIND"}
                                    onChange={handleCompleteOrder}
                                    checked={completeOrder.paymentMethod === "KIND"}/>
                            <div className="customRadioSelect"></div>
                            <p>Оплата натурой</p>
                        </label>
                    </div>

                    <div className="orderFinishInputsContainer">
                        <div className="orderFinishTitle">
                            <p>Доп. информация</p>
                        </div>

                        <div className="cutomInputContainer">
                            <input className="customInput"
                                type="text"
                                name="itemsCount"
                                placeholder="Количество элементов заказа"
                                onChange={handleCompleteOrder}
                                value={completeOrder.itemsCount}
                                required />
                            <CrmQuantityIcon className="svgIcon" />
                        </div>

                        <div className="cutomTextareaContainer">
                            <textarea className="customTextarea"
                                placeholder="Комментарий"
                                name="comment"
                                onChange={handleCompleteOrder}
                                value={completeOrder.comment}
                                required
                                rows={5} />
                            <CrmCommentaryIcon className="svgIcon" />
                        </div>
                    </div>
                </div>

                <div className="orderFinishButtons">
                    <button className={`customButton ${order.status !== ORDER_STATUSES.READY ? "disabledButton" : ""}`}
                            disabled={order.status !== ORDER_STATUSES.READY}
                            onClick={handleTakeOrder}>
                        Забрать заказ
                    </button>

                    <button className={`customButton ${(!isDataValid() || isOrderComplted() || order.status !== ORDER_STATUSES.COMING) ? "disabledButton" : ""}`}
                            disabled={(!isDataValid() || isOrderComplted() || order.status !== ORDER_STATUSES.COMING)}
                            onClick={handleComplteOrder}>
                        Доставить заказ
                    </button>
                    <div className="serviceProvision">
                        <button className={`customButton ${order.status !== ORDER_STATUSES.COMPLETED ? "disabledButton" : ""}`}
                                disabled= {order.status !== ORDER_STATUSES.COMPLETED}
                                onClick={() => {copyServiceProvisionLink(`${SERVER_URL}/${completeOrder.completionUrl}`)}}>
                            Акт оказания услуги <CopyIcon className="svgIcon" />
                        </button>
                    </div>
                    
                </div></>}</>}

                <Toaster position="bottom-center" reverseOrder={false}/>
            </div>
        </div>
    )
}