import { FooterComponent } from "../footer/FooterComponent"
import { HeaderComponent } from "../header/HeaderComponent"
import "../../styles/account_page/account.css"
import { AccountInfoCard } from "./AccountInfoCard"
import { ResetPasswordCard } from "./ResetPasswordCard"
import { useEffect, useState } from "react"
import { getAccountDataRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
import Cookies from "js-cookie"
import { STATUSES } from "../../statuses"
import { EmployeeResultsCard } from "./EmployeeResultsCard"
import { ROLES } from "../../roles"
export const AccountPage = () => {
    const {getToken} = useAuth()
    const [accountData, setAccountData] = useState(null)
    const [status, setStatus] = useState(STATUSES.IDLE)
    useEffect(()=>{
        const getAccountData = async () => {
            try {
                const response = await getAccountDataRequest(getToken())
                //console.log(response.data)
                setAccountData(response.data)
            } catch(err) {
                setStatus(STATUSES.ERROR)
            }
            
        }
        getAccountData()
    }, [])
    return(
        <>
            <HeaderComponent/>
            <div className="contentWrapper">
                <div className="cardsWrapper">
                        <AccountInfoCard accountData={accountData}/>
                        {accountData?.role === ROLES.COURIER &&  <EmployeeResultsCard />}
                        <ResetPasswordCard />
                    </div>
            </div>
                
            <FooterComponent/>
        </>
    )
}