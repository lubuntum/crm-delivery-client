/**Класс отвечает за доступ к логину и регистрации для авторизованных пользователей */

import { Navigate } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import { ROUTES } from "../../routes"

export const AuthProtectedRoute = ({element}) => {
    const {checkAuth} = useAuth()
    
    return !checkAuth() ? element : <Navigate to={ROUTES.HOME} />
}