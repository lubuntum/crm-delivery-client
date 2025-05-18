import "./css/home_style.css"

import { useAuth } from "../../services/auth/AuthProvider"

export const HomePage = () => {
    const { checkAuth } = useAuth()

    return (
        <div className="contentWrapper">
            {checkAuth() ? 
            <p>Добро пожаловать</p> : 
            <p>Главная страница</p>}
        </div>
    )
}