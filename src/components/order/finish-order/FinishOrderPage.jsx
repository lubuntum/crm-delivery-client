import { FooterComponent } from "../../footer/FooterComponent"
import { HeaderComponent } from "../../header/HeaderComponent"
import { FinishOrderForm } from "./FinishOrderForm"

export const FinishOrderPage = () => {

    return (
        <>
            <HeaderComponent />
            <FinishOrderForm />
            <FooterComponent/>
        </>
    )
}