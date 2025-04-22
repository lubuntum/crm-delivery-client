import "../../../styles/orders/order_steps/order_steps.css"
import openInViewIcon from "../../../res/icons/open_in_view.svg"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes"
export const OrderSteps = () => {
    const location = useLocation()//TODO get value not from location but fetch by id which in url param
    const navigate = useNavigate()
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
    
    const steps = [
        {stepName: "Заявка", onClick: navigateToCreateOrderForm},
        {stepName: "Курьер", onClick: navigateToPickupOrderForm},
        {stepName: "Цех", onClick: navigateToOrderInspection},
        {stepName: "Доставка", onClick: navigateToOrderInspection}
    ]
    
    return (
        <>
            <div className="contentWrapper">
                
                <div className="orderStepsWrapper">
                    <p>Этапы заказа</p>
                    {steps.map(step => {
                        return <div className="orderStep" onClick={step.onClick}>
                            <div className="orderStepContent">
                                <p>{step.stepName}</p>
                                <img src={openInViewIcon} alt="logo" />
                            </div>
                            
                        </div>
                    })}
                </div>
            </div>
        </>
    )
}