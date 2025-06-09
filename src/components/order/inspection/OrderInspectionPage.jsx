import { useNavigate } from "react-router-dom"
import { useAuth } from "../../../services/auth/AuthProvider"
import "../css/order_inspection_style.css"
import { use, useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { OrderInspectionList } from "./OrderInspectionList"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { getItemsByOrderIdRequest } from "../../../services/api/itemApi"
import { createOrderInspectionRequest, getOrderInspectionByOrderIdRequest } from "../../../services/api/orderInspectionApi"
import { Loader } from "../../loader/Loader"

export const OrderInspectionPage = () => {
    const navigate = useNavigate()

    const { getToken } = useAuth()

    const [status, setStatus] = useState(STATUSES.IDLE)
    const [order, setOrder] = useState(null)
    const [orderInspection, setOrderInspection] = useState(null)
    const [orderItems, setOrderItems] = useState([])
    const [item, setItem] = useState({
        materialId: null,
        size: 0,
        price: 0,
        width: 0,
        height: 0,
        pricePerUnit: 0,
        additionalPrice: 0,
        comment: "",
        isReady: false
    })

    useEffect(() => {
        const param = new URLSearchParams(window.location.search)
        const orderId = param.get("id")
        if (!orderId) navigate(-1)

        const fetchOrder = async () => {
            setStatus(STATUSES.LOADING)
            try {
                getOrderById()
                getItemsByOrderId()
            } catch (err) {
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                setStatus(STATUSES.ERROR)
                console.error(err)
            }
        }

        const getOrderById = async () => {
            const response = await getOrderByIdRequest(orderId, getToken())
            setOrder(response.data)
            setStatus(STATUSES.IDLE)
        }

        const getItemsByOrderId = async () => {
            const response = await getItemsByOrderIdRequest(orderId, getToken())
            setOrderItems(response.data.sort((a, b) => {
                if (a.materialName < b.materialName) return -1
                if (a.materialName > b.materialName) return 1
                return 0
            }))
        }
        fetchOrder()
    }, [getToken])

    useEffect(() => {
        const fetchInspection = async () => {
            try {
                const response = await getOrderInspectionByOrderIdRequest(getToken(), order.id)
                setOrderInspection(response.data)
            } catch (err) {
                console.error(err)
            }
        }
        fetchInspection()
    }, [order])

    const checkOrderPrevStatus = () => {
        return (order && (order.status === ORDER_STATUSES.CREATED ||
                          order.status === ORDER_STATUSES.PICKED ||
                          order.status === ORDER_STATUSES.TAKEN))
    }

    const completeInspection = async () => {
        try {
            await createOrderInspectionRequest({ orderId: order.id, itemsCount: orderItems.length }, getToken())
            const response = await changeOrderStatusRequest(order.id, ORDER_STATUSES.READY, getToken())
            setOrder(prev => ({...prev, status: response.data}))
            toast.success("Заказ успешно проверен!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch (err) {
            toast.error("Ошибка при завершении проверки заказа!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            setStatus(STATUSES.ERROR)
            console.error(err)
        }
    }

    return (
        <div className="contentWrapper">
            <div className="orderInspectionWrapper">
                <div className="pageTitle">
                    <p>Проверка заказа</p>
                </div>

                {status === STATUSES.LOADING ?
                <div className="orderLoadingContainer">
                    <Loader/>
                </div> : 

                <OrderInspectionList orderItems={orderItems}
                                     orderInspection={orderInspection}
                                     order={order}
                                     completeInspection={completeInspection}
                                     setItem={setItem}
                                     item={item}
                                     setOrderItems={setOrderItems}/>}
                                     
                <Toaster position="bottom-center" reverseOrder={false}/>
            </div>
        </div>
    )
}