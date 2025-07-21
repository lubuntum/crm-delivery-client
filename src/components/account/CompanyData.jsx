import { useState } from "react"
import toast from "react-hot-toast"
import { BIC, CORRESPOND_ACCOUNT, CURRENT_ACCOUNT, INN, KPP, OGRN } from "../../services/validation/validationRegexes"

export const CompanyData = () => {
    const [organizationData, setOrganizationData] = useState(
        {brandName: "", INN:"", KPP:"", OGRN: "", legalAddress: "", 
            currentAccount: "", bankName:"", correspondAccount: "", BIC: "", phoneNumber: "", emailAddress: ""})
    const placeholders = {
        brandName: "Введите имя бренда",
        INN: "ИНН",
        KPP: "КПП",
        OGRN: "ОГРН",
        legalAddress: "Юр. адресс",
        currentAccount: "Расчетный счет",
        bankName: "Наименование банка",
        correspondAccount: "Корреспондентский счет",
        BIC: "БИК",
        phoneNumber: "Номер телефона",
        emailAddress: "Электронная почта"
    }
    const validationData = {
        INN: [INN, "ИНН от 10 до 12 символов"],
        KPP: [KPP, "КПП - 9 символов"],
        OGRN: [OGRN, "ОГРН - 13 символов"],
        currentAccount: [CURRENT_ACCOUNT, "Расчетный счет - 20 символов"],
        correspondAccount: [CORRESPOND_ACCOUNT, "Корреспондентский счет - 20 символов"],
        BIC: [BIC, "Бик - 9 символов"]
    }
    const handleChanges = (e) => {
        const {name, value} = e.target
        setOrganizationData(prev => ({...prev, [name]: value}))
    }
    const updateOrganizationData = async () => {
        try {
            console.log(organizationData)
            Object.keys(organizationData).forEach((key) => {
                if (!validationData[key]) return
                const [regex, errorMessage] = validationData[key];
                if (!regex.test(organizationData[key])) {
                    toast.error(errorMessage, {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}}) 
                }
            })
        } catch(err) {
            console.log(err)
            toast.error("Ошибка отправки данных организации!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const validateData = () => {
        
    }
    return (
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Данные организации</p>
            </div>
            <div className="organizationCard">
                {Object.keys(organizationData).map((key) => (
                    <input className="customInput" type={validationData[key] ? "number" : "text"} id={key} name={key} value={organizationData[key]} placeholder={placeholders[key]} onChange={handleChanges}/>
                ))}
                <button className="customButton" onClick={updateOrganizationData}>Сохранить</button>
            </div>
        </div>)
}