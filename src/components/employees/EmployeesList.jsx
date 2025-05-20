import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { getOrganizationAccountsRequest, updateAccountStatus } from "../../services/api/accountApi"
import { STATUSES } from "../../statuses"
import "../../styles/employees/employees.css"
import { CreateAccountView } from "./CreateAccountView"
export const EmployeesList = () => {
    const {getToken} = useAuth()
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [accounts, setAccounts] = useState(null)
    const [showCreateAccount, setShowCreateAccount] = useState(false)
        useEffect(()=>{
            const getAccounts = async () => {
                try {
                    const response = await getOrganizationAccountsRequest(getToken())
                    setAccounts(response.data)
                    setStatus(STATUSES.SUCCESS)
                    setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
                } catch(err) {
                    console.error(err)
                    setStatus(STATUSES.ERROR)
                }
            }
            getAccounts()
        }, [])
    const disableAccount = async (account) => {
        try {
            const accountTemp = {...account, accountStatus: "DISABLED"}
            const response = await updateAccountStatus(getToken(), accountTemp)
            if (response.data) {
                setAccounts(prev => 
                    prev.map(acc => acc.id === accountTemp.id ? accountTemp : acc))
            }
            setStatus(STATUSES.SUCCESS)
            setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
    }
    if (accounts === null) return <div className="loadingBar"></div>
    return (
        <> 
            {showCreateAccount && <CreateAccountView setShowView={setShowCreateAccount} setAccounts={setAccounts} />}
            <div className="employeesWrapper">
                {status === STATUSES.ERROR && "Возникла ошибка при получении сотрудников"}
                <table>
                    <thead>
                        <tr>
                            <th>ФИО</th>
                            <th>Должность</th>
                            <th>Нормер</th>
                            <th>Логин</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(acc => (
                            <tr>
                                <th>{`${acc.employeeName} ${acc.employeeSecondName} ${acc.employeePatronymic}`}</th>
                                <th>{acc.role}</th>
                                <th>{acc.phone}</th>
                                <th>{acc.email}</th>
                                <th><button onClick={()=>disableAccount(acc)}>Отключить аккаунт</button></th>
                                <th>{acc.accountStatus}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="options">
                    <button onClick={()=>{setShowCreateAccount(true)}}>Добавить сотрудника</button>
                </div>
            </div>
        </>
    )
}