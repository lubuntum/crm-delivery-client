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
                console.log(response.data)
                setEmployeesWorkflowData(response.data.map((item => ({
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
        <div className="dateContainer">
            <p>Начальная дата</p>
            <DatePicker selected={startDate} onChange={(date) => {setStartDate(formateLocalDateForServer(date))}} dateFormat={"dd.MM.YYYY"} placeholderText="дд.мм.гггг"/>
        </div>
        <div className="dateContainer">
            <p>Конечная дата</p>
            <DatePicker selected={endDate} onChange={(date) => {setEndDate(formateLocalDateForServer(date))}} dateFormat={"dd.MM.YYYY"} placeholderText="дд.мм.гггг"  />
        </div>
    </div>
    
    <table className="workflowTable" >
        <thead>
            <tr>
                <th>ФИО</th>
                <th>кол-во заказов</th>
                <th>Площадь</th>
                <th>Цена</th>
            </tr>
        </thead>
        <tbody>
            {employeesWorkflowData.map(item => (
                <tr>
                    <th>{item.employeeFullName}</th>
                    <th>{item.ordersCount}</th>
                    <th>{item.itemsArea.toFixed(2)}м<sup>2</sup></th>
                    <th>{item.ordersPrice.toFixed(2)}₽</th>
                </tr>
            ))}
        </tbody>
    </table>
        
    </>
}