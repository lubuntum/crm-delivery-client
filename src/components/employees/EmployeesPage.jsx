import { FooterComponent } from "../footer/FooterComponent"
import { HeaderComponent } from "../header/HeaderComponent"
import { EmployeesList } from "./EmployeesList"

export const EmployeesPage = () => {
    
    return (
        <>
            <HeaderComponent />
            <EmployeesList />
            <FooterComponent />
        </>
    )
}