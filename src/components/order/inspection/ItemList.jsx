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
                {orderItems && <button className={!isReady && "blocked"}>Завершить проверку</button>}
        </div>
            
        </>
    )
}