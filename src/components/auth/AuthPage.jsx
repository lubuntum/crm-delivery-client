import "../../styles/auth_page/auth.css"
import "../../styles/auth_page/registration.css"
import "../../styles/auth_page/login.css"
import { HeaderComponent } from "../header/HeaderComponent"
import LoginComponent from "./LoginComponent"

import('./LoginComponent')

export const authComponentsKeys = {LOGIN: "LOGIN", REGISTER: "REGISTER"}
export const AuthPage = () => {
    return (
        <>
        <HeaderComponent/>
        <LoginComponent/>
        </>
        
    )
}