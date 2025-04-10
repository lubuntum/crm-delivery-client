import { useState } from "react"
import "../../../styles/orders/create_order_page/create_order.css"
export const OrderForm = () => {
    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("")
    const [patronymic, setPatronymic] = useState("")
    const [phone, setPhone] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [comment, setComment] = useState("")
    const createOrderHandler = async () => {
        //TODO make api call
    }
    return (
        <>
        <div className="contentWrapper">
            <div className="formWrapper">
                <div className="form">
                    <div className="formTitle">
                        <p>Форма заказа</p>
                    </div>
                    <div className="formInputs">
                        <input type="text" placeholder="ФИО" />
                        <input type="text" placeholder="Номер телефона" />
                        <input type="text" placeholder="Почта (опционально)"/>
                        <input type="text" placeholder="Адрес"/>
                        <textarea rows={5} placeholder="Комментарий" />
                        <button>Создать</button>
                    </div>
                </div>
                
            </div>     
        </div>
            
        </>
    )
}