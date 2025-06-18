import { useEffect, useState } from "react"
import { getOrganizationsRequest } from "../../services/api/adminApi"
import { useAuth } from "../../services/auth/AuthProvider"
import "../../styles/ui_elements/inputs.css"
import "./css/organizationsList.css"
export const OrganizationsList = () => {
    const {getToken} = useAuth()

    const [organizations, setOrganizations] = useState()
    useEffect(() => {
        const getOrganizations = async () => {
            try {
                const response = await getOrganizationsRequest(getToken())
                console.log(response.data)
                setOrganizations(response.data)
            } catch(err) {
                console.error(err)
            }
        }
        getOrganizations()
    }, [])
    const changeOrganizationActiveStatus = (status) => {

    }
    return (
        <div className="organizationsWrapper">
            <h3>Организации</h3>
            {organizations && organizations.map(org => (
                <div className="card">
                    <div className="cardHeader"> 
                        <p><b>{org.name}</b></p>
                        <label className="switch">
                            <input type="checkbox" checked = {org.activeStatus === "ENABLED" ? true : false}/>
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