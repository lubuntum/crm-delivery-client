import "../../../styles/orders/orders_list/orders_list.css"
export const ItemList = ({orderItems}) => {
    const tableHeaderData = ['Материал', 'Размер', 'Цена']
    return (
        <>  
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
                        <tr>
                            <th>{item.material}</th>
                            <th>{item.size}</th>
                            <th>{item.price}</th>
                            <th><input style={{width:17, height: 17}} type="checkbox" /></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}