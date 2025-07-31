import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { getOrdersBetweenDates } from "../../services/api/orderApi"
import { Toaster, toast } from "react-hot-toast"
import { xlsxDataConverter } from "../../services/xlsx/xlsxDataConverter"
import { formatDateLocalDate, formatLocalDateTimeFromServer } from "../../services/date/dateFormattes"
import { getAccountDataRequest } from "../../services/api/authApi"
import { Loader } from "../loader/Loader"
import { useLocation } from "react-router-dom"
import { ROLES } from "../../roles"
import { getOrdersBetweenDatesByOrganization } from "../../services/api/adminApi"

export const DownloadOrdersData = () => {
    const {getToken} = useAuth()

    const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 16))
    const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 16))

    const location = useLocation()
    const [organization, setOrganization] = useState(null)

    useEffect(() => {
        if (!location.state) return
        setOrganization(location.state)
    }, [])

    const getOrdersDataBetweenDates = async () => {
        if (!startDate || !endDate) {
            toast.error("Пожалуйста выберите обе даты", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        try {
            //TODO wright new request wich accept organizationId instead of token
            // and if role is ADMIN then use this request otherwise user previous reuqest with token
            // this options can help get any data for admin
            let response
            if (organization) 
                response = await getOrdersBetweenDatesByOrganization(getToken(), startDate, endDate, organization.id)
            else 
                response = await getOrdersBetweenDates(startDate, endDate, getToken())
            console.log(response.data)
            xlsxDataConverter(response.data.map(o => ({
                "Номер Заказа": o.serialNumber,
                "Адрес": o.address,
                "Дата создания": new Date(o.createdAt),
                "Статус": o.status,
                "Комментарий": o.comment,
                "ФИО": `${o.clientSecondName} ${o.clientName} ${o.clientPatronymic}`,
                "Номер": o.clientPhone,
                "Кол-во позиций": o.itemsCount,
                "Цена": o.totalPrice

            })), "Заказы", organization ? `Заказы_${organization.name}_${startDate}_${endDate}.xlsx` : `Заказы_${startDate}_${endDate}.xlsx`)
            toast.success("Данные успешно выгружены", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Ошибка при загрузке данных!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const setTestDate = (e) => {
        console.log(e.target.value)
        setStartDate(e.target.value)
    }

    return (
        <>
            <div className="ordersDatesContainer">
                <h3>Выгрузка заказов {organization?.name ? organization.name : ""}</h3>
                <div className="dateContainer">
                    <label htmlFor="start-date">Начальная дата: {formatDateLocalDate(startDate)}</label>
                    <input id="start-date" type="datetime-local" value={startDate} placeholder="Начальная дата" onChange={setTestDate}/>
                </div>
                
                <div className="dateContainer">
                    <label htmlFor="end-date">Конечная дата: {formatDateLocalDate(endDate)}</label>
                    <input id="end-date" type="datetime-local" placeholder="Конечная дата" onChange={e => setEndDate(e.target.value)}/>
                </div>
                
                <button className="customButton" onClick={getOrdersDataBetweenDates}>Выгрузить данные xlsx</button>
            </div>
            <Toaster position="bottom-center" reverseOrder={false}/>
        </>
        
    )
}