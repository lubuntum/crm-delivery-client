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

    const [items, setItems] = useState([{materialName: "Хлопоп", size: "135", price: "2500"},
        {materialName: "Шерсть", size: "100", price: "3500"},
        {materialName: "Полиэстр", size: "25", price: "1200"},
        {materialName: "Полиамид", size: "125", price: "3500"}])
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
            setItems(response.data)
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
                            <AddItemForm setItems={setItems}/>
                            <ItemList orderItems = {items} />
                        </>}
                </div>
        </div>
            
        </>
    )
}