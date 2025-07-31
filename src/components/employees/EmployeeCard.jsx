import { ROLES, ROLES_RU } from "../../roles"
import "./css/employee_card.css"
import "../../styles/ui_elements/inputs.css"

import { ReactComponent as CrmPersonIcon } from "../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../res/icons/crm_phone_icon.svg"
import { ReactComponent as DeleteIcon} from "../../res/icons/crm_delete_icon.svg"
import { ReactComponent as ResetPasswordIcon} from "../../res/icons/reset_password_icon.svg"
import toast, { Toaster } from "react-hot-toast"
import { resetPasswordForAccountRequest, updatePasswordRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
export const EmployeeCard = ({employeeData, changeAccountStatus, deleteEmployeeHandler}) => {
    console.log(employeeData)
    const {getToken} =  useAuth()
    const deleteEmployee = () => {
        if (employeeData.accountStatus === "ENABLED") {
            toast.error("Перед удалением отключите аккаунт!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        deleteEmployeeHandler(employeeData)
    }
    const resetPassword = async () => {
        try {
            console.log(employeeData.id)
            const response = await resetPasswordForAccountRequest(getToken(), {accountId: employeeData.id})
            if (response.data) 
                toast.success(`Пароль сброшен по умолчанию для ${employeeData.employeeSecondName} ${employeeData.employeeName} ${employeeData.employeePatronymic}`, {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    return (

        <div className="employeeCard">
            <div className="cardItem">
                <div className="cardTitle">
                    <CrmPersonIcon className="svgIcon" />
                    <p><b>{`${employeeData.employeeSecondName} ${employeeData.employeeName} ${employeeData.employeePatronymic}`}</b></p>
                </div>
                <DeleteIcon className={`${employeeData.accountStatus !== "ENABLED" ? "svgDeleteIcon" : "svgInactiveIcon"}`} onClick={deleteEmployee}/>
            </div>
            <p>Номер: {employeeData.phone}</p>
            <p>Логин: {employeeData.email}</p>
            <p>Должность: {ROLES_RU[employeeData.role]}</p>
            
            {(employeeData.role !== ROLES.DIRECTOR && employeeData.role !== ROLES.ADMIN) && 
            <div className="cardOptions">
                <div className="option">
                    <p>Статус</p>
                    <label className="switch">
                        <input type="checkbox" checked = {employeeData.accountStatus === "ENABLED"} onChange={() => {changeAccountStatus(employeeData)}}/>
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="option">
                    <p>Сбросить пароль</p>
                    <ResetPasswordIcon onClick={() => {resetPassword()}} className="icon"/>
                </div>
            </div>}
        </div>
    )
}