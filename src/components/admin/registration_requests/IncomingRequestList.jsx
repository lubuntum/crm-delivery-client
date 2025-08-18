import { useEffect, useState } from "react"
import { Loader } from "../../loader/Loader"
import { getOrganizationRequestsByStatus, updateOrganizationRequestStatus } from "../../../services/api/organizationRequest"
import { useAuth } from "../../../services/auth/AuthProvider"
import {ReactComponent as DeleteIcon} from "../../../res/icons/crm_delete_icon.svg"
import toast from "react-hot-toast"
import { ROLES } from "../../../roles"
import { addOrganizationRequest } from "../../../services/api/adminApi"
export const IncomingRequestList = () => {
    const [requests, setRequests] = useState(null)
    const {getToken} = useAuth()

    const getIncomingRequests = async () => {
            try {
                const response = await getOrganizationRequestsByStatus("PENDING", getToken())
                setRequests(response.data)
            } catch(err) {
                console.error(err)
            }
        }
    useEffect(()=>{
        getIncomingRequests()
    }, [])
    const updateIncomingRequestStatus = async (request, status) => {
        try {
            //also create new organization with request data 
            const organizationTemp = {directorData: {email: request.email, role: ROLES.DIRECTOR, 
                    employeeName: request.directorName, 
                    employeeSecondName: request.directorSecondName, employeePatronymic: request.directorPatronymic,
                    phone: request.phoneNumber}, name: request.brandName}
                    //console.log(organizationTemp)
            await addOrganizationRequest(getToken(), organizationTemp)
            await updateOrganizationRequestStatus({id: request.id, requestStatus: status}, getToken())
            await getIncomingRequests()
            if(status === "APPROVED")
                toast.success("Заявка одобрена!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
            else toast.success("Заявка отклонена", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Возникла ошибка при изменении статуса", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    if (!requests) return <Loader/>
    return (
    <div className="incomingRequestsContainer">
        {requests.length === 0 && <p className="noRequestContainer">На данный момент заявок нет</p>}
        {requests.map(request => (
            <div className="requestItem">
                <div className="requestItemHeader">
                    <p><b>{`${request.directorSecondName} ${request.directorName} ${request.directorPatronymic}`}</b></p>
                    <DeleteIcon className="iconDanger" onClick={() => {updateIncomingRequestStatus(request, "REJECTED")}} />
                </div>
                <div className="divider"></div>
                <div className="requestItemBody">
                    <p>Номер: {request.phoneNumber}</p>
                    <p>Почта: {request.email}</p>
                    <p>Бренд: {request.brandName}</p>
                    <p>Город: {request.city}</p>
                    <button className="customButton" onClick={() => {updateIncomingRequestStatus(request, "APPROVED")}}>Принять</button>
                </div>
                
            </div>
        ))}
    </div>)
}