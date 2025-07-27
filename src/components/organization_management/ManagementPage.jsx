import { useEffect, useState } from "react"
import { MaterialsList } from "../materials/MaterialsList"
import { CourierStatistics } from "./CourierStatistics"
import { toast, Toaster } from "react-hot-toast"
import { getAccountDataRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
import "./css/management_page.css"
import { ReadyOrdersData } from "./ReadyOrdersData"
export const ManagementPage = () => {
    const [accountData, setAccountData] = useState(null)
    const {getToken} = useAuth()
    useEffect(()=> {
        const getAccountData = async () => {
            try {
                const response = await getAccountDataRequest(getToken())
                setAccountData(response.data)
            } catch (err) {
                toast.error("Ошибка загрузки данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                console.error(err)
            }
        }
        getAccountData()
    }, [])
    return <>
    
    <div className="managementPage">
        {accountData && <h3 style={{textAlign: "center"}}>Организация {`${accountData.organizationName}`}</h3>}
        <CourierStatistics />
        <ReadyOrdersData /> 
    </div>
        <Toaster position="bottom-center" reverseOrder={false}/>
    </>
}