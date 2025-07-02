import { useEffect, useState } from "react"
import { createAccountRequest, getRolesRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { STATUSES } from "../../statuses"
import { ROLES, ROLES_RU } from "../../roles"
import {ReactComponent as CrmBackIcon} from "../../res/icons/crm_back_icon_2.svg"
import "./css/create_account.css"
import toast, { Toaster } from "react-hot-toast"
export const CreateAccountView = ({setShowView, setAccounts}) => {
    const {getToken} = useAuth()
    const [roles, setRoles] = useState(null)
    const [accountData, setAccountData] = useState({email:"", phone:"", role:"",  
        employeeName: "", employeeSecondName: "", employeePatronymic: "", fullName: ""})

    useEffect(()=> {
        const getRoles = async() => {
            try {
                const response = await getRolesRequest(getToken())
                const rolesTemp = response.data.filter(role => role.name !== ROLES.ADMIN)
                setAccountData(prev => ({...prev, role: rolesTemp[0].name}))
                setRoles(rolesTemp)
            } catch(err) {
                console.error(err)
            }
        }
        getRoles()
    }, [])
    const handleAccountData = (e) => {
        const {name, value} = e.target
        setAccountData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const formatAccountData = () => {
        const {fullName, ...accountTemp} = accountData;
        const [employeeSecondName, employeeName, employeePatronymic] = fullName.split(" ")
        if (!employeeName || !employeeSecondName || !employeePatronymic) return null
        accountTemp.employeeName = employeeName;
        accountTemp.employeeSecondName = employeeSecondName
        accountTemp.employeePatronymic = employeePatronymic
        return accountTemp
    }
    const addAccount = async() => {
        const accountTemp = formatAccountData()
        if (accountTemp === null || !accountTemp.email 
            || !accountTemp.phone || !accountTemp.role) {
                toast.error("Проверьте введенные данные", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                return
            }
        console.log(accountTemp)
        try {
            const response = await createAccountRequest(getToken(), accountTemp)
            accountTemp.id = response.data
            setAccounts(prev => ([...prev, {...accountTemp, accountStatus: 'ENABLED'}]))
            resetForm()
            toast.success("Аккаунт успешно добавлен", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Ошибка при добовлении сотрудника", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const resetForm = () => {
        setAccountData({email:"", phone:"", role:"",  
        employeeName: "", employeeSecondName: "", employeePatronymic: "", fullName: ""})
    }
    if (!roles) return <div className="progressBar"></div>
    return (
        <>
            <div className="createAccountForm">
                <h3>Новый аккаунт</h3>
                <input className="customInput" type="text" name="fullName" value={accountData.fullName} placeholder="ФИО" onChange={handleAccountData} />
                <input className="customInput" type="text" name="phone" value={accountData.phone} placeholder="Номер" onChange={handleAccountData}/>
                <input className="customInput" type="text" name="email" value={accountData.email} placeholder="Логин для входа" onChange={handleAccountData} />
                <div>
                    <select className="customSelect" id="roles" name="role" onChange={handleAccountData} >
                        {roles.map(role => (
                            <option key={role.id} value={role.name}>
                                {ROLES_RU[role.name]}
                            </option>
                        ))}
                    </select>
                </div>
                <p>Пароль по умолчанию: 123456</p>
                <button className="customButton" onClick={addAccount}>Создать</button>
            </div>
            <button className="floatingButton" onClick={() => setShowView(false)}><CrmBackIcon /></button>
            <Toaster position="bottom-center" reverseOrder={false}/>
        </>
    )
}