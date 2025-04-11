import "../../../styles/orders/order_steps/order_steps.css"
import openInViewIcon from "../../../res/icons/open_in_view.svg"
export const OrderSteps = () => {
    const steps = [
        {stepName: "Заявка", onClick: () => {}},
        {stepName: "Забрать заказ", onClick: () => {}},
        {stepName: "Прием заказа", onClick: () => {}}
    ]
    return (
        <>
            <div className="contentWrapper">
                <div className="orderStepsWrapper">
                    {steps.map(step => {
                        return <div className="orderStep">
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