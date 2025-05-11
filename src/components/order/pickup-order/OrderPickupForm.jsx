import { useEffect, useState } from "react"
import "../../../styles/orders/create_order_page/create_order.css"
import "../../../styles/orders/order_pickup/order_pickup.css"
import "../../../styles/float_component/float_component.css"
import { useLocation, useNavigate, useNavigation } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { ROUTES } from "../../../routes"
import { DIGIT_REGEX } from "../../../services/validation/validationRegexes"
import { createOrderPickupRequest, getOrderPickupByOrderIdRequest } from "../../../services/api/orderPickupApi"
import { OrderImagesViewer } from "../OrderImagesViewer"
//TODO передать путь изоборажений и их контекст в imageViewer смотир метод navigateToImageViewer, пока не правильно
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
    const [images, setImages] = useState([])
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [showImages, setShowImages] = useState(false)
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
    const imagesChangeHandler = (e) => {
        setImages(Array.from(e.target.files))
    }
    const navigateToImageViewer = () => {
        if (!orderPickup.orderImages) return
        setShowImages(true)
    }
    const changeOrderStatusHandler = async (orderStatus) => {
        //Если заказ не имеет текущих статусов, здесь с ним работа закончена
        if (order.status !== ORDER_STATUSES.CREATED && order.status !== ORDER_STATUSES.PICKED 
            && order.status !== ORDER_STATUSES.TAKEN) return
        try {
            const response = await changeOrderStatusRequest(order.id, orderStatus, getToken())
            setOrder(prev => ({...prev, status: response.data}))
            setStatus(STATUSES.SUCCESS)
            setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
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
            await createOrderPickupRequest(getToken(), orderPickupData, images)
            const orderStatusResponse = await changeOrderStatusRequest(order.id, ORDER_STATUSES.TAKEN, getToken())
            //После создания данных о заборе заказа и смене статуса загружаем обновленные данные
            const updatedOrderPickup = await getOrderPickupByOrderIdRequest(getToken(), order.id)
            setOrderPickup(updatedOrderPickup.data)
            setOrder(prev => ({...prev, status: orderStatusResponse.data}))
            setStatus(STATUSES.SUCCESS)
            setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
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
            {showImages && <OrderImagesViewer images={orderPickup.orderImages} imagesContentType={"Вывоз заказа от клиента"} setShowImages={setShowImages} />}
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
                            <h4>Забрать заказ</h4>
                            {status === STATUSES.VALIDATION_ERROR && <p className="errorText">Формат некоторых полей неверен</p>}
                            {status === STATUSES.SUCCESS && <p className="successText">Успешно</p>}
                            </div>
                            <div className="formInputs">
                                <input type="number" step={1} min={1} required name = "itemsCount" placeholder="Количество" value={orderPickup.itemsCount} onChange={orderPickupHandler} />
                                <textarea name="comment" placeholder="Комментарий" value={orderPickup.comment} onChange={orderPickupHandler}/>
                                <div className="imgBtnsRow">
                                    <input disabled={order?.status !== ORDER_STATUSES.PICKED} type="file" multiple onChange={imagesChangeHandler} accept="image/*"/>
                                    <button className={(!orderPickup?.orderImages || orderPickup?.orderImages?.length === 0) && "blocked"} onClick={navigateToImageViewer}>Просмотреть все фото</button>
                                </div>
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