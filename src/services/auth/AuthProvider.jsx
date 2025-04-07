import { createContext, useContext, useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import { ROUTES } from "../../routes";
import Cookies from "js-cookie"
const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()
    const login = (token) => {
        Cookies.set("token", token, {
            expires:1, 
            secure: false, //local development temp
            sameSite: "strict"
        })
        setIsAuth(true)
        navigate(ROUTES.ACCOUNT)
    }
    const logout = () => {
        Cookies.remove("token")
        setIsAuth(false)
        navigate(ROUTES.AUTH)
    }
    const checkAuth = () => {
        if (Cookies.get("token") === undefined) return false
        //is better to confirm with server
        //setIsAuth(true)
        return true
    }
    const getToken = () => {
        return Cookies.get("token")
    }

    return (
        <AuthContext.Provider value={{isAuth, login, logout, checkAuth, getToken}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext)
}