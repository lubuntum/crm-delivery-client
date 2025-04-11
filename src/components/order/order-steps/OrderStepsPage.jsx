import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { OrderSteps } from "./OrderSteps"

export const OrderStepsPage = () => {
    
    return (
        <>
           <HeaderComponent />
            <OrderSteps />
           <FooterComponent /> 
        </>
    )
}