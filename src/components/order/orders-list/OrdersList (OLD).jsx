import { useFilters, useTable } from "react-table"
import "../../../styles/orders/orders_list/orders_list.css"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes"
export const OrdersList = ({columns, data}) => {
    const navigate = useNavigate()
    const {getTableProps, getTableBodyProps,headerGroups, rows, prepareRow} =
        useTable(
            {columns, data : data ? data : [{ clientNumber:"", clientFullName: "", clientPhone: "", createdAt: "" ,address: "", status: "" }], initialState: {filters: []}}, 
            useFilters )
    const navigateToOrder = (order) => {
        navigate(`${ROUTES.ORDER_STEPS}?id=${order.id}`, {state: {order}})
    }
    return(
        <>
        <div className="tableWrapper">
        {data &&
            <table className="ordersList" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    <div>
                                        <p>{column.render('Header')}</p>
                                        <div>{column.canFilter ? column.render('Filter') : null}</div>
                                    </div>
                                    
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                
                <tbody {...getTableBodyProps()}>
                    
                    {rows.map(row => {
                        console.log(row)
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={()=> navigateToOrder(row.original)}>
                                {row.cells.map(cell => (
                                    <td {... cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        )
                    })}
                
                </tbody>
                
                
            </table>
            }
            {!data && <p>Загрузка...</p>}
        </div>
        </>
    )
}