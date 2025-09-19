import axios from "axios"
import { SERVER_URL, SMS_MAILING } from "./urls"

export const sendSmsMailingData = async (mailingData, token) => {
    return await axios.post(`${SERVER_URL}${SMS_MAILING}` , {} , {
        headers: {Authorization: token},
        params: {
            startDate: mailingData.startDate,
            endDate: mailingData.endDate,
            messageTemplate: mailingData.messageTemplate,
            organizationId: mailingData.organization.id
        }
    })
}