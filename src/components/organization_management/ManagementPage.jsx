import { useEffect, useState } from "react"
import { MaterialsList } from "../materials/MaterialsList"
import { CourierStatistics } from "./CourierStatistics"
import { toast, Toaster } from "react-hot-toast"
import { getAccountDataRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
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
    
    <div style={{display: "flex", flexDirection: "column", gap: "15px"}}>
        {accountData && <p>Организация {`${accountData.organizationName}`}</p>}
        <CourierStatistics />
        <MaterialsList/>        
    </div>
        <Toaster position="bottom-center" reverseOrder={false}/>
    </>
}