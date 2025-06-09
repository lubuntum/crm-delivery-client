import axios from "axios"
import { GET_EMPLOYEE_WORKFLOW_BY_DATE, GET_EMPLOYEES_WORKFLOW_BY_DATE_AND_ORGANIZATION, SERVER_URL } from "./urls"

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