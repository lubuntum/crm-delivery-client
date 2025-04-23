import { useState } from "react"
import "../../../styles/orders/orders_list/orders_list.css"
export const ItemList = ({orderItems, setItem}) => {
    const tableHeaderData = ['Материал', 'Размер', 'Цена']
    const [isReady, setIsReady] = useState(false)
    const showItemDetails = (item) => {
        setItem(item)
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
                                <th><input style={{width:17, height: 17}} type="checkbox" /></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orderItems && <p>Итоговая цена заказа: {orderItems.reduce((acc, item) => {return acc + item.price}, 0)}₽</p>}
                {orderItems && <p>Итоговая площадь: {orderItems.reduce((acc, item) => {return acc + item.size}, 0)}м2</p>}
                {orderItems && <button className={!isReady && "blocked"}>Завершить проверку</button>}
        </div>
            
        </>
    )
}