import { useEffect, useState } from "react"
import { useAuth } from "./AuthProvider"
import { getAccountDataRequest } from "../api/authApi"
import { Navigate } from "react-router-dom"
import { ROUTES } from "../../routes"

export const RoleProtectedRouter = ({element, roles}) => {
    const {isAuth, checkAuth, getToken} = useAuth()
    const [accountData, setAccountData] = useState(null)
    useEffect(()=> {
        const getAccountData = async () => {
            try {
                const response = await getAccountDataRequest(getToken())
                setAccountData(response.data)
            } catch(err) {

            }
        }
        getAccountData()
    }, [])
    if (!accountData) return <div className="loading_bar"></div>
    console.log(roles.some(role => role === accountData.role))
    return (checkAuth() && roles.some(role => role === accountData.role)) ? element : <Navigate to={ROUTES.HOME} />
}