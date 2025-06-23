import "../css/order_pickup_style.css"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../services/auth/AuthProvider"
import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { createOrderPickupRequest, getOrderPickupByOrderIdRequest, updateOrderPickupRequest } from "../../../services/api/orderPickupApi"

import { ReactComponent as CrmReplayIcon } from "../../../res/icons/crm_replay_icon.svg"
import { ReactComponent as CrmCommentIcon } from "../../../res/icons/crm_comment_icon.svg"
import { ReactComponent as CrmImagesIcon } from "../../../res/icons/crm_image_library_icon.svg"
import { OrderImagesPopup } from "./OrderImagesPopup"
import { Loader } from "../../loader/Loader"
import { DIGIT_REGEX } from "../../../services/validation/validationRegexes"

export const OrderPickupPage = () => {
    const navigate = useNavigate()

    const { getToken } = useAuth()

    const [isEdit, setIsEdit] = useState(false)

    const [order, setOrder] = useState()
    const [images, setImages] = useState([])
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [showImages, setShowImages] = useState(false)

    const [orderPickup, setOrderPickup] = useState({
        itemsCount: "",
        comment: "",
        orderId: null
    })

    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        const orderId = param.get("id")
        if (!orderId) navigate(-1)

        const fetchOrder = async () => {
            setStatus(STATUSES.LOADING)
            try {
                const response = await getOrderByIdRequest(orderId, getToken())
                const orderTemp = response.data
                setOrder(orderTemp)
                if (orderTemp.status !== ORDER_STATUSES.PICKED &&
                    orderTemp.status !== ORDER_STATUSES.CREATED) await getOrderPickupByOrderId(orderTemp.id)
                setStatus(STATUSES.IDLE)
            } catch (err) {
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                setStatus(STATUSES.ERROR)
                console.error(err)
            }
        }

        const getOrderPickupByOrderId = async (orderId) => {
            const response = await getOrderPickupByOrderIdRequest(getToken(), orderId)
            setOrderPickup(response.data)
        }
        fetchOrder()
    }, [getToken])

    const handleChangeOrderStatus = async (orderStatus) => {
        if (order.status !== ORDER_STATUSES.CREATED &&
            order.status !== ORDER_STATUSES.PICKED &&
            order.status !== ORDER_STATUSES.TAKEN) return
        
        try {
            const response = await changeOrderStatusRequest(order.id, orderStatus, getToken())
            setOrder(prev => ({...prev, status: response.data}))
            setStatus(STATUSES.SUCCESS)
            setTimeout(() => setStatus(STATUSES.IDLE), 500)
        } catch (err) {
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    const handleImagesChange = (e) => {
        setImages(Array.from(e.target.files))
    }

    const handleImageViewer = () => {
        if (!orderPickup.orderImages) return
        setShowImages(true)
    }

    const handleCreateOrderPickup = async () => {
        if (order?.status !== ORDER_STATUSES.PICKED) return
        if (!DIGIT_REGEX.test(orderPickup.itemsCount)) {
            toast.error("Неверно указано количество!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.VALIDATION_ERROR)
            return
        }

        try {
            const pickupOrderData = orderPickup
            pickupOrderData.orderId = order.id
            await createOrderPickupRequest(getToken(), pickupOrderData, images)
            const response = await changeOrderStatusRequest(order.id, ORDER_STATUSES.TAKEN, getToken())
            const updateOrderPickup = await getOrderPickupByOrderIdRequest(getToken(), order.id)
            setOrderPickup(updateOrderPickup.data)
            setOrder(prev => ({...prev, status: response.data}))
            setImages([])
            toast.success("Заказ успешно забран!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.SUCCESS)
            setTimeout(() => setStatus(STATUSES.IDLE), 5000)
        } catch (err) {
            toast.error("Ошибка при попытке забрать заказ!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    const handleUpdateOrderPickup = async() => {
        if (order?.status === ORDER_STATUSES.CREATED || order?.status === ORDER_STATUSES.PICKED || !isEdit) return
        try {
            await updateOrderPickupRequest(getToken(), orderPickup)
            setIsEdit(false)
            toast.success("Заказ успешно забран!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Ошибка при попытке забрать заказ!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }

    const handleOrderPickup = async (e) => {
        const { name, value } = e.target
        setOrderPickup((prevData) => ({
            ...prevData,
            [name]: value
        }))
        setIsEdit(true)
    }

    return (
        <div className="contentWrapper">
            <div className="orderPickupWrapper">
                <div className="pageTitle">
                    <p>Взять заказ</p>
                </div>

                {showImages && 
                <OrderImagesPopup images={orderPickup.orderImages}
                                  imagesContentType={"Изображения к заказу"}
                                  setShowImages={setShowImages}/>}

                {status === STATUSES.LOADING ? 
                <div className="orderLoadingContainer">
                    <Loader/>
                </div> : 
                <>
                {order && order.status === ORDER_STATUSES.CREATED &&
                <div className="orderPickupContainer">
                    <div className="orderPickupInputs">
                        <p>Хотите начать работу с текущим заказом?</p>
                        <button className="customButton" onClick={() => handleChangeOrderStatus(ORDER_STATUSES.PICKED)}>Взять заказ</button>
                    </div>   
                </div>}

                {!showImages && (order && order.status !== ORDER_STATUSES.CREATED) &&
                <div className="orderPickupContainer">
                    <div className="orderPickupInputs">
                        <div className="cutomInputContainer">
                            <input className="customInput" 
                                   name="itemsCount"
                                   type="number"
                                   step={1} 
                                   min={1}
                                   placeholder="Количество"
                                   value={orderPickup.itemsCount}
                                   onChange={handleOrderPickup}
                                   required/>
                                <CrmReplayIcon className="svgIcon"/>
                        </div>

                        <div className="cutomTextareaContainer">
                            <textarea className="customTextarea"
                                      placeholder="Комментарий"
                                      name="comment"
                                      value={orderPickup.comment}
                                      onChange={handleOrderPickup}
                                      rows={5}
                                      required/>
                            <CrmCommentIcon className="svgIcon"/>
                        </div>

                        <div className="orderPickupImagesButton">
                            <div className="customFileUploadContainer">
                                <label className={`customFileUploadLabel ${order?.status !== ORDER_STATUSES.PICKED ? "customFileUploadLabelDisabled" : ""}`}
                                        htmlFor="customFileUploadInputOrderPickup">Выбрать изображения ({images && images.length})</label>
                                <input id="customFileUploadInputOrderPickup"
                                        disabled={order.status !== ORDER_STATUSES.PICKED}
                                        type="file"
                                        multiple
                                        onChange={handleImagesChange}
                                        accept="image/*"/>
                            </div>

                            <button className={`customButton ${(!orderPickup?.orderImages || orderPickup?.orderImages?.length === 0) && "imagesDisabledButton"}`}
                                    disabled={(!orderPickup?.orderImages || orderPickup?.orderImages?.length === 0)}
                                    onClick={handleImageViewer}>
                                <CrmImagesIcon className="svgIcon"/>
                            </button>
                        </div>
                    </div>  

                    <button className={`customButton ${order?.status !== ORDER_STATUSES.PICKED && "disabledButton"}`}
                            disabled={order?.status !== ORDER_STATUSES.PICKED}
                            onClick={handleCreateOrderPickup}>
                        {order?.status === ORDER_STATUSES.PICKED ? "Забрать заказ" : "Заказ уже забран"}
                    </button>
                    
                    <button className={`customButton ${order?.status !== ORDER_STATUSES.TAKEN && "disabledButton"}`}
                            disabled={order?.status !== ORDER_STATUSES.TAKEN}
                            onClick={() => handleChangeOrderStatus(ORDER_STATUSES.INSPECTION)}>
                        {(order?.status !== ORDER_STATUSES.PICKED && order?.status !== ORDER_STATUSES.TAKEN) ? "Заказ уже доставлен" : "Доставить заказ"}
                    </button>
                    <button className={`customButton ${order?.status === ORDER_STATUSES.CREATED || order?.status === ORDER_STATUSES.PICKED || !isEdit  ? "disabledButton" : ""}`}
                            onClick={handleUpdateOrderPickup}>Применить изменения</button>
                </div>}</>}

                <Toaster position="bottom-center" reverseOrder={false}/>
            </div>
        </div>
    )
}