import { useEffect, useRef, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import "../../styles/ui_elements/loading_bar.css"
import toast, { Toaster } from "react-hot-toast"
import {ReactComponent as TelegramIcon} from "../../res/icons/telergam_logo_icon.svg"
import "./css/notification.css"
import { checkEmployeesNotificationRequests, unsubscribeNotifications } from "../../services/api/notificationApi"
export const NotificationSettings = ({accountData}) => {
    const {getToken} = useAuth()
    const [isNotificationEnabled, setIsNotificationEnabled] = useState(accountData?.chatId !== null ? true : false)
    const [isLoading, setIsLoading] = useState(false)
    const handleNotificationSubscription = async () => {
        try{
            //Поскольку проверка происходит для всех работников, нельзя так просто сказать
            //подписался ли этот человек
            const response = await checkEmployeesNotificationRequests(getToken())
            if (response.data){
                setIsNotificationEnabled(true)
                toast.success("Теперь вы можете получать уведомления о новых заказах через телеграм!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            } else {
                toast.error("Ваш номер не был найден ботом, проверьте что он совпадает с номером телефона аккаунта", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            }
        } catch(err) {
            console.error(err)
            toast.error("Возникла непредвиденная ошибка, попробуйте позже", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const handleNotificationUnsubscription = async () => {
        try {
            await unsubscribeNotifications(getToken())
            setIsNotificationEnabled(false)
            toast.success("Вы успешно отписались от рассылки уведомлений через телеграм", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Возникла непредвиденная ошибка, попробуйте позже", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    if (isLoading || !accountData) return <div className="accountCardContainer">
    </div>
     
    return(
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Уведомления</p>
            </div>
            
            <div className="customButton btnNotificationContent" style={{backgroundColor:`${isNotificationEnabled ? "#4CAF50" : ""}`}} 
                onClick={() => !isNotificationEnabled ? handleNotificationSubscription() : handleNotificationUnsubscription()}>
                    <p>{!isNotificationEnabled ? "Подключить" : "Подключено"}</p>
                    <div className="notifyProviderIcon"><TelegramIcon/></div>
            </div>
            
            <Toaster position="bottom-center" reverseOrder={false}/>
        </div>
    )
}