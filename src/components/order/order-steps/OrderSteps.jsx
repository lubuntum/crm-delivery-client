import "../../../styles/orders/order_steps/order_steps.css"
import openInViewIcon from "../../../res/icons/open_in_view.svg"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ROUTES } from "../../../routes"
export const OrderSteps = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [order, setOrder] = useState(location.state.order)
    
    const steps = [
        {stepName: "Заявка", onClick: () => {navigateToCreateOrderForm()}},
        {stepName: "Забрать заказ", onClick: () => {}},
        {stepName: "Прием заказа", onClick: () => {}}
    ]
    const navigateToCreateOrderForm = () => {
        navigate(`${ROUTES.CREATE_ORDER}?id=${order.id}`, {state : {order}})
    }
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