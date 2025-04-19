
import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrderInspection } from "./OrderInspection"

export const OrderInspectionPage = () => {

    return (
        <>
            <HeaderComponent />
            <OrderInspection/>
            <FooterComponent/>
        </>
    )
}