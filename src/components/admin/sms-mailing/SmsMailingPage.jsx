import { useEffect, useState } from "react"
import styles from "./sms-mailing-page.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import { Loader } from "../../loader/Loader"
import { sendSmsMailingData } from "../../../services/api/smsApi"
import { useAuth } from "../../../services/auth/AuthProvider"
import toast from "react-hot-toast"
export const SmsMailingPage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const {getToken} = useAuth()
    const [smsData, setSmsData] = useState({
        messageTemplate: "name, мы помним ваш визит от created_at! В company для постоянных клиентов всегда особые условия. Ждем вас снова!",
        startDate: new Date().toISOString().slice(0, 16),
        endDate: new Date().toISOString().slice(0, 16),
        organization: null
    })
    useEffect(()=>{
        if (!location.state) navigate(-1)
        setSmsData((prev) => ({...prev, organization: location.state}))
        
    }, [])
    const smsDataHandler = (e) => {
        const {name, value} = e.target
        setSmsData((prev) => ({...prev, [name]: value}))
    }
    const sendSmsData = async () => {
        try {
            const response = await sendSmsMailingData(smsData, getToken())
            console.log(response.status)
            toast.success("Фирма добавлена!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при отправке", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    if (!smsData.organization) return <Loader/>
    return(
    <div className={styles["sms-mailing-wrapper"]}>
        <div className={styles["sms-mailing-form"]}>
            <h3>Рассылка для {smsData.organization.name}</h3>
            <textarea className="customTextArea" 
                    name="messageTemplate"
                    type="text"
                    placeholder={`Сообщение для рассылки, ключевые слова name - имя клиента, created_at - дата заказа, company - ${smsData.organization.name}`}
                    value={smsData.messageTemplate}
                    required
                    onChange={smsDataHandler} />
            <input type="datetime-local" placeholder="Начальная дата" value={smsData.startDate} onChange={smsDataHandler} name="startDate" />
            <input type="datetime-local" placeholder="Конечная дата" value={smsData.endDate} onChange={smsDataHandler} name="endDate"/>
            <button className="customButton" onClick={sendSmsData}>Начать рассылку</button>
        </div>
        
    </div>)
}