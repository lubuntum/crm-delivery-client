import { useEffect, useState } from "react"
import { getEmployeeWorkflowDataRequest } from "../../services/api/employeeApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { formateLocalDateForServer } from "../../services/date/dateFormattes"

export const EmployeeResultsCard = () => {
    const {getToken} = useAuth()
    const [employeeWorkflowData, setEmployeeWorkflowData] = useState(null)
    useEffect(() => {
        const getEmployeeWorkfloWData = async () => {
            try {
                const response = await getEmployeeWorkflowDataRequest(getToken(), formateLocalDateForServer(new Date()))
                console.log(response.data)
                setEmployeeWorkflowData(response.data)
            } catch(err) {
                console.error(err)
            }
        }
        getEmployeeWorkfloWData()
    }, [])
    return (<>
        <div className="cardWrapper">
            <h4 className="cardTitle">Статистика за день</h4>
            {employeeWorkflowData &&
                <div className="cardContentWrapper">
                    <p>Количество заказов: {employeeWorkflowData.ordersCount}</p>
                    <p>Общая площадь позиций:{employeeWorkflowData.itemsArea ? (<> {employeeWorkflowData.itemsArea}м{<sup>2</sup>} </>) : "Пока пусто"} </p>
                    <p>Общая сумма заказов: {employeeWorkflowData.ordersPrice}₽</p>
                </div>
            }
            {!employeeWorkflowData && 
            <div className="cardContentWrapper">
                <p>На дату: {formateLocalDateForServer(new Date())} ничего не найдено</p>
            </div>}
        </div>
    </>)
}