import "../../styles/header.css"

import { useAuth } from "../../services/auth/AuthProvider"

import logo from "../../res/images/crm-logo.jpg"

export const HeaderComponent = () => {
    const { logout, checkAuth } = useAuth()
    return (
        <header>
            <div className="logo">
                <img src={logo} alt="logo"></img>
            </div>

            <div className="nav">
                <a>Главная</a>
                {checkAuth && <a>Аккаунт</a>}
            </div>

            <div className="login">
                {checkAuth ? <a onClick={logout}>Выход</a> : <a onClick={()=>{}}>Войти</a>}
            </div>
        </header>
    )
}