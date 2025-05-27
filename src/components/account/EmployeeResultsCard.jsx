import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { getEmployeeWorkflowDataRequest } from "../../services/api/employeeApi"
import { formateLocalDateForServer } from "../../services/date/dateFormattes"

export const EmployeeResultsCard = () => {
    const { getToken } = useAuth()
    
    const [employeeWorkflowData, setEmployeeWorkflowData] = useState(null)

    useEffect(() => {
        const getEmployeeWorkfloWData = async () => {
            try {
                const response = await getEmployeeWorkflowDataRequest(getToken(), formateLocalDateForServer(new Date()))
                setEmployeeWorkflowData(response.data)
            } catch(err) {
                console.error(err)
            }
        }
        getEmployeeWorkfloWData()
    }, [])

    return (
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Статистика за {formateLocalDateForServer(new Date())}</p>
            </div>

            <div className="accountCardWrapper">
                {employeeWorkflowData ?
                <div className="accountCardResultsInfo">
                    <p>Кол-во заказов: <span>{employeeWorkflowData.ordersCount}</span></p>
                    <p>Общая площадь позиций: <span>{employeeWorkflowData.itemsArea ? (<> {employeeWorkflowData.itemsArea}м{<sup>2</sup>} </>) : "Пока пусто"}</span></p>
                    <p>Общая сумма заказов: <span>{employeeWorkflowData.ordersPrice}₽</span></p>
                </div> :

                <div className="accountCardResultsInfo">
                    <p>Не найдено</p>
                </div>}
            </div>
        </div>
    )
}