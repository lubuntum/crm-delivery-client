import { useState } from "react"
import "./css/request_style.css"
import toast, { Toaster } from "react-hot-toast"
import { createOrganizationRequest } from "../../services/api/organizationRequest"

export const RequestPage = () => {
    const [organizationRequest, setOrganizationRequest] = 
        useState({directorName:"", directorSecondName:"", directorPatronymic: "", brandName:"", city:"", phoneNumber:"", email:"", fullName: ""})
    const [isRequested, setIsRequested] = useState(false)
    const organizationRequestHandler = (e) => {
        const {name, value} = e.target
        if ((name === "fullName" || name === "city") && /\d/.test(value)) return
        if (value.length > 35) return
        setOrganizationRequest(prev => ({...prev, [name]: value}))
    }
    const sendOrganizationRequestData = async () => {
        try {
            const data = prepareData()
            if (!data) return
            console.log(data)
            await createOrganizationRequest(data)
            resetData()
            setIsRequested(true)
            toast.success(`Заявка успешно отправлена!`, {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            if (err.response?.status === 409){
                toast.error("Введенная вами почта занята", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
                return
            }
            toast.error("Возникла ошибка при отправке!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const prepareData = () => {
        const fullName = organizationRequest.fullName.trim().split(/\s+/)
        if (fullName.length < 3) {
            toast.error("Заполните ФИО полностью", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return null
        }
        if (!organizationRequest.city || !organizationRequest.phoneNumber || !organizationRequest.brandName || !organizationRequest.email) {
            toast.error("Заполните все поля", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return null
        }
        return {...organizationRequest, directorSecondName: fullName[0], directorName: fullName[1], directorPatronymic: fullName[2], fullName: null}
    }
    const resetData = () => {
        setOrganizationRequest({directorName:"", directorSecondName:"", directorPatronymic: "", brandName:"", city:"", phoneNumber:"", email:"", fullName: ""})
    }
    return (
        <div className="contentWrapper">
            <div className="requestWrapper">
                <p className="loginTitle">Создание организации</p>
                <p>В данном разделе вы можете подать заявку на регистрацию вашей организации.</p>
                <p>После ваша заявка будет рассмотренна администратором, он свяжется с вами по номеру телефона.</p>
                <p>Далее вы сможете войти в аккаунт и начать знакомство и работу.</p>
                <div className="requestContainer">
                    <input className="customInput" type="text" value={organizationRequest.fullName} placeholder="ФИО" name="fullName" onChange={organizationRequestHandler} />
                    <input className="customInput" type="number" value={organizationRequest.phoneNumber} placeholder="Номер телефона" name="phoneNumber" onChange={organizationRequestHandler}/>
                    <input className="customInput" type="text" value={organizationRequest.email} placeholder="Почта" name="email" onChange={organizationRequestHandler}/>
                    <input className="customInput" type="text" value={organizationRequest.brandName} placeholder="Наименование бренда" name="brandName" onChange={organizationRequestHandler} />
                    <input className="customInput" type="text" value={organizationRequest.city} placeholder="Город" name="city" onChange={organizationRequestHandler}/>
                    <button className="customButton" style={{backgroundColor: `${isRequested ? "var(--success-color)": ""}`}} onClick={sendOrganizationRequestData}>{`${!isRequested ? "Отправить заявку" : "Заявка на рассмотрении" }`}</button>
                </div>
            </div>
            <Toaster position="bottom-center" reverseOrder={false}/>
        </div>
    )
}