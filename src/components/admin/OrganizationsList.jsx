import { useEffect, useState } from "react"
import { changeOrganizationActiveStatusRequest, getOrganizationsRequest } from "../../services/api/adminApi"
import { useAuth } from "../../services/auth/AuthProvider"
import "../../styles/ui_elements/inputs.css"
import "./css/organizationsList.css"
const organizationStatuses = [
    "ENABLED",
    "DISABLED"
]
export const OrganizationsList = () => {
    const {getToken} = useAuth()

    const [organizations, setOrganizations] = useState()
    useEffect(() => {
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
    if (!organizations) return <div className="loadingBar"></div>
    return (
        <div className="organizationsWrapper">
            <h3>Организации</h3>
            {organizations && organizations.map(org => (
                <div className="card" key={org.id}>
                    <div className="cardHeader"> 
                        <p><b>{org.name}</b></p>
                        <label className="switch">
                            <input type="checkbox" checked = {org.activeStatus === "ENABLED"} onChange={e => {changeOrganizationActiveStatus(org, e.target.checked)}}/>
                            <span className="slider"></span>
                        </label>
                    </div>
                    {org.directorData && 
                    <>
                        <div className="divider"> </div>
                        <div className="cardBody">
                            <p>Директор {`${org.directorData.employeeName} ${org.directorData.employeeSecondName} ${org.directorData.employeePatronymic}`}</p>
                            <p>Почта {org.directorData.email}</p>
                            <p>Номер {org.directorData.phone}</p>
                        </div>
                    </>
                    }
                    
                </div>
                
            ))}
        </div>
    )
}