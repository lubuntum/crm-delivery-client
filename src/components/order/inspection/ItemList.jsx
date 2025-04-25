import { useEffect, useState } from "react"
import "../../../styles/orders/orders_list/orders_list.css"
import { updateItemReadyStateRequest } from "../../../services/api/itemApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { ORDER_STATUSES } from "../../../statuses"
export const ItemList = ({orderItems, setOrderItems, setItem, order, completeInspectionForOrder}) => {
    const tableHeaderData = ['Материал', 'Размер', 'Цена']
    const [isReady, setIsReady] = useState(false)
    const {getToken} = useAuth()
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
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orderItems && <p className="lato-semibold">Итоговая цена заказа: {orderItems.reduce((acc, item) => {return acc + item.price}, 0)}₽</p>}
                {orderItems && <p className="lato-semibold">Итоговая площадь: {orderItems.reduce((acc, item) => {return acc + item.size}, 0)}м<sup>2</sup></p>}
                {orderItems && <button onClick={completeInspectionForOrderHandler} className={(!isReady || orderItems.length === 0 || order.status !== ORDER_STATUSES.INSPECTION) && "blocked"}>{order.status === ORDER_STATUSES.READY ? "Проверка выполнена" : "Завершить проверку"}</button>}
        </div>
            
        </>
    )
}