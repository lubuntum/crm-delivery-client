import { ReactComponent as CrmPersonIcon } from "../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmEmailIcon } from "../../res/icons/crm_email_icon.svg"
import { ReactComponent as CrmRoleIcon } from "../../res/icons/crm_role_icon.svg"
import { ReactComponent as CrmOrgIcon } from "../../res/icons/crm_org_icon.svg"
import { ROLES_RU } from "../../roles"

export const AccountInfoCard = ({ accountData }) => {
    return (
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Био</p>
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
                            <p>Номер</p>
                            <p>{accountData.phone}</p>
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
                            <p>Бренд</p>
                            <p>{accountData.organizationName}</p>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    )
}