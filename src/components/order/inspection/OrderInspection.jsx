import { useEffect, useState } from "react"
import { AddItemForm } from "./AddItemForm"
import { ItemList } from "./ItemList"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { useNavigate } from "react-router-dom"
import { getOrderByIdRequest } from "../../../services/api/orderApi"
import { useAuth } from "../../../services/auth/AuthProvider"


export const OrderInspection = () => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [order, setOrder] =  useState(null)
    const navigate = useNavigate()
    const {getToken} = useAuth()
    //fetch from server later
    const testItems = [
        {material: "Хлопоп", size: "135", price: "2500"},
        {material: "Шерсть", size: "100", price: "3500"},
        {material: "Полиэстр", size: "25", price: "1200"},
        {material: "Полиамид", size: "125", price: "3500"}
    ]
    useEffect(()=> {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) navigate(-1)
        const getOrderById = async(id) => {
            try {
                setStatus(STATUSES.LOADING)
                const response = await getOrderByIdRequest(param.get("id"), getToken())
                setOrder(response.data)
                setStatus(STATUSES.IDLE)
            } catch(err) {
                setStatus(STATUSES.ERROR)
            }
        }
        getOrderById()
    }, [])
    const checkOrderForPrevStatus = () => {
        return (order && (order.status === ORDER_STATUSES.CREATED || 
            order.status === ORDER_STATUSES.PICKED || 
            order.status === ORDER_STATUSES.TAKEN))
    }
    return (
        <> 
            <div className="contentWrapper">
                {status === STATUSES.LOADING && <div className="loadingBar"> </div>}
                {checkOrderForPrevStatus() && <p>Заказ пока не готов к инспекции</p> }
                {(order && !checkOrderForPrevStatus()) && 
                    <>
                        <AddItemForm />
                        <ItemList orderItems = {testItems} />
                    </>}
            </div>
        </>
    )
}