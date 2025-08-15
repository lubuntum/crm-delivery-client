import "./css/home_style.css"

import { useAuth } from "../../services/auth/AuthProvider"
import { RecentNews } from "./RecentNews"
import { useNavigate } from "react-router-dom"
import { ROUTES } from "../../routes"

export const HomePage = () => {
    const { checkAuth } = useAuth()
    const navigate = useNavigate()
    if (!checkAuth()) return( 
        <div className="contentWrapper">
            <div className="homeWrapper">
                <p className="loginTitle">Хотите автоматизировать бизнес процессы ?</p>
                <button className="customButton" onClick={() => navigate(ROUTES.ORGANIZATION_REQUEST)}>Регистрация организации</button>
                <button className="customButton" onClick={() => navigate(ROUTES.AUTH)}>Начать</button>
            </div>
        </div>)
    return (
        <div className="contentWrapper" style={{alignItems: "end"}}>
            <RecentNews />
        </div>
    )
}