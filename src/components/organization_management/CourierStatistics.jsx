import { useEffect, useState } from "react"
import { getEmployeesWorkflowDataByOrganizationRequest } from "../../services/api/employeeApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { formateLocalDateForServer } from "../../services/date/dateFormattes"

export const CourierStatistics = () => {
    const {getToken} = useAuth()
    const [pickedDate, setPickedDate] = useState(formateLocalDateForServer(new Date()))
    const [employeesWorkflowData, setEmployeesWorkflowData] = useState(null)
    useEffect(()=> {
        const loadStatisticByDate = async () => {
            try {
                const response = await getEmployeesWorkflowDataByOrganizationRequest(getToken(), pickedDate)
                console.log(response.data)
                setEmployeesWorkflowData(response.data.map((item => ({
                    ...item,
                    employeeFullName: `${item.secondName} ${item.name} ${item.patronymic}`
                }))))
            } catch(err) {
                console.error(err)
            }
        }
        loadStatisticByDate()
    }, [pickedDate])
    if (!employeesWorkflowData) return <div className="loadingBar"></div>
    return <>
        <table style={{textAlign:"justify", border: "1px solid gray", padding: "5px", borderRadius: "5px"}}>
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