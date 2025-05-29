import "./css/account_style.css"

import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { getAccountDataRequest } from "../../services/api/accountApi"
import { toast, Toaster } from "react-hot-toast"

import { AccountInfoCard } from "./AccountInfoCard"
import { EmployeeResultsCard } from "./EmployeeResultsCard"
import { ResetPasswordCard } from "./ResetPasswordCard"
import { AccountSettings } from "./AccountSettings"

import { ROLES } from "../../roles"
import { STATUSES } from "../../statuses"
import { Loader } from "../loader/Loader"

export const AccountPage = () => {
    const { getToken } = useAuth()

    const [accountData, setAccountData] = useState(null)
    const [status, setStatus] = useState(STATUSES.IDLE)

    useEffect(()=>{
        const getAccountData = async () => {
            setStatus(STATUSES.LOADING)
            try {
                const response = await getAccountDataRequest(getToken())
                setAccountData(response.data)
                setStatus(STATUSES.IDLE)
            } catch (err) {
                setStatus(STATUSES.ERROR)
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                console.error(err)
            }
            
        }
        getAccountData()
    }, [getToken])

    return (
        <div className="contentWrapper">
            <div className="accountCardsWrapper">
                <div className="pageTitle">
                    <p>Данные аккаунта</p>
                </div>

                {status === STATUSES.LOADING ?
                <div className="accountLoadingContainer">
                    <Loader/>
                </div> :

                <div className="accountCardsContainer">
                    <AccountInfoCard accountData={accountData}/>

                    {accountData?.role === ROLES.COURIER &&  
                    <EmployeeResultsCard />}

                    <ResetPasswordCard/>

                    <Toaster position="bottom-center" reverseOrder={false}/>
                </div>}
            </div>
        </div>
    )
}