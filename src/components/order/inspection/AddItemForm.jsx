import { useEffect, useRef, useState } from "react"
import '../../../styles/orders/order_inspection/order_inspection.css'
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { getMaterialByOrganizationId } from "../../../services/api/materialsApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import { useNavigate } from "react-router-dom"
import { createItemRequest } from "../../../services/api/itemApi"
export const AddItemForm = ({setOrderItems, item, setItem, order}) => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const orderIdRef = useRef(null)
    const {getToken} = useAuth()
    const navigate = useNavigate()

    const [materials, setMaterials] = useState([])

    const [selectedMaterialId, setSelectedMaterialId] = useState(null)

    useEffect(()=> {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) navigate(-1)
        //when page is loading save id from url
        orderIdRef.current = param.get("id")
        const getMaterials = async () => {
            try {
                const response = await getMaterialByOrganizationId(getToken())
                setMaterials(response.data)
                //by default pick first element
                const {name, id} = response.data[0]
                setItem(prev => ({...prev, materialName : name, materialId: id}))
            } catch(err) {
                console.error(err)
                setStatus(STATUSES.ERROR)
            }
        }
        getMaterials()
    }, [])
    useEffect(()=> {
        console.log(selectedMaterialId === item.materialId)
        if (selectedMaterialId !== item.materialId) setSelectedMaterialId(item.materialId)
    }, [item])

    

    const pickMaterialHandler = (e) => {
        const {value} = e.target
        const {name, id} = materials.find((m) => m.id === Number(value))
        setItem(prev => ({...prev, materialName : name, materialId: id}))
    }
    const changeItemSizeHanler = (e) => {
        const {name, value} = e.target
        const tempItem = {
            ...item,
            [name]: value,
        };
        console.log(tempItem)
        tempItem.size = tempItem.width * tempItem.height
        tempItem.price = tempItem.size * tempItem.pricePerUnit
        setItem(tempItem)
    }
    const changePricePerUnitHandler = (e) => {
        const pricePerUnit = e.target.value
        const tempItem = {...item, pricePerUnit : pricePerUnit}
        tempItem.price = tempItem.size * pricePerUnit
        setItem(tempItem)
    }
    const additionalPriceHandler = (e) => {
        const tempItem = {...item}
        tempItem.price -= tempItem.additionalPrice
        tempItem.additionalPrice = Number(e.target.value)
        tempItem.price += tempItem.additionalPrice
        setItem(tempItem)
    }
    const commentHandler = (e) => {
        setItem(prev => ({...prev, comment: e.target.value}))
    }
    const addItemToOrderHandler = async () => {
        if (order.status !== ORDER_STATUSES.INSPECTION) {
            setStatus(STATUSES.ORDER_STATUS_ERROR)
            return
        }
        if (!item.price || !item.size || !item.materialId) {
            setStatus(STATUSES.VALIDATION_ERROR)
            return
        }
        const itemForRequest = {...item}
        itemForRequest.orderId = orderIdRef.current
        try {
            const response = await createItemRequest(itemForRequest, getToken())
            setOrderItems(prev => ([...prev, response.data]))
            resetForm()
        } catch(err) {
            setStatus(STATUSES.ERROR)
        }
    }
    const resetForm = () => {
        const tempResetValue = {materialId: null, size: 0, price: 0, width: '', height: '', 
            pricePerUnit: '', additionalPrice: '', comment: ''}
        const {name, id} = materials[0]
        tempResetValue.materialName = name
        tempResetValue.materialId = id
        console.log(tempResetValue)
        setItem(tempResetValue)
        setStatus(STATUSES.IDLE)
    }
    
    return (
        <>
            <div className="formWrapper">
                <div className="form">
                    <div className="formTitle">
                        <h4>Добавить позицию к заказу</h4>
                        {status === STATUSES.VALIDATION_ERROR && <p className="errorText">Проверьте все поля</p>}
                        {status === STATUSES.ORDER_STATUS_ERROR && <p className="errorText">Этап завершен</p>}
                    </div>
                    <div className="formInputs">
                        <select name="materialId" value={selectedMaterialId} onChange={pickMaterialHandler}>
                            <option value="" disabled>Материал</option>
                            {materials && materials.map(material => (
                                <option key={material.id} value={material.id}>{material.name}</option>
                            ))}
                        </select>
                        <div className="inputsRow">
                            <input type="number" name="width" step={0.1} min={0} max={9999} placeholder="Ширина" value={item.width} onChange={changeItemSizeHanler} />
                            <input type="number" name="height" step={0.1} min={0} max={9999} placeholder="Высота" value={item.height} onChange={changeItemSizeHanler} />
                            <p>{item.size} м<sup>2</sup></p>
                        </div>
                        <div className="inputsRow">
                            <input type="number" step={0.1} min={0} placeholder="Цена единицы" onChange={changePricePerUnitHandler} value={item.pricePerUnit}/>
                        </div>
                        <div className="inputsRow">
                            <input type="number" step={0.1} min={0} placeholder="Доп. цена" onChange={additionalPriceHandler} value={item.additionalPrice}/>
                            <p>Итог: {item.price}₽</p>
                        </div>
                        <textarea placeholder="Комментарий к позиции" maxLength={250} value={item.comment} onChange={commentHandler}/>
                        <button className={order.status !== ORDER_STATUSES.INSPECTION && "blocked"}>Добавить фото</button>
                        <button className={order.status !== ORDER_STATUSES.INSPECTION && "blocked"} onClick={addItemToOrderHandler}>Добавить к заказу</button>
                    </div>
                </div>
            </div>
        </>
    )
}