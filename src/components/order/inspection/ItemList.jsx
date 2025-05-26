import { useEffect, useState } from "react"
import "../../../styles/orders/orders_list/orders_list.css"
import showImagesIcon from "../../../res/icons/photo_camera_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"
import { updateItemReadyStateRequest } from "../../../services/api/itemApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { ORDER_STATUSES } from "../../../statuses"
import { formatDate } from "../../../services/date/dateFormattes"
import { OrderImagesViewer } from "../OrderImagesViewer (OLD)"
export const ItemList = ({orderItems, setOrderItems, setItem, order, completeInspectionForOrder, orderInspection}) => {
    const tableHeaderData = ['Материал', 'Размер', 'Цена']
    const [isReady, setIsReady] = useState(false)
    const {getToken} = useAuth()
    const [pickedItem, setPickedItem] = useState(null)
    const [showImages, setShowImages] = useState(false)
    useEffect(()=> {
        if (!orderItems) return
        setIsReady(orderItems.filter(item => item.isReady).length === orderItems.length)
    }, [orderItems])
    const showItemDetails = (item) => {
        setItem(item)
    }
    const itemCheckHandler = async (item) => {
        if (order.status !== ORDER_STATUSES.INSPECTION) return
        const tempItem = item
        tempItem.isReady = !item.isReady
        await updateItemReadyState(tempItem)
        const orderItemsTemp = orderItems.map(it => {
            if (it.id === tempItem.id) return tempItem
            return it
        })
        setOrderItems(orderItemsTemp)
        //setIsReady(orderItemsTemp.filter(it => it.isReady).length === orderItemsTemp.length)
        //orderItems
        //sent item id and isReady for update and reflec this changes here if success
        //TODO
        //+There is a bug when click on check button still works select item details (devide this events)
        //+add in database isCheked property to item 
        //
        //+check if all roderItems has checked true then set isReady to true
    }
    const showItemImages = (e, item) => {
        e.stopPropagation()
        console.log(item.orderImages)
        setPickedItem(item)
        setShowImages(true)
    }
    const updateItemReadyState = async (item) => {
        try {
            const response = await updateItemReadyStateRequest(item.id, item.isReady, getToken())
            console.log(response.data)
        } catch(err) {
            console.error(err)
        }
    }
    const completeInspectionForOrderHandler = () => {
        if (!isReady || orderItems.length === 0 || order.status !== ORDER_STATUSES.INSPECTION) return
        completeInspectionForOrder()
    }
    return (
        <>
        {(pickedItem?.orderImages && showImages) && 
            <OrderImagesViewer 
                images={pickedItem.orderImages} 
                imagesContentType={`${pickedItem.materialName}, Размер: ${pickedItem.size}м², Цена: ${pickedItem.price}₽`} 
                setShowImages={setShowImages}/>}
        <div className="itemsWrapper">
            <table className="ordersList">
                    <thead>
                        <tr>
                            {tableHeaderData.map(header => (
                                <th>
                                    <p>{header}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {orderItems && orderItems.map(item => (
                            <tr onClick={()=>{showItemDetails(item)}}>
                                <th>{item.materialName}</th>
                                <th>{item.size}</th>
                                <th>{item.price}</th>
                                <th><input style={{width:17, height: 17}} type="checkbox" checked = {item.isReady} 
                                    onClick={(e) => {e.stopPropagation(); itemCheckHandler(item)}}/>
                                </th>
                                <th>
                                    <img className="listImg" src={showImagesIcon} onClick={(e) => showItemImages(e, item)} on alt="show additional images"/>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orderItems && <p className="lato-semibold">Итоговая цена заказа: {orderItems.reduce((acc, item) => {return acc + item.price}, 0)}₽</p>}
                {orderItems && <p className="lato-semibold">Итоговая площадь: {orderItems.reduce((acc, item) => {return acc + item.size}, 0)}м<sup>2</sup></p>}
                {orderInspection && <p className="lato-semibold">Дата выполнения: {formatDate(orderInspection.inspectedAt)}</p>}
                {orderItems && <button onClick={completeInspectionForOrderHandler} className={(!isReady || orderItems.length === 0 || order.status !== ORDER_STATUSES.INSPECTION) && "blocked"}>{order.status === ORDER_STATUSES.READY ? "Проверка выполнена" : "Завершить проверку"}</button>}
        </div>
            
        </>
    )
}