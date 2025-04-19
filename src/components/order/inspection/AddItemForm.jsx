import { useState } from "react"
import '../../../styles/orders/order_inspection/order_inspection.css'
export const AddItemForm = () => {
    const tempMaterial = [
        {id: 1, name: "Хлопок" },
        {id: 2, name: "Шерсть"},
        {id: 3, name: "Полиэстр"},
        {id: 4, name: "Полиамид"}
    ]
    const [selectedMaterialId, setSelectedMaterialId] = useState(null)

    const [item, setItem] = useState({materialId: null, size: 0, price: 0, width: 0, height: 0, pricePerUnit: 0, additionalPrice: 0})
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const updateItemHandler = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        setItem(prev => ({...prev, [name] : value}))
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
    return (
        <>
            <div className="formWrapper">
                <div className="form">
                    <div className="formTitle">
                        Добавить предмет к заказу
                    </div>
                    <div className="formInputs">
                        <select name="materialId" value={selectedMaterialId} onChange={updateItemHandler}>
                            <option value="" disabled>Материал</option>
                            {tempMaterial && tempMaterial.map(material => (
                                <option key={material.id} value={material.id}>{material.name}</option>
                            ))}
                        </select>
                        <div className="inputsRow">
                            <input type="number" name="width" step={0.1} min={0} max={9999} placeholder="Ширина" value={item.width} onChange={changeItemSizeHanler} />
                            <input type="number" name="height" step={0.1} min={0} max={9999} placeholder="Высота" value={item.height} onChange={changeItemSizeHanler} />
                            <p>{item.size} см<sup>2</sup></p>
                        </div>
                        <div className="inputsRow">
                            <input type="number" step={0.1} min={0} placeholder="Цена единицы" onChange={changePricePerUnitHandler}/>
                        </div>
                        <div className="inputsRow">
                            <input type="number" step={0.1} min={0} placeholder="Доп. цена" onChange={additionalPriceHandler}/>
                            <p>Итог: {item.price}₽</p>
                        </div>
                        <button>Добавить к заказу</button>
                    </div>
                </div>
            </div>
        </>
    )
}