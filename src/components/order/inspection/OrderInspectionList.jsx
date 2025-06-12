import { ReactComponent as CrmOpenIcon } from "../../../res/icons/crm_open_in_view_icon.svg"
import { ReactComponent as CrmImageIcon } from "../../../res/icons/crm_image_library_icon.svg"
import { ReactComponent as CrmTextureIcon } from "../../../res/icons/crm_texture_icon.svg"
import { ReactComponent as CrmSquareIcon } from "../../../res/icons/crm_square_icon.svg"
import { ReactComponent as CrmPaymentIcon } from "../../../res/icons/crm_payment_icon.svg"
import { ReactComponent as CrmReadyIcon } from "../../../res/icons/crm_warmup_icon.svg"
import { formatDate } from "../../../services/date/dateFormattes"
import { useEffect, useState } from "react"
import { ORDER_STATUSES } from "../../../statuses"
import { updateItemReadyStateRequest } from "../../../services/api/itemApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { OrderImagesPopup } from "../pickup-order/OrderImagesPopup"
import { OrderInspectionAdd } from "./OrderInspectionAdd"

export const OrderInspectionList = ({ orderItems, setOrderItems, setItem, item, order, completeInspection, orderInspection, orderPickup }) => {
    const { getToken } = useAuth()
    
    const [isReady, setIsReady] = useState(false)
    const [pickedItem, setPickedItem] = useState(null)
    const [showImages, setShowImages] = useState(false)
    const [showDetails, setShowDetails] = useState(false)

    useEffect(() => {
        if (!orderItems) return

        setIsReady(orderItems.filter(item => item.isReady).length === orderItems.length)
    }, [orderItems])

    const handleChecked = async (item) => {
        if (order.status !== ORDER_STATUSES.INSPECTION) return
        const tempItem = item
        tempItem.isReady = !item.isReady
        await updateItemState(tempItem)
        const orderItemsTemp = orderItems.map(item => {
            if (item.id === tempItem.id) return tempItem
            return item
        })
        setOrderItems(orderItemsTemp)
    }

    const updateItemState = async (item) => {
        try {
            const response = await updateItemReadyStateRequest(item.id, item.isReady, getToken())
        } catch (err) {
            console.error(err)
        }
    }

    const handleShowImages = (e, item) => {
        e.stopPropagation()
        setPickedItem(item)
        setShowImages(true)
    }

    const handleShowDetails = () => {
        setItem({
            materialId: null,
            size: 0,
            price: 0,
            width: "",
            height: "",
            pricePerUnit: "",
            additionalPrice: "",
            comment: "",
            isReady: false
        })
        setShowDetails(true)
    }

    const handleCompleteInspection = () => {
        if (!isReady || orderItems.length === 0 || order.status !== ORDER_STATUSES.INSPECTION) return
        completeInspection()
    }
    
    return (
        <>
            {(pickedItem?.orderImages && showImages) &&
            <OrderImagesPopup images={pickedItem.orderImages}
                              imagesContentType={`${pickedItem.materialName} ${pickedItem.size} м² - ${pickedItem.price} ₽`}
                              setShowImages={setShowImages}/>}

            {showDetails &&
            <OrderInspectionAdd
                                setShowDetails={setShowDetails}
                                setItem={setItem}
                                item={item}
                                order={order}
                                setOrderItems={setOrderItems} />}

            {(!showImages && !showDetails) &&
            <div className="inspectTotalContainer">
                {orderItems &&
                <div className="inspectTotalItem">
                    <p>ИТОГО (Сумма заказа)</p>
                    <p>{(orderItems.reduce((acc, item) => { return acc + item.price }, 0)).toFixed(2)} ₽</p>
                </div>}

                {orderItems &&
                <div className="inspectTotalItem">
                    <p>ИТОГО (Площадь)</p>
                    <p>{(orderItems.reduce((acc, item) => { return acc + item.size }, 0)).toFixed(2)} м<sup>2</sup></p>
                </div>}
                {orderPickup && 
                    <div className="inspectTotalItem"> 
                        <p>Пришло позиций</p>
                        <p>{orderPickup.itemsCount}</p>
                    </div>
                }
                {orderPickup && 
                    <div className="inspectTotalItem"> 
                        <p>Комментарий курьера</p>
                        <p>{orderPickup.comment ? orderPickup.comment : "Нет"}</p>
                    </div>
                }

                {orderInspection &&
                <div className="inspectTotalItem">
                    <p>Дата выполнения</p>
                    <p>{formatDate(orderInspection.inspectedAt)}</p>
                </div>}
            </div>}
            
            {(!showImages && !showDetails) &&
            <div className="inspectListContainer">
                {orderItems && orderItems.map((item, index) => (
                    <div className="inspectListItem" key={`inspectListItem${index}`}>
                        <div className="inspectListItemInfo">
                            <div className="inspectListItemName">
                                <CrmTextureIcon className="svgIcon"/>
                                <p>{item.materialName}</p>
                            </div>

                            <div className="inspectListItemName">
                                <CrmSquareIcon className="svgIcon"/>
                                <p>{item.size.toFixed(2)} м<sup>2</sup></p>
                            </div>

                            <div className="inspectListItemName">
                                <CrmPaymentIcon className="svgIcon"/>
                                <p>{item.price} ₽</p>
                            </div>

                            <div className="inspectListItemName">
                                <CrmReadyIcon className="svgIcon"/>
                                <p>{isReady ? "Готов" : "Не готов"}</p>
                            </div>

                            <input type="checkbox"
                                   checked={item.isReady}
                                   onClick={(e) => {e.stopPropagation(); handleChecked(item)}}/>
                        </div>

                        <div className="inspectListItemButtons">
                            <button className="transparent" onClick={(e) => handleShowImages(e, item)}>
                                <CrmImageIcon className="svgIcon"/>
                            </button>

                            <button className="transparent" onClick={()=> {setItem(item); setShowDetails(true)}}>
                                <CrmOpenIcon className="svgIcon"/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>}

            {(!showImages && !showDetails) &&
            <div className="inspectButtonContainer">
                <button className="customButton" onClick={handleShowDetails}>
                    Добавить позицию
                </button>

                <button className={`customButton ${(!isReady || orderItems.length === 0 || order.status !== ORDER_STATUSES.INSPECTION) ? "disabledButton" : ""}`} onClick={handleCompleteInspection}>
                    {order?.status === ORDER_STATUSES.READY ? "Проверка выполнена" : "Завершить проверку"}
                </button>
            </div>}
        </>
    )
}