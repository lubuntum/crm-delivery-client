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

export const AccountPage = () => {
    const { getToken } = useAuth()

    const [accountData, setAccountData] = useState(null)

    useEffect(()=>{
        const getAccountData = async () => {
            try {
                const response = await getAccountDataRequest(getToken())
                setAccountData(response.data)
            } catch(err) {
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            }
            
        }
        getAccountData()
    }, [])

    return (
        <div className="contentWrapper">
            <div className="accountCardsWrapper">
                <AccountInfoCard accountData={accountData}/>

                {accountData?.role === ROLES.COURIER &&  
                    <EmployeeResultsCard />}

                <ResetPasswordCard/>

                <AccountSettings/>

                <Toaster position="bottom-center" reverseOrder={false}/>
            </div>
        </div>
    )
}