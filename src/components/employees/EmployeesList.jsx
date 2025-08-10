import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { getOrganizationAccountsByIdRequest, getOrganizationAccountsRequest, updateAccountStatus } from "../../services/api/accountApi"
import { STATUSES } from "../../statuses"
import "../../styles/employees/employees.css"
import { CreateAccountView } from "./CreateAccountView"
import { ROLES, ROLES_RU } from "../../roles"
import { EmployeeCard } from "./EmployeeCard"
import { toast, Toaster } from "react-hot-toast"
import { useLocation, useNavigate } from "react-router-dom"
import { getAccountDataRequest } from "../../services/api/authApi"
export const EmployeesList = () => {
    const location = useLocation()
    const {getToken} = useAuth()
    const [accounts, setAccounts] = useState(null)
    const [accountData, setAccountData] = useState(null)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
        useEffect(()=>{
            const getAccounts = async () => {
                try {
                    //if organization data passed then it's admin, get employees by org id else just by token
                    let response = null
                    const organization = location.state
                    if (organization) 
                        response = await getOrganizationAccountsByIdRequest(getToken(), organization.id)
                    else
                        response = await getOrganizationAccountsRequest(getToken())
                    console.log(response.data)
                    setAccounts(response.data.sort((a, b) => {
                        return a.employeeName.localeCompare(b.employeeName)
                    }).sort((a, b) => {
                        if (a.accountStatus === "ENABLED" && b.accountStatus === "DISABLED")
                            return -1
                        if (a.accountStatus === "DISABLED" && b.accountStatus === "ENABLED")
                            return 1
                        return 0
                    }))
                } catch(err) {
                    console.error(err)
                    toast.error("Возникла ошибка при загрузке сотрудников", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                }
            }
            getAccounts()
        }, [])
        useEffect(()=> {
            if (!location.state) return
            const getAccountData = async () => {
                try {
                    const response = await getAccountDataRequest(getToken())
                    setAccountData(response.data)
                } catch(err) {
                    console.error(err)
                }
            }
            getAccountData()
        }, [])
    const changeAccountStatus = async (account) => {
        try {
            const currentStatus = account.accountStatus
            const accountTemp = {...account, accountStatus: currentStatus === "DISABLED" ? "ENABLED" : "DISABLED"}
            const response = await updateAccountStatus(getToken(), accountTemp)
            if (response.data) {
                setAccounts(prev => 
                    prev.map(acc => acc.id === accountTemp.id ? accountTemp : acc))
            }

            toast.success(`Аккаунт ${account.email} ${accountTemp.currentStatus === "ENABLED" ? "активирован" :  "отключен"}`, {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при отключении аккаунта", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const deleteEmployeeHandler = async (account) => {
        try {
            await updateAccountStatus(getToken(), {...account, accountStatus: "DELETED"})
            setAccounts(prev => prev.filter(acc => acc.id !== account.id))
            toast.success(`Аккаунт ${account.email} более не доступен и скрыт`, {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
             toast.error("Возникла ошибка при удалении работника", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    if (accounts === null) 
        return <>
            {showCreateAccount && <CreateAccountView setShowView={setShowCreateAccount} setAccounts={setAccounts} />}
            <div className="employeesWrapper">
                <div className="options">
                    <button onClick={()=>{setShowCreateAccount(true)}}>Добавить сотрудника</button>
                </div>
            </div>
        </>
    return (
        <> 
            {showCreateAccount && <CreateAccountView setShowView={setShowCreateAccount} setAccounts={setAccounts} />}
            <div className={`employeesWrapper ${showCreateAccount ? "hidden" : ""}`}>
                <div className="employeesCards" style={{minHeight: `${accounts?.length * 125}px`}}>
                    <h3>Сотрудники</h3>
                    {accounts.map(acc => (
                        <EmployeeCard employeeData={acc} changeAccountStatus={changeAccountStatus} deleteEmployeeHandler={deleteEmployeeHandler} accountData = {accountData}/>
                    ))}
                </div>
            <button className="floatingButton" onClick={()=>{setShowCreateAccount(true)}}>+</button>
            </div>
            
            <Toaster position="bottom-center" reverseOrder={false}/>
        </>
    )
}