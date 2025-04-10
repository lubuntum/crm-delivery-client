import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrdersList } from "./OrdersList"

export const OrdersPage = () => {

    return (
        <>
            <HeaderComponent />
            <OrdersList />
            <FooterComponent/>
        </>
    )
}