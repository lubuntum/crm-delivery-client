import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Loader } from "../../loader/Loader"
import {ReactComponent as PersonIcon} from "../../../res/icons/crm_person_icon.svg"
import {ReactComponent as OpenInIcon} from "../../../res/icons/crm_open_in_view_icon.svg"
import { ReactComponent as ShipingIcon } from "../../../res/icons/crm_shiping_icon.svg"
import {ReactComponent as Notification } from "../../../res/icons/notification_multiple.svg"
import "./css/organizationActions.css"
const actions = [
    {title: "Сотрудники", actionIcon: <PersonIcon className="icon"/>},
    {title: "Выгрузка истории заказов", actionIcon: <ShipingIcon className="icon"/>},
    {title: "Автоматическая рассылка", actionIcon: <Notification className="icon"/>}
]

export const OrganizationActionsPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const [organization, setOrganization] = useState(null)
    useEffect(()=>{
        if (!location.state) navigate(-1)
        console.log(location.state)
        setOrganization(location.state)
    }, [])

    if (!organization) {
        return <Loader />
    }
    
    return (<div className="contentWrapper">
        <div className="actionsContainer">
            {actions.map(action => (
                <div className="actionItem">
                    <div className="actionContent">
                        <div className="actionName">
                            {action.actionIcon}
                            <p>{action.title}</p>
                        </div>
                        <OpenInIcon className="icon" />
                    </div>
                </div>
            ))}
        </div>
    </div>)
}