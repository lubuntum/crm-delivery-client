import { useState } from "react"
import {ReactComponent as CrmBackIcon} from "../../res/icons/crm_back_icon_2.svg"
import { ROLES } from "../../roles"
import { toast, Toaster } from "react-hot-toast"
import "./css/addOrganization.css"
import { addOrganizationRequest } from "../../services/api/adminApi"
import { useAuth } from "../../services/auth/AuthProvider"
export const AddOrganization = ({setAddOrganization, getOrganizations}) => {
    const {getToken} = useAuth()
    const [organization, setOrganization] = useState(
        {name:""})
    const [directorData, setDirectorData] = useState({email:null, role: ROLES.DIRECTOR, employeeName: "", employeeSecondName: "", employeePatronymic:"", phone: "" })
    const handleDirectorData = (e) => {
        const {name, value} = e.target
        console.log(name, value)
        setDirectorData(prev => ({...prev, [name] : value}))
    }
    const addOrganizationHandler = async () => {
        try {
            const organizationTemp = {...organization, directorData}
            console.log(organizationTemp)
            await addOrganizationRequest(getToken(), organizationTemp)
            await getOrganizations()
            toast.success("Фирма добавлена!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            resetData()
        } catch(err) {
            if (err.status === 409) {
                toast.error("Логин уже занят", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                return
            }
            toast.error("Возникла ошибка при отправке", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
        
    }
    const resetData = () => {
        setOrganization({name:""})
        setDirectorData({email:"", role: ROLES.DIRECTOR, employeeName: "", employeeSecondName: "", employeePatronymic:"", phone: "" })
    }
    return (
        <div className="formWrapper">
        <h3>Добавление предприятия</h3>
            <div className="form">
                <input className="customInput"
                    type="text" 
                    name="name" 
                    placeholder="Наименование компании" 
                    value={organization.name} 
                    required 
                    onChange={(e) => {setOrganization(prev => ({...prev, name: e.target.value}))}} />
                <input className="customInput"
                    type="text"
                    name="employeeSecondName" 
                    placeholder="Фамилия" 
                    value={directorData.employeeSecondName} 
                    required 
                    onChange={(e) => handleDirectorData(e)} />
                <input className="customInput"
                    type="text"
                    name="employeeName" 
                    placeholder="Имя" 
                    value={directorData.employeeName} 
                    required 
                    onChange={(e) => handleDirectorData(e)} />
                <input className="customInput"
                    type="text"
                    name="employeePatronymic" 
                    placeholder="Отчество" 
                    value={directorData.employeePatronymic} 
                    required 
                    onChange={(e) => handleDirectorData(e)} />
                <input className="customInput"
                    type="email"
                    name="email" 
                    placeholder="Почта (для входа)" 
                    value={directorData.email} 
                    required 
                    onChange={(e) => handleDirectorData(e)} />
                <input className="customInput"
                    type="text"
                    name="phone" 
                    placeholder="Номер" 
                    value={directorData.phone} 
                    required 
                    onChange={(e) => handleDirectorData(e)} />
                <button onClick={addOrganizationHandler} className="customButton">Добавить</button>
                    
            </div>
            <button  className="floatingButton" onClick={() => setAddOrganization(false)}><CrmBackIcon /></button>
            <Toaster position="bottom-center" reverseOrder={false}/>
        </div>
    )
}