import { useEffect, useRef, useState } from "react"
import "../css/order_details_style.css"
import { useAuth } from "../../../services/auth/AuthProvider"
import { useNavigate } from "react-router-dom"
import { ORDER_STATUSES, STATUSES } from "../../../statuses"
import { getMaterialByOrganizationId } from "../../../services/api/materialsApi"
import { createItemRequest } from "../../../services/api/itemApi"
import { toast, Toaster } from "react-hot-toast"
export const OrderInspectionAdd = ({ setShowDetails, setItem, item, order, setOrderItems }) => {
    const tempList = ["Хлопок", "Шерсть", "Полиэстр", "Полиамид", "Сизаль"]
    const [status, setStatus] = useState(STATUSES.IDLE)
    const orderIdRef = useRef(null)
    const {getToken} = useAuth()
    const navigate = useNavigate()

    const [materials, setMaterials] = useState([])

    const [selectedMaterialId, setSelectedMaterialId] = useState(null)

    const [images, setImages] = useState([])
    const imageChangeHandler = (e) => {
            setImages(Array.from(e.target.files))
    }
    useEffect(()=> {
        const param = new URLSearchParams(window.location.search)
        if (!param.get("id")) setShowDetails(false)
        //when page is loading save id from url
        orderIdRef.current = param.get("id")
        const getMaterials = async () => {
            try {
                const response = await getMaterialByOrganizationId(getToken())
                console.log(response.data)
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
    const pickMaterialHandler = (e) => {
        const {value} = e.target
        const {name, id} = materials.find((m) => m.id === Number(value))
        setItem(prev => ({...prev, materialName : name, materialId: id}))
    }
    const changeItemSizeHandler = (e) => {
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
				toast.error("Заказ не находится на проверке", 
                	{icon: false, style: 
                    	{backgroundColor: "rgba(239, 71, 111, .8)", color: "white", backdropFilter: "blur(3px)"}})
                return
            }
            if (!item.price || !item.size || !item.materialId) {
                setStatus(STATUSES.VALIDATION_ERROR)
                toast.error("Проверьте все заполненные поля", 
                    {icon: false, style: 
                        {backgroundColor: "rgba(239, 71, 111, .8)", color: "white", backdropFilter: "blur(3px)"}})
                return
            }
            const itemForRequest = {...item}
            itemForRequest.orderId = orderIdRef.current
            try {
                const response = await createItemRequest(itemForRequest, images, getToken())
                setOrderItems(prev => ([...prev, response.data]))
                resetForm()
				toast.error("Заказ успешно добавлен", 
                	{icon: false, style: 
                    	{backgroundColor: "rgba(57, 189, 64, 0.8)", color: "white", backdropFilter: "blur(3px)"}})
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
        setImages([])
    }
    return (
        <>
        <div className="detailsWrapper">
            <div className="detailsContaner">
                <p>Добавление позиции</p>
                <div className="detailsInput">
                    <select className="customSelect" name="materialId" onChange={pickMaterialHandler}>
                        <option value="" disabled>Материал</option>
                        {materials.map((material, index) => (
                            <option key={`selectMaterial${index}`} value={material.id}>{material.name}</option>
                        ))}
                    </select>

                    <div className="detailsInputRow">
                        <input className="customInput"
                               type="number"
                               name="width"
                               step={0.1}
                               min={0}
                               required
                               max={9999}
                               value={item.width}
                               onChange={changeItemSizeHandler}
                               placeholder="Ширина"/>

                        <input className="customInput"
                               type="number"
                               name="height"
                               step={0.1}
                               min={0}
                               max={9999}
                               required
                               value={item.height}
                               onChange={changeItemSizeHandler}
                               placeholder="Высота"/>
                    </div>

                    <div className="detailsTotal">
                        <p>ИТОГО (площадь): {item.size} м<sup>2</sup></p>
                    </div>

                    <div className="detailsInputRow">
                        <input className="customInput"
                               type="number"
                               name="price"
                               step={0.1}
                               min={0}
                               required
                               value={item.pricePerUnit}
                               onChange={changePricePerUnitHandler}
                               placeholder="Цена за ед."/>

                        <input className="customInput"
                               type="number"
                               name="addPrice"
                               step={0.1}
                               min={0}
                               required
                               value={item.additionalPrice}
                               onChange={additionalPriceHandler}
                               placeholder="Доп. цена"/>
                    </div>

                    <div className="detailsTotal">
                        <p>ИТОГО (сумма): {item.price} ₽</p>
                    </div>

                    <textarea className="customTextarea"
                              placeholder="Комментарии к позиции"
                              rows={5}
                              required
                              value={item.comment}
                              onChange={commentHandler}/>
                </div>
                
                <div className="customFileUploadContainer">
                    <label className={`customFileUploadLabel`}
                           htmlFor="customFileUploadInputOrderInspect">Выбрать изображения ({images?.length ? images.length : 0})</label>
                    <input id="customFileUploadInputOrderInspect"
                           type="file"
                           multiple
                           accept="image/*"
                           onChange={imageChangeHandler}/>
                </div>

                <button className="customButton" onClick={addItemToOrderHandler}>Добавить к заказу</button>

                <button className="customButton" onClick={() => setShowDetails(false)}>Закрыть</button>
            </div>
        </div>
         <Toaster position="bottom-center" reverseOrder={false}/>
        </>
        
    )
}