import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BIC, CORRESPOND_ACCOUNT, CURRENT_ACCOUNT, INN, KPP, OGRN } from "../../services/validation/validationRegexes"
import { getOrganizationDetailsRequest, updateOrganizationDetailsRequest } from "../../services/api/organizationDetailsApi"
import { useAuth } from "../../services/auth/AuthProvider"

export const CompanyData = () => {
    const {getToken} = useAuth()
    const [organizationData, setOrganizationData] = useState({
        brandName: "", inn: "", ogrn: "", kpp: "",
        legalAddress: "", phoneNumber: "", emailAddress: "",
        bankName: "", currentAccount: "", correspondAccount: "", bic: ""})
    const placeholders = {
        brandName: "Введите имя бренда",
        inn: "ИНН",
        kpp: "КПП",
        ogrn: "ОГРН",
        legalAddress: "Юр. адресс",
        currentAccount: "Расчетный счет",
        bankName: "Наименование банка",
        correspondAccount: "Корреспондентский счет",
        bic: "БИК",
        phoneNumber: "Номер телефона",
        emailAddress: "Электронная почта"
    }
    const validationData = {
        inn: [INN, "ИНН от 10 до 12 символов"],
        kpp: [KPP, "КПП - 9 символов"],
        ogrn: [OGRN, "ОГРН - 13 символов"],
        currentAccount: [CURRENT_ACCOUNT, "Расчетный счет - 20 символов"],
        correspondAccount: [CORRESPOND_ACCOUNT, "Корреспондентский счет - 20 символов"],
        bic: [BIC, "Бик - 9 символов"]
    }
    useEffect(()=> {
        const loadOrganizationData = async () => {
            try {
                const response = await getOrganizationDetailsRequest(getToken())
                if (!response.data) return
                setOrganizationData(response.data)
            } catch(err) {
                console.error(err)
                toast.error("Ошибка при попытке получить данные организации", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}}) 
            }
        }
        loadOrganizationData()
    }, [])
    const handleChanges = (e) => {
        const {name, value} = e.target
        setOrganizationData(prev => ({...prev, [name]: value}))
    }
    const updateOrganizationData = async () => {
        try {
            let isValid = true
            Object.keys(organizationData).forEach((key) => {
                if (!validationData[key]) return
                const [regex, errorMessage] = validationData[key];
                if (!regex.test(organizationData[key])) {
                    isValid = false
                    toast.error(errorMessage, {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}}) 
                }
            })
            if (!isValid) return
            await updateOrganizationDetailsRequest(getToken(), organizationData)
            toast.success("Данные фирмы сохранены!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
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
                    <div className="customInputContainer">
                        <input className="customInput" type={validationData[key] ? "number" : "text"} id={key} name={key} value={organizationData[key]} placeholder={placeholders[key]} onChange={handleChanges}/>
                        <label htmlFor={key} className="floatingLabel">{placeholders[key]}</label>
                    </div>
                    
                ))}
                <button className="customButton" onClick={updateOrganizationData}>Сохранить</button>
            </div>
        </div>)
}