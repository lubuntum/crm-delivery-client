import { useEffect, useRef, useState } from "react"
import { AddItemForm } from "./AddItemForm"
import { ItemList } from "./ItemList"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { useNavigate } from "react-router-dom"
import { getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { getMaterialByOrganizationId } from "../../../services/api/materialsApi"
import { getItemsByOrderIdRequest } from "../../../services/api/itemApi"


export const OrderInspection = () => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [order, setOrder] =  useState(null)
    const navigate = useNavigate()
    const {getToken} = useAuth()

    const [orderItems, setOrderItems] = useState([])
    const [item, setItem] = useState({materialId: null, size: 0, price: 0, width: '', height: '', pricePerUnit: '', additionalPrice: '', comment: ''})

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
            setOrderItems(response.data)
        }
        try {
            getOrderById()
            getItemsByOrderId()
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
        
    }, [])
    const checkOrderForPrevStatus = () => {
        return (order && (order.status === ORDER_STATUSES.CREATED || 
            order.status === ORDER_STATUSES.PICKED || 
            order.status === ORDER_STATUSES.TAKEN))
    }
    return (
        <> 
        <div className="inspectionContainer">
            <div className="inspectionContentWrapper">
                    {status === STATUSES.LOADING && <div className="loadingBar"> </div>}
                    {checkOrderForPrevStatus() && <p>Заказ пока не готов к инспекции</p> }
                    {(order && !checkOrderForPrevStatus()) && 
                        <>
                            <AddItemForm setOrderItems={setOrderItems} item={item} setItem={setItem}/>
                            <ItemList orderItems = {orderItems} setItem={setItem} />
                        </>}
                </div>
        </div>
            
        </>
    )
}