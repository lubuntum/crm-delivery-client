import { useNavigate } from "react-router-dom"

import { ReactComponent as CrmArrowDownIcon } from "../../../res/icons/crm_arrow_down_icon.svg"
import { ReactComponent as CrmPhoneIcon } from "../../../res/icons/crm_phone_icon.svg"
import { ReactComponent as CrmCalendarIcon } from "../../../res/icons/crm_calendar_icon.svg"
import { ReactComponent as CrmLocationIcon } from "../../../res/icons/crm_location_icon.svg"
import { ReactComponent as CrmOpenIcon } from "../../../res/icons/crm_open_in_view_icon.svg"

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

export const OrderItem = ({ data }) => {
    const navigate = useNavigate()

    const statusStyle = statusStyles[data.status] || ""
    const StatusIcon = statusIcons[data.status] || <CrmStatus10Icon/>

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
                            <h2>{data.serialNumber ? data.serialNumber : "Serial_PH"}</h2>
                            <p>{data.clientFullName ? data.clientFullName : "ClientName_PH"}</p>
                        </div>

                        <div className="divider"></div>

                        <div className="accordionItem">
                            <CrmPhoneIcon className="svgIcon"/>
                            <p>{data.clientPhone ? data.clientPhone : "ClientPhone_PH"}</p>
                        </div>

                        <div className="accordionItem">
                            <CrmCalendarIcon className="svgIcon"/>
                            <p>{data.createdAt ? data.createdAt : "Date_PH"}</p>
                        </div>

                        <div className="accordionItem">
                            <CrmLocationIcon className="svgIcon"/>
                            <p>{data.address ? data.address : "Address_ph"}</p>
                        </div>

                        <div className={`accordionItem ${statusStyle}`}>
                            <StatusIcon className="svgIcon"/>
                            <p>{data.status ? data.status : "Status_PH"}</p>
                        </div>
                    </li>
                </ul>
            </div>

            <button className="transparent" onClick={() => navigateToOrder(data)}>
                <CrmOpenIcon className="svgIcon"/>
            </button>
        </div>
    )
}