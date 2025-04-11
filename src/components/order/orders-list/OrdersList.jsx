import { useTable } from "react-table"
import "../../../styles/orders/orders_list/orders_list.css"
export const OrdersList = ({columns, data}) => {
    const {getTableProps, getTableBodyProps,headerGroups, rows, prepareRow} = useTable({columns, data})
    return(
        <>
        <div className="tableWrapper">
            <table className="ordersList">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableProps()}>
                    {rows.map(row => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()} onClick={()=>{console.log(row.getRowProps())}}>
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
        </div>
        </>
    )
}