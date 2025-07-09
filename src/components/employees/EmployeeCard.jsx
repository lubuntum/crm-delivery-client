import { ROLES, ROLES_RU } from "../../roles"
import "./css/employee_card.css"
import "../../styles/ui_elements/inputs.css"

import { ReactComponent as CrmPersonIcon } from "../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../res/icons/crm_phone_icon.svg"
import { ReactComponent as DeleteIcon} from "../../res/icons/crm_delete_icon.svg"
import toast, { Toaster } from "react-hot-toast"
export const EmployeeCard = ({employeeData, changeAccountStatus, deleteEmployeeHandler}) => {
    const deleteEmployee = () => {
        if (employeeData.accountStatus === "ENABLED") {
            toast.error("Перед удалением отключите аккаунт!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        deleteEmployeeHandler(employeeData)
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
            <div className="statusContainer">
                <p>Статус</p>
                <label className="switch">
                    <input type="checkbox" checked = {employeeData.accountStatus === "ENABLED"} onChange={() => {changeAccountStatus(employeeData)}}/>
                    <span className="slider"></span>
                </label>
            </div>}

        </div>
    )
}