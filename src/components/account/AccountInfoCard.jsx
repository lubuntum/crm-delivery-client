import { ReactComponent as CrmPersonIcon } from "../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmEmailIcon } from "../../res/icons/crm_email_icon.svg"
import { ReactComponent as CrmRoleIcon } from "../../res/icons/crm_role_icon.svg"
import { ReactComponent as CrmOrgIcon } from "../../res/icons/crm_org_icon.svg"
import { ReactComponent as EditFromIcon} from "../../res/icons/edit.svg"
import { ROLES, ROLES_RU } from "../../roles"
import { useEffect, useRef, useState } from "react"
import { DebounceInpunt } from "../service_components/inputs/DebounceInput"
import { updateAccountDataRequest } from "../../services/api/accountApi"
import { useAuth } from "../../services/auth/AuthProvider"
import toast from "react-hot-toast"

export const AccountInfoCard = ({ accountData, setAccountData }) => {
    const [editMode, setEditMode] = useState(false)
    const {getToken} = useAuth()
    const onChangeAccountData = (name, value) => {
        if (accountData[name] === value) return
        updateAccountData(name, value)
    }
    const updateAccountData = async (name, value) => {
        try {
            console.log(`changing ${name}: ${value}`)
            const response = await updateAccountDataRequest(getToken(), {[name]: value, id: accountData.id})
            if (response.data){
                setAccountData(prev=> ({...prev, [name]: value}))
                toast.success("Данные обновлены!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            }
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка, проверьте данные", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    return (
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Основное</p>
                <EditFromIcon className="icon" onClick={()=> setEditMode(!editMode)}/>
            </div>

            <div className="accountCardWrapper">
                {!accountData ? <p>Загрузка данных...</p> :
                <div className="accountCardPersonContainer">
                    <div className="accountCardPersonItem">
                        <CrmPersonIcon className="svgIcon" />
                        <div className="accountCardPersonItemData">
                            <p>ФИО</p>
                            <p>{`${accountData.employeeSecondName} ${accountData.employeeName} ${accountData.employeePatronymic}`}</p>
                        </div>
                    </div>

                    <div className="accountCardPersonItem">
                        <CrmPhoneIcon className="svgIcon" />
                        <div className="accountCardPersonItemData">
                            
                            {!editMode ? 
                                <>
                                    <p>Номер</p>
                                    <p>{accountData.phone}</p>
                                </> :
                                <DebounceInpunt value={accountData.phone}
                                                onChange={val => onChangeAccountData("phone", val)}
                                                placeholder={"Введите номер"}
                                                type = {"number"}/>}
                            
                        </div>
                    </div>

                    <div className="accountCardPersonItem">
                        <CrmEmailIcon className="svgIcon" />
                        <div className="accountCardPersonItemData">
                            <p>Электронная почта</p>
                            <p>{accountData.email}</p>
                        </div>
                    </div>

                    <div className="accountCardPersonItem">
                        <CrmRoleIcon className="svgIcon" />
                        <div className="accountCardPersonItemData">
                            <p>Должность</p>
                            <p>{ROLES_RU[accountData.role]}</p>
                        </div>
                    </div>

                    <div className="accountCardPersonItem">
                        <CrmOrgIcon className="svgIcon" />
                        <div className="accountCardPersonItemData">
                            
                            {(editMode && accountData.role === ROLES.DIRECTOR) ? 
                                <DebounceInpunt value={accountData.organizationName} 
                                                onChange={val => {onChangeAccountData("organizationName", val)}}
                                                placeholder="Введите имя бренда" />
                                : 
                                <><p>Бренд</p>
                                    <p>{accountData.organizationName}</p>
                                </>}
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}