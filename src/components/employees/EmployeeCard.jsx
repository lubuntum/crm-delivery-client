import { ROLES, ROLES_RU } from "../../roles"
import "./css/employee_card.css"
import "../../styles/ui_elements/inputs.css"

import { ReactComponent as CrmPersonIcon } from "../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../res/icons/crm_phone_icon.svg"
export const EmployeeCard = ({employeeData, changeAccountStatus}) => {

    return (

        <div className="employeeCard">
            <div className="cardItem">
                <CrmPersonIcon className="svgIcon" />
                <p><b>{`${employeeData.employeeSecondName} ${employeeData.employeeName} ${employeeData.employeePatronymic}`}</b></p>
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