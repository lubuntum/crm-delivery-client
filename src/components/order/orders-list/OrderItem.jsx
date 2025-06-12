import { useNavigate } from "react-router-dom"

import { ReactComponent as CrmArrowDownIcon } from "../../../res/icons/crm_arrow_down_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmCalendarIcon } from "../../../res/icons/crm_calendar_icon.svg"
import { ReactComponent as CrmPersonIcon } from "../../../res/icons/crm_person_icon.svg"
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
import { ORDER_STATUSES } from "../../../statuses"
import { ROLES } from "../../../roles"

const statusColors = {
    CREATED: "order10-20per",
    PICKED: "order10-20per",
    TAKEN: "order30-50per",
    INSPECTION: "order30-50per",
    READY: "order60-90per",
    COMING: "order60-90per",
    COMPLETED: "orderDisplayNone",
}

const statusIcons = {
    CREATED: CrmStatus10Icon,
    PICKED: CrmStatus20Icon,
    TAKEN: CrmStatus40Icon,
    INSPECTION: CrmStatus60Icon,
    READY: CrmStatus80Icon,
    COMING: CrmStatus90Icon,
    COMPLETED: CrmStatusDoneIcon,
}

const statusTranslations = {
    CREATED: "Заказ создан",
    PICKED: "Заказ выбран курьером",
    TAKEN: "Заказ забран",
    INSPECTION: "Заказ на проверке",
    READY: "Заказ готов",
    COMING: "Заказ в пути к клиенту",
    COMPLETED: "Заказ закрыт",
}

export const OrderItem = ({ data, removeOrder, accountData }) => {
    const navigate = useNavigate()

    const statusColor = statusColors[data.status]
    const StatusIcon = statusIcons[data.status]
    const statusTranslation = statusTranslations[data.status]

    const navigateToOrder = (order) => {
        if (accountData?.role === ROLES.SPECIALIST) {
            navigate(`${ROUTES.ORDER_INSPECTION}?id=${order.id}`)
            return
        }
        navigate(`${ROUTES.ORDER_STEPS}?id=${order.id}`, {state: {order}})
    }
    const handlePhoneCall = (e) => {
        e.stopPropagation()
        window.location.href = `tel:${data.clientPhone}`
    }
    return (
        <div className="orderContainer">
            <div className={`accordionContainer ${data.status === ORDER_STATUSES.COMPLETED ? "accordionCompletedContainer" : ""}`}>
                <ul>
                    <li>
                        <input type="checkbox"></input>

                        <CrmArrowDownIcon className="svgIcon"/>

                        <div className="accordionTitle">
                            {data.status !== ORDER_STATUSES.COMPLETED &&
                            <div className={`accordionTitleBar ${statusColor}`}></div>}

                            <div className="accordionTitleInfo" style={{ marginLeft: `${data.status !== ORDER_STATUSES.COMPLETED ? "20px" : ""}` }}>
                                <h2>{data.serialNumber ? data.serialNumber : "SerialPH"}</h2>
                                <p>{data.address ? data.address : "AddressPH"}</p>
                            </div>
                        </div>

                        <div className="divider"></div>

                        <div className="accordionItem" onClick={(e) => handlePhoneCall(e)}>
                            <CrmPhoneIcon className="svgIcon"/>
                            <p>{data.clientPhone ? data.clientPhone : "ClientPhonePH"}</p>
                        </div>

                        <div className="accordionItem">
                            <CrmCalendarIcon className="svgIcon"/>
                            <p>{data.createdAt ? data.createdAt : "DatePH"}</p>
                        </div>

                        <div className="accordionItem">
                            <CrmPersonIcon className="svgIcon"/>
                            <p>{data.clientFullName ? data.clientFullName : "ClientNamePH"}</p>
                        </div>

                        <div className={`accordionItem`}>
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

            <button className={`transparent ${data.status === "COMPLETED" ? "completedButton" : ""}`} 
                    onClick={() => navigateToOrder(data)}>
                <CrmOpenIcon className="svgIcon"/>
            </button>
        </div>
    )
}