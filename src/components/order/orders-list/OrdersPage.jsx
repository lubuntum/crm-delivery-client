import { useMemo } from "react"
import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrdersList } from "./OrdersList"

export const OrdersPage = () => {
    const columns = useMemo(() => [
        {
            Header: "Имя",
            accessor: "fullName"
        },
        {
            Header: "Почта",
            accessor: "clientEmail"
        },
        {
            Header: "Номер",
            accessor: "clientPhone"
        },
        {
            Header: "Адрес",
            accessor: "address"
        }
    ])
    const tempData = [{
        fullName: "Bolshakov Pavel Dmitrievich",
        clientEmail: "Test@gmail.com",
        clientPhone: "1 123 313 12 43", 
        address: "Some addres st12 house25 NW"
    },
    {
        fullName: "Ivanov Ivan Ivanovich",
        clientEmail: "Test@gmail.com",
        clientPhone: "1 123 313 12 43", 
        address: "Some addres st12 house25 NW"
    },
    {
        fullName: "Tester Test Testerov",
        clientEmail: "Test@gmail.com",
        clientPhone: "1 123 313 12 43", 
        address: "Some addres st12 house25 NW"
    },
]
    return (
        <>
            <HeaderComponent />
            <OrdersList data={tempData} columns={columns} />
            <FooterComponent/>
        </>
    )
}