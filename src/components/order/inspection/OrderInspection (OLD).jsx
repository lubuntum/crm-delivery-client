import { useEffect, useRef, useState } from "react"
import { AddItemForm } from "./AddItemForm (OLD)"
import { ItemList } from "./ItemList (OLD)"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { useNavigate } from "react-router-dom"
import { changeOrderStatusRequest, getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { getMaterialByOrganizationId } from "../../../services/api/materialsApi"
import { getItemsByOrderIdRequest } from "../../../services/api/itemApi"
import { createOrderInspectionRequest, getOrderInspectionByOrderIdRequest } from "../../../services/api/orderInspectionApi"


export const OrderInspection = () => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [order, setOrder] =  useState(null)
    const [orderInspection, setOrderInspection] = useState(null)
    const navigate = useNavigate()
    const {getToken} = useAuth()

    const [orderItems, setOrderItems] = useState([])
    const [item, setItem] = useState({materialId: null, size: 0, price: 0, width: '', height: '', pricePerUnit: '', additionalPrice: '', comment: '', isReady: false})

    useEffect(()=> {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) navigate(-1)
        const getOrderById = async() => {
            setStatus(STATUSES.LOADING)
            const response = await getOrderByIdRequest(param.get("id"), getToken())
            setOrder(response.data)
            setStatus(STATUSES.IDLE)
        }
        const getItemsByOrderId = async () => {
            const response = await getItemsByOrderIdRequest(param.get("id"), getToken())
            setOrderItems(response.data.sort((a,b) => {
                if (a.materialName < b.materialName) return -1
                if (a.materialName > b.materialName) return 1
                return 0
            }))
        }
        try {
            getOrderById()
            getItemsByOrderId()
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
        
    }, [])
    useEffect(()=>{
        const getOrderInspectionByOrderId = async() => {
            try {
                const response = await getOrderInspectionByOrderIdRequest(getToken(), order.id)
                setOrderInspection(response.data)
            } catch(err) {
                console.log(err)
            }
        }
        getOrderInspectionByOrderId()
    }, [order])
    const checkOrderForPrevStatus = () => {
        return (order && (order.status === ORDER_STATUSES.CREATED || 
            order.status === ORDER_STATUSES.PICKED || 
            order.status === ORDER_STATUSES.TAKEN))
    }
    const completeInspectionForOrder = async () => {
        
        try {
            await createOrderInspectionRequest({orderId: order.id, itemsCount: orderItems.length,}, getToken())
            const response = await changeOrderStatusRequest(order.id, ORDER_STATUSES.READY, getToken())

            setOrder(prev => ({...prev, status: response.data}))
            //TODO
            //  - дать знать что статус успешно изменен и заблокировать UI
            //  - Передать функцию в ItemList и вызвать ее при завершении заказа
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
    }
    return (
        <> 
        <div className="inspectionContainer">
            <div className="inspectionContentWrapper">
                    {status === STATUSES.LOADING && <div className="loadingBar"> </div>}
                    {checkOrderForPrevStatus() && <p>Заказ пока не готов к инспекции</p>}
                    {(order && !checkOrderForPrevStatus()) && 
                        <>
                            <AddItemForm setOrderItems={setOrderItems} item={item} setItem={setItem} order={order}/>
                            <ItemList orderItems = {orderItems} setOrderItems={setOrderItems} setItem={setItem} 
                                      order={order} completeInspectionForOrder = {completeInspectionForOrder} 
                                      orderInspection = {orderInspection}/>
                        </>}
                </div>
        </div>
            
        </>
    )
}