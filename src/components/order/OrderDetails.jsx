import { ReactComponent as SettingsIcon } from "../../res/icons/settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as CardIcon } from "../../res/icons/credit_card_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ShipIcon } from "../../res/icons/local_shipping_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as HammerIcon } from "../../res/icons/hardware_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as DoneIcon } from "../../res/icons/task_alt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as BankIcon } from "../../res/icons/account_balance_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as PercentIcon } from "../../res/icons/percent_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { useEffect, useState } from "react"
import { getOrdersByAccount } from "../../services/api/orderApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { STATUSES } from "../../statuses"
import { getBarrelComponentsRequest } from "../../services/api/barrelComponentsApi"

export const OrderDetails = () => {
    const {getToken} = useAuth() 
    const [orders, setOrders] = useState([])
    const [components, setComponents] = useState([])
    const [status, setStatus] = useState(STATUSES.IDLE)
    const orderDetailLabels = [
        { label: 'Материал', key: 'material_id', component: 'material' },
        { label: 'Форма', key: 'form_id', component: 'form' },
        { label: 'Тип Печи', key: 'oven_type_id', component: 'ovenType' },
        { label: 'Цвет', key: 'color_id', component: 'color' },
        { label: 'Дополнение Печи', key: 'oven_addition_id', component: 'ovenAddition' },
        { label: 'Дверь', key: 'door_id', component: 'door' },
        { label: 'Резервуар', key: 'tank_id', component: 'tank' },
        { label: 'Окно', key: 'window_id', component: 'window' },
        { label: 'Основание', key: 'base_id', component: 'base' },
        { label: 'Площадь', key: 'area_id', component: 'area' },
        { label: 'натяжные кольца', key: 'tension_ring_id', component: 'tensionRing' },
        { label: 'Размещение Печи', key: 'oven_placement_id', component: 'ovenPlacement' }
    ]
    useEffect(() => {
        loadClientOrders()
    }, [])
    const loadClientOrders = async () => {
        try {
            const response = await getOrdersByAccount(getToken())
            const componentsResponse = await getBarrelComponentsRequest()
            console.log(response)
            console.log(componentsResponse)
            setOrders(response.data)
            setComponents(componentsResponse.data)
            setStatus(STATUSES.SUCCESS)
        } catch(err) {
            setStatus(STATUSES.ERROR)
            console.log(err)
        }
    }
    return (
        <div className="detailsContainer">
            <div className="detailsStatusContainer">
                <div className="detailsStatusItem">
                    <div className="statusIconContainer">
                        <div className="statusIcon statusActive">
                            <SettingsIcon className="icon"/>
                        </div>
                    </div>

                    <div className="statusName statusActive">
                        <p>Конфигурация</p>
                    </div>
                </div>

                <div className="detailsStatusItem">
                    <div className="statusIconContainer">
                        <div className="statusIcon statusActive">
                            <CardIcon className="icon"/>
                        </div>
                    </div>

                    <div className="statusName statusActive">
                        <p>Оплата</p>
                    </div>
                </div>

                <div className="detailsStatusItem">
                    <div className="statusIconContainer">
                        <div className="statusIcon">
                            <ShipIcon className="icon"/>
                        </div>
                    </div>

                    <div className="statusName">
                        <p>Доставка материала</p>
                    </div>
                </div>

                <div className="detailsStatusItem">
                    <div className="statusIconContainer">
                        <div className="statusIcon">
                            <HammerIcon className="icon"/>
                        </div>
                    </div>

                    <div className="statusName">
                        <p>Строительство</p>
                    </div>
                </div>

                <div className="detailsStatusItem">
                    <div className="statusIconContainer">
                        <div className="statusIcon">
                            <DoneIcon className="icon"/>
                        </div>
                    </div>

                    <div className="statusName">
                        <p>Готово</p>
                    </div>
                </div>
            </div>

            <div className="detailsPriceContainer">
                        {orders.map((order, orderIndex) => (
                            <div className="priceContainer">
                                <div className="priceTitle">
                                    <p>Детали заказа</p>
                                </div>
                                <div className="configItems">
                                    {orderDetailLabels.map(detail => (
                                        <div key={orderIndex} className="configItem">
                                            <p>{detail.label}</p>
                                            <p>{components[detail.component].find(item => item.id === order[detail.key]).type}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="priceNumber">
                                    <p>Итого: <span>{order.totalPrice ? `${order.totalPrice} ₽` : "Свяжитесь с нами"}</span></p>
                                </div>
        
                                <button>Отменить заказ</button>
                            </div>
                        ))}
                    

                    
                

                <div className="paymentContainer">
                    <div className="priceTitle">
                        <p>Варианты оплаты</p>
                    </div>

                    <div className="priceButtons">
                        <div className="priceButton" onClick={()=>{}}>
                            <CardIcon className="icon"/>
                            <p>Банковская карта</p>
                        </div>
                        <div className="priceButton" onClick={()=>{}}>
                            <BankIcon className="icon"/>
                            <p>Банковский перевод</p>
                        </div>
                        <div className="priceButton" onClick={()=>{}}>
                            <PercentIcon className="icon"/>
                            <p>Рассрочка</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}