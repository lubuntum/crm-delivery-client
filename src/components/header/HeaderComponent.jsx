import "../../styles/header.css"

import { useAuth } from "../../services/auth/AuthProvider"

import logo from "../../res/images/crm-logo.jpg"
import { Route, useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes"
import simpleLogo from "../../res/images/simple_logo.svg"
export const HeaderComponent = () => {
    const { logout, checkAuth } = useAuth()
    const navigation = useNavigate()

    return (
        <header>
            <div onClick={() => navigation(ROUTES.HOME)} className="logo">
                <img src={simpleLogo} alt="logo"></img>
            </div>

            <div className="nav">
                <a href={ROUTES.HOME}>Главная</a>
                {checkAuth() && <a href={ROUTES.CREATE_ORDER}>Создать заказ</a>}
                {checkAuth() && <a href={ROUTES.ORDERS}>Заказы</a>}
                {checkAuth() && <a href={ROUTES.ACCOUNT}>Аккаунт</a>}
            </div>

            <div className="login">
                {checkAuth() ? <a onClick={logout}>Выход</a> : <a onClick={() => navigation(ROUTES.AUTH)}>Войти</a>}
            </div>
        </header>
    )
}