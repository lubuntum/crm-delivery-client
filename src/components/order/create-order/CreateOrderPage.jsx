import "../css/order_form_style.css"

import { ReactComponent as CrmPersonIcon } from "../../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmEmailIcon } from "../../../res/icons/crm_email_icon.svg"
import { ReactComponent as CrmAddressIcon } from "../../../res/icons/crm_location_icon.svg"
import { ReactComponent as CrmCommentaryIcon } from "../../../res/icons/crm_comment_icon.svg"

import { useAuth } from "../../../services/auth/AuthProvider"
import { useEffect, useState } from "react"
import { createOrderRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { toast, Toaster } from "react-hot-toast"
import { EMAIL_REGEX } from "../../../services/validation/validationRegexes"
import { STATUSES } from "../../../statuses"
import { Loader } from "../../loader/Loader"

export const CreateOrderPage = () => {
    const { getToken } = useAuth()
    const [isView, setIsView] = useState(false)
    const [status, setStatus] = useState(STATUSES.IDLE)

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

    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        const orderId = param.get("id")
        if (!orderId) return

        setIsView(true)
        const fetchOrder = async () => {
            setStatus(STATUSES.LOADING)
            try {
                const response = await getOrderByIdRequest(orderId, getToken())
                const { clientSecondName, clientName, clientPatronymic, ...rest } = response.data
                setOrder({
                    ...rest,
                    clientFullName: `${clientSecondName} ${clientName} ${clientPatronymic}`
                })
                setStatus(STATUSES.IDLE)
            } catch (err) {
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                setStatus(STATUSES.ERROR)
                console.error(err)
            }
        }
        fetchOrder()
    }, [getToken])

    const handleCreateOrder = async () => {
        const orderData = getFormattedOrderData()
        if (!orderData) {
            toast.error("Поля не заполнены!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }

        if (orderData.clientPhone.length !== 11) {
            toast.error("Неверный формат номера телефона!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }

        if (orderData.clientEmail && !orderData.clientEmail.match(EMAIL_REGEX)) {
            toast.error("Неверный формат почты!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }

        if (!orderData.address) {
            toast.error("Адрес не введен!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }

        try {
            await createOrderRequest(orderData, getToken())
            toast.success("Форма успешно создана!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.SUCCESS)
            handleResetForm()
        } catch(err) {
            toast.error("Ошибка отправки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.ERROR)
        }
    }

    const handleOrderData = (e) => {
        const { name, value } = e.target
        setOrder((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const getFormattedOrderData = () => {
        const { clientFullName, ...orderData } = order
        const [clientSecondName, clientName, clientPatronymic] = clientFullName.split(" ")
        if (!clientSecondName || !clientName || !clientPatronymic) return null
        return {
            ...orderData,
            clientName,
            clientSecondName,
            clientPatronymic
        }
    }

    const handleResetForm = () => {
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
    const handlePhoneCall = () => {
        if (!isView) return
        window.location.href = `tel:${order.clientPhone}`
    }

    return (
        <div className="contentWrapper">
            <div className="orderFormWrapper">
                <div className="pageTitle">
                    <p>Заявка</p>
                </div>

                {status === STATUSES.LOADING ? 
                <div className="orderLoadingContainer">
                    <Loader/>
                </div> : 

                <div className="orderFormContainer">
                    <div className="orderFromInputs">
                        <div className="cutomInputContainer">
                            <input className="customInput"
                                type="text"
                                placeholder="ФИО"
                                value={order.clientFullName}
                                name="clientFullName"
                                required 
                                onChange={handleOrderData}/>
                            <CrmPersonIcon className="svgIcon"/>
                        </div>

                        <div className="cutomInputContainer">
                            <input className="customInput"
                                type="text"
                                placeholder="Номер телефона"
                                value={order.clientPhone}
                                name="clientPhone"
                                required
                                onChange={handleOrderData}/>
                            <CrmPhoneIcon className="svgIcon" onClick={handlePhoneCall}/>
                        </div>

                        <div className="cutomInputContainer">
                            <input className="customInput"
                                type="text"
                                placeholder="Электронная почта (Опционально)"
                                value={order.clientEmail}
                                name="clientEmail"
                                required
                                onChange={handleOrderData}/>
                            <CrmEmailIcon className="svgIcon"/>
                        </div>

                        <div className="cutomInputContainer">
                            <input className="customInput"
                                type="text"
                                placeholder="Адрес"
                                value={order.address}
                                name="address"
                                required
                                onChange={handleOrderData}/>
                            <CrmAddressIcon className="svgIcon"/>
                        </div>

                        <div className="cutomTextareaContainer">
                            <textarea className="customTextarea"
                                placeholder="Комментарий"
                                value={order.comment}
                                name="comment"
                                required
                                rows={5}
                                onChange={handleOrderData}/>
                            <CrmCommentaryIcon className="svgIcon"/>
                        </div>
                    </div>
                    
                    {!isView ? 
                    <button className="customButton" onClick={handleCreateOrder}>
                        {status === STATUSES.SUCCESS ? "Успешно" : "Создать заказ"}
                    </button> :
                    <button className="customButton disabledButton" disabled = {status === STATUSES.SUCCESS}>
                        Заказ уже создан
                    </button>}
                </div>}

                <Toaster position="bottom-center" reverseOrder={false}/>
            </div>
        </div>
    )
}