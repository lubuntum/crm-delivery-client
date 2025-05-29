import "../css/order_steps_style.css"

import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { ReactComponent as CrmInventoryIcon } from "../../../res/icons/crm_inventory_icon.svg"
import { ReactComponent as CrmPersonIcon } from "../../../res/icons/crm_person_icon.svg"
import { ReactComponent as CrmManufactureIcon } from "../../../res/icons/crm_manufacture_icon.svg"
import { ReactComponent as CrmShipingIcon } from "../../../res/icons/crm_shiping_icon.svg"
import { ReactComponent as CrmOpenIcon } from "../../../res/icons/crm_open_in_view_icon.svg"

import { ROUTES } from "../../../routes"

export const OrderStepsPage = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [order, setOrder] = useState(location.state.order)

    const navigateToCreateOrderForm = () => {
        navigate(`${ROUTES.CREATE_ORDER}?id=${order.id}`, {state : {order}})
    }
    const navigateToPickupOrderForm = () => {
        navigate(`${ROUTES.PICKUP_ORDER}?id=${order.id}`, {state: {order}})
    }
    const navigateToOrderInspection = () => {
        navigate(`${ROUTES.ORDER_INSPECTION}?id=${order.id}`)
    }
    const navigateToFinishOrderForm = () => {
        navigate(`${ROUTES.FINISH_ORDER}?id=${order.id}`)
    }

    const orderSteps = [
        {name: "Заявка", icon: <CrmInventoryIcon className="svgIcon"/>, onClick: navigateToCreateOrderForm},
        {name: "Курьер", icon: <CrmPersonIcon className="svgIcon"/>, onClick: navigateToPickupOrderForm},
        {name: "Цех", icon: <CrmManufactureIcon className="svgIcon"/>, onClick: navigateToOrderInspection},
        {name: "Доставка", icon: <CrmShipingIcon className="svgIcon"/>, onClick: navigateToFinishOrderForm}
    ]

    return (
        <div className="contentWrapper">
            <div className="orderStepsWrapper">
                <div className="pageTitle">
                    <p>Этапы заказа</p>
                </div>

                <div className="orderStepsContainer">
                    {orderSteps.map((step, index) => (
                        <div className={`orderStepsItem ${"orderStepsItemCompleted_T"}`} key={`orderStep${index}`} onClick={step.onClick}>
                            <div className="orderStepsContent">
                                <div className="orderStepsName">
                                    {step.icon}
                                    <p>{step.name}</p>
                                </div>
                                <CrmOpenIcon className="svgIcon"/>
                            </div>
                            
                            <div className="orderStepsProgressBar" style={{ width: "50%" , display: "none"}}></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}