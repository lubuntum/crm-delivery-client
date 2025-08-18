import { useEffect, useState } from "react"
import { changeOrganizationActiveStatusRequest, getOrganizationsRequest } from "../../services/api/adminApi"
import { useAuth } from "../../services/auth/AuthProvider"
import "../../styles/ui_elements/inputs.css"
import "./css/organizationsList.css"
import "../../styles/ui_elements/buttons.css"

import { AddOrganization } from "./AddOrganization"
import { useNavigate, useNavigation } from "react-router-dom"
import { ROUTES } from "../../routes"
const organizationStatuses = [
    "ENABLED",
    "DISABLED"
]
export const OrganizationsList = () => {
    const navigate = useNavigate()

    const {getToken} = useAuth()

    const [addOrganization, setAddOrganization] = useState()
    const [organizations, setOrganizations] = useState(false)
    const getOrganizations = async () => {
            try {
                const response = await getOrganizationsRequest(getToken())
                setOrganizations(response.data.sort((a, b) => {
                    if (a.name < b.name) return -1
                    else if (a.name > b.name) return 1
                    return 0
                }))
            } catch(err) {
                console.error(err)
            }
        }
    useEffect(() => {
        getOrganizations()
    }, [])
    const changeOrganizationActiveStatus = async (organization, status) => {
    
        try {
            const response = await changeOrganizationActiveStatusRequest(getToken(), {...organization, activeStatus: status ? "ENABLED" : "DISABLED"})
            if (response.status !== 200) {
                console.error("something went wrong")
                return
            }
            setOrganizations(prevOrganizations => 
                prevOrganizations.map((org) => org.id === organization.id ? {...org, activeStatus: status ? "ENABLED" : "DISABLED"} : org)
            )
        } catch(err) {
            console.error(err)
        }
    }
    const showOrganizationDetails = (organization) => {
        navigate(`${ROUTES.ADMIN_ORGANIZATION}`, {state : organization})
    }
    if (!organizations) return <div className="loadingBar"></div>
    return (
        <>
        {addOrganization && <AddOrganization setAddOrganization={setAddOrganization} getOrganizations={getOrganizations} />}
        <div className="organizationsWrapper" style={addOrganization ? {display: "none"} : {}}>
            <h3>Организации</h3>
            {organizations && organizations.map(org => (
                <div className="card" key={org.id} onClick={() => {showOrganizationDetails(org)}}>
                    <div className="cardHeader"> 
                        <p><b>{org.name}</b></p>
                        <label className="switch" onClick={(e) => e.stopPropagation()}>
                            <input type="checkbox" checked = {org.activeStatus === "ENABLED"} onChange={e => {e.stopPropagation();changeOrganizationActiveStatus(org, e.target.checked)}}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    {org.directorData && 
                    <>
                        <div className="divider"> </div>
                        <div className="cardBody">
                            <p>Директор: {`${org.directorData.employeeName} ${org.directorData.employeeSecondName} ${org.directorData.employeePatronymic}`}</p>
                            <p>Почта: {org.directorData.email}</p>
                            <p>Номер: {org.directorData.phone}</p>
                        </div>
                    </>
                    }
                    
                </div>
                
            ))}
            <button className="floatingButton" onClick={() => setAddOrganization(!addOrganization)}>+</button>
        </div>
        </>
        
    )
}