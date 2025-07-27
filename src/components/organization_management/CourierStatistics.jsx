import { useEffect, useState } from "react"
import { getEmployeesWorkflowDataByOrganizationAndDateBetween, getEmployeesWorkflowDataByOrganizationRequest } from "../../services/api/employeeApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { formateLocalDateForServer } from "../../services/date/dateFormattes"
import DatePicker from "react-datepicker"
import 'react-datepicker/dist/react-datepicker.css';
import './css/courier_statistics.css'
export const CourierStatistics = () => {
    const {getToken} = useAuth()
    const [startDate, setStartDate] = useState(formateLocalDateForServer(new Date()))
    const [endDate, setEndDate] = useState(formateLocalDateForServer(new Date()))
    const [employeesWorkflowData, setEmployeesWorkflowData] = useState(null)
    useEffect(()=> {
        const loadStatisticByDate = async () => {
            try {
                const response = await getEmployeesWorkflowDataByOrganizationAndDateBetween(getToken(), startDate, endDate)
                setEmployeesWorkflowData(response.data.filter(item=>item).map((item => ({
                    ...item,
                    employeeFullName: `${item.secondName} ${item.name} ${item.patronymic}`
                }))))
            } catch(err) {
                console.error(err)
            }
        }
        if (!startDate || !endDate) return
        loadStatisticByDate()
    }, [startDate, endDate])
    if (!employeesWorkflowData) return <div className="loadingBar"></div>
    return <>
    <div className="dates">
        <h3>Статистика курьеров</h3>
        <div className="courierDateContainer">
            <p>Начальная дата</p>
            <DatePicker selected={startDate} onChange={(date) => {setStartDate(formateLocalDateForServer(date))}} dateFormat={"dd.MM.YYYY"} placeholderText="дд.мм.гггг"/>
        </div>
        <div className="courierDateContainer">
            <p>Конечная дата</p>
            <DatePicker selected={endDate} onChange={(date) => {setEndDate(formateLocalDateForServer(date))}} dateFormat={"dd.MM.YYYY"} placeholderText="дд.мм.гггг"  />
        </div>
    </div>
    <div className="workflowCards" style={{display: `${employeesWorkflowData.length === 0 ? "none" : ""}`, minHeight: `${employeesWorkflowData.length * 125}px`}}>
        {employeesWorkflowData.map(item => (
            <div className="workflowCard">
                <p>{item.employeeFullName}</p>
                <p>Кол-во заказов: {item.ordersCount}</p>
                <p>Площадь: {item.itemsArea.toFixed(2)}м<sup>2</sup></p>
                <p>Цена: {item.ordersPrice.toFixed(2)}₽</p>
            </div>
        ))}
    </div>
        
    </>
}