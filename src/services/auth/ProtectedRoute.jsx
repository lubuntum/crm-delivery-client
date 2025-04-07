import { Navigate, Route, useLocation } from "react-router-dom"
import { useAuth } from "./AuthProvider"
import { ROUTES } from "../../routes"
/**For all routes which need authorization to access */
export const ProtectedRoute = ({element}) => {
    const {isAuth, checkAuth} = useAuth()

    return checkAuth() ? element : <Navigate to={ROUTES.AUTH} />
}