import axios from "axios"
import { GET_EMPLOYEE_WORKFLOW_BY_DATE, SERVER_URL } from "./urls"

export const getEmployeeWorkflowDataRequest = async (token, workDate) => {
    return await axios.get(`${SERVER_URL}${GET_EMPLOYEE_WORKFLOW_BY_DATE}`, {
        headers: {Authorization: token},
        params:{
            workDate: workDate
        }
    })
}