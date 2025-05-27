import { useNavigate } from "react-router-dom"

import { ReactComponent as CrmArrowDownIcon } from "../../../res/icons/crm_arrow_down_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmCalendarIcon } from "../../../res/icons/crm_calendar_icon.svg"
import { ReactComponent as CrmLocationIcon } from "../../../res/icons/crm_location_icon.svg"
import { ReactComponent as CrmOpenIcon } from "../../../res/icons/crm_open_in_view_icon.svg"
import { ReactComponent as CrmDeleteIcon } from "../../../res/icons/crm_delete_icon.svg"

import { ReactComponent as CrmStatus10Icon } from "../../../res/icons/crm_status10_icon.svg"
import { ReactComponent as CrmStatus20Icon } from "../../../res/icons/crm_status20_icon.svg"
import { ReactComponent as CrmStatus40Icon } from "../../../res/icons/crm_status40_icon.svg"
import { ReactComponent as CrmStatus60Icon } from "../../../res/icons/crm_status60_icon.svg"
import { ReactComponent as CrmStatus80Icon } from "../../../res/icons/crm_status80_icon.svg"
import { ReactComponent as CrmStatus90Icon } from "../../../res/icons/crm_status90_icon.svg"
import { ReactComponent as CrmStatusDoneIcon } from "../../../res/icons/crm_status_done_icon.svg"

import { ROUTES } from "../../../routes"

const statusStyles = {
    CREATED: 'createdStyle',
    PICKED: 'pickedStyle',
    TAKEN: 'takenStyle',
    INSPECTION: 'inspectionStyle',
    READY: 'readyStyle',
    COMMING: 'comingStyle',
    COMPLETED: 'completedStyle',
}

const statusIcons = {
    CREATED: CrmStatus10Icon,
    PICKED: CrmStatus20Icon,
    TAKEN: CrmStatus40Icon,
    INSPECTION: CrmStatus60Icon,
    READY: CrmStatus80Icon,
    COMMING: CrmStatus90Icon,
    COMPLETED: CrmStatusDoneIcon,
}

const statusTranslations = {
    CREATED: "Создано",
    PICKED: "Забрано",
    TAKEN: "Взято",
    INSPECTION: "На проверке",
    READY: "Готово",
    COMMING: "Прибыло",
    COMPLETED: "Завершено",
}

export const OrderItem = ({ data, removeOrder}) => {
    const navigate = useNavigate()

    const statusStyle = statusStyles[data.status] || ""
    const StatusIcon = statusIcons[data.status] || <CrmStatus10Icon/>
    const statusTranslation = statusTranslations[data.status]

    const navigateToOrder = (order) => {
        navigate(`${ROUTES.ORDER_STEPS}?id=${order.id}`, {state: {order}})
    }
    
    return (
        <div className="orderContainer">
            <div className={`accordionContainer ${statusStyle}`}>
                <ul>
                    <li>
                        <input type="checkbox"></input>

                        <CrmArrowDownIcon className="svgIcon"/>

                        <div className="accordionTitle">
                            <h2>{data.serialNumber ? data.serialNumber : "SerialPH"}</h2>
                            <p>{data.clientFullName ? data.clientFullName : "ClientNamePH"}</p>
                        </div>

                        <div className="divider"></div>

                        <div className="accordionItem">
                            <CrmPhoneIcon className="svgIcon"/>
                            <p>{data.clientPhone ? data.clientPhone : "ClientPhonePH"}</p>
                        </div>

                        <div className="accordionItem">
                            <CrmCalendarIcon className="svgIcon"/>
                            <p>{data.createdAt ? data.createdAt : "DatePH"}</p>
                        </div>

                        <div className="accordionItem">
                            <CrmLocationIcon className="svgIcon"/>
                            <p>{data.address ? data.address : "AddressPH"}</p>
                        </div>

                        <div className={`accordionItem ${statusStyle}`}>
                            <StatusIcon className="svgIcon"/>
                            <p>{statusTranslation ? statusTranslation : "StatusPH"}</p>
                        </div>

                        {data.status === "CREATED" &&
                        <div className="accordionItemDelete">
                            <CrmDeleteIcon onClick={() => removeOrder(data)} className="svgIcon"/>
                        </div>}
                    </li>
                </ul>
            </div>

            <button className="transparent" onClick={() => navigateToOrder(data)}>
                <CrmOpenIcon className="svgIcon"/>
            </button>
        </div>
    )
}