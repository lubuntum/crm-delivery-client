import "../../styles/order_page/order.css"

import { FooterComponent } from "../footer/FooterComponent"
import { OrderTitle } from "./OrderTitle"
import { OrderDetails } from "./OrderDetails"
import { OrderContacts } from "./OrderContacts"
import { OrderReview } from "./OrderReview"
import { HeaderComponent } from "../header/HeaderComponent"

export const OrderInfoPage = () => {
    return (<>
        <HeaderComponent/>
        <div className="contentWrapper">
            <OrderTitle/>
            <OrderDetails/>
            <OrderContacts/>
            <OrderReview/>
        </div>
        <FooterComponent/>
    </>)
}