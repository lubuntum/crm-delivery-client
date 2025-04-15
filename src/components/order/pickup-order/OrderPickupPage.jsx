import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrderPickupForm } from "./OrderPickupForm"

export const OrderPickupPage = () => {

    return (
        <>
            <HeaderComponent />
            <OrderPickupForm />
            <FooterComponent />
        </>
    )
}