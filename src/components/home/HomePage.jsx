import "./css/home_style.css"

import { useAuth } from "../../services/auth/AuthProvider"
import { RecentNews } from "./RecentNews"

export const HomePage = () => {
    const { checkAuth } = useAuth()
    if (!checkAuth()) return 
        <div className="contentWrapper">
            <p>Авторизуйтесь для просмотра</p>
        </div>
    return (
        <div className="contentWrapper">
            <RecentNews />
        </div>
    )
}