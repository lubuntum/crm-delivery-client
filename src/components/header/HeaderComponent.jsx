import "../../styles/header.css"

import { useAuth } from "../../services/auth/AuthProvider"

import logo from "../../res/images/crm-logo.jpg"
import { Route, useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes"
import simpleLogo from "../../res/images/simple_logo.svg"
import { useEffect, useState } from "react"
import { getAccountDataRequest } from "../../services/api/authApi"
export const HeaderComponent = () => {
    const { logout, checkAuth, getToken } = useAuth()
    const navigation = useNavigate()

    const [accountData, setAccountData] = useState(null)
    useEffect(()=>{
        const getHeaderData = async () => {
            try {
                const response = await getAccountDataRequest(getToken())
                setAccountData(response.data)
            } catch (err) {
                logout()
            }
        }
        if (checkAuth()) getHeaderData()
    }, [])
    return (
        <header>
            <div onClick={() => navigation(ROUTES.HOME)} className="logo">
                <img src={simpleLogo} alt="logo"></img>
            </div>

            <div className="nav">
                <a href={ROUTES.HOME}>Главная</a>
                {(checkAuth() && accountData?.role === "DISPATCHER") && <a href={ROUTES.CREATE_ORDER}>Создать заказ</a>}
                {checkAuth() && <a href={ROUTES.ORDERS}>Заказы</a>}
                {(checkAuth() && accountData?.role === "DIRECTOR") && <a href={ROUTES.EMPLOYEES_LIST}>Сотрудники</a>}
                {checkAuth() && <a href={ROUTES.ACCOUNT}>Аккаунт</a>}
            </div>

            <div className="login">
                {accountData && <p>{accountData.email}</p> }
                {checkAuth() ? <a onClick={logout}>Выход</a> : <a onClick={() => navigation(ROUTES.AUTH)}>Войти</a>}
            </div>
        </header>
    )
}