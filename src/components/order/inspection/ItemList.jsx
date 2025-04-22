import { useState } from "react"
import "../../../styles/orders/orders_list/orders_list.css"
export const ItemList = ({orderItems}) => {
    const tableHeaderData = ['Материал', 'Размер', 'Цена']
    const [isReady, setIsReady] = useState(false)
    return (
        <>  
        <div className="itemsWrapper">
            <table>
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
                            <tr>
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