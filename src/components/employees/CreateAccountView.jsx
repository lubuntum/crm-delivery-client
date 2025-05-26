import { useEffect, useState } from "react"
import { createAccountRequest, getRolesRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { STATUSES } from "../../statuses"
import { ROLES } from "../../roles"


export const CreateAccountView = ({setShowView, setAccounts}) => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const {getToken} = useAuth()
    const [roles, setRoles] = useState(null)
    const [accountData, setAccountData] = useState({email:"", phone:"", role:"",  
        employeeName: "", employeeSecondName: "", employeePatronymic: "", fullName: ""})

    useEffect(()=> {
        const getRoles = async() => {
            try {
                const response = await getRolesRequest(getToken())
                const rolesTemp = response.data.filter(role => role.name !== ROLES.ADMIN)
                setAccountData(prev => ({...prev, role: rolesTemp[0]}))
                setRoles(rolesTemp)
            } catch(err) {
                console.error(err)
            }
        }
        getRoles()
    }, [])
    const handleAccountData = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        setAccountData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const formatAccountData = () => {
        const {fullName, ...accountTemp} = accountData;
        const [employeeName, employeeSecondName, employeePatronymic] = fullName.split(" ")
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
                setStatus(STATUSES.ERROR)
                setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
                return
            }
        console.log(accountTemp)
        try {
            const response = await createAccountRequest(getToken(), accountTemp)
            accountTemp.id = response.data
            setAccounts(prev => ([...prev, {...accountTemp, accountStatus: 'ENABLED'}]))
            setStatus(STATUSES.SUCCESS)
            setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
            resetForm()
        } catch(err) {
            console.error(err)
        }
    }
    const resetForm = () => {
        setAccountData({email:"", phone:"", role:"",  
        employeeName: "", employeeSecondName: "", employeePatronymic: "", fullName: ""})
    }
    if (!roles) return <div className="progressBar"></div>
    return (
        <>
            <div className="floating-container">
                <div className="floating-component">
                    <button className="exit-button" onClick={()=> setShowView(false)}>X</button>
                    <p>Новый аккаунт</p>
                    <input type="text" name="fullName" value={accountData.fullName} placeholder="ФИО" onChange={handleAccountData} />
                    <input type="text" name="phone" value={accountData.phone} placeholder="Номер" onChange={handleAccountData}/>
                    <input type="text" name="email" value={accountData.email} placeholder="Логин для входа" onChange={handleAccountData} />
                    <div>
                        <label htmlFor="roles">Выберите должность:</label>
                        <select id="roles" name="role" onChange={handleAccountData} >
                            {roles.map(role => (
                                <option key={role.id} value={role.name}>
                                    {role.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p>Пароль по умолчанию: 123456</p>
                    <button onClick={addAccount}>Создать</button>
                    {status === STATUSES.ERROR && <p style={{color: "red"}}>Возникла ошибка, проверьте даннные формы</p>}
                    {status === STATUSES.SUCCESS && <p style={{color: "green"}}>Аккаунт создан</p>}
                </div>
            </div>
        </>
    )
}