import axios from "axios"
import { GET_EMPLOYEE_WORKFLOW_BY_DATE, GET_EMPLOYEES_WORKFLOW_BY_DATE_AND_ORGANIZATION, GET_EMPLOYEES_WORKFLOW_BY_DATE_BETWEEN_AND_ORGANIZATION, SERVER_URL } from "./urls"

export const getEmployeeWorkflowDataRequest = async (token, workDate) => {
    return await axios.get(`${SERVER_URL}${GET_EMPLOYEE_WORKFLOW_BY_DATE}`, {
        headers: {Authorization: token},
        params:{
            workDate: workDate
        }
    })
}
export const getEmployeesWorkflowDataByOrganizationRequest = async (token, workDate) => {
    return await axios.get(`${SERVER_URL}${GET_EMPLOYEES_WORKFLOW_BY_DATE_AND_ORGANIZATION}`, {
        headers: {Authorization: token},
        params: {
            workDate: workDate
        }
    })
}

export const getEmployeesWorkflowDataByOrganizationAndDateBetween = async (token, startDate, endDate) => {
    const response = await axios.get(`${SERVER_URL}${GET_EMPLOYEES_WORKFLOW_BY_DATE_BETWEEN_AND_ORGANIZATION}`, {
        headers: {Authorization: token},
        params: {
            startDate: startDate,
            endDate: endDate
        }
    })
    response.data = response.data.reduce((acc, employee) => {
        const {employeeId, ordersCount, itemsArea, ordersPrice} = employee
        if (!acc[employeeId]) {
            acc[employeeId] = {
                ...employee,
                ordersCount: 0,
                itemsArea: 0,
                ordersPrice: 0

            }
        }
        acc[employeeId].ordersCount += ordersCount
        acc[employeeId].itemsArea += itemsArea
        acc[employeeId].ordersPrice += ordersPrice
        return acc
    }, [])
    return response
}