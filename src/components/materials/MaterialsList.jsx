import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { createMaterialForOrganization, getMaterialByOrganizationId } from "../../services/api/materialsApi"
import { useAuth } from "../../services/auth/AuthProvider"
export const MaterialsList = () => {
    const {getToken} = useAuth()
    const [materials, setMaterials] = useState(null)
    const [materialName, setMaterialName] = useState(null)
    useEffect(()=> {
        const loadMaterials = async () => {
            try {
                    const response = await getMaterialByOrganizationId(getToken())
                    setMaterials(response.data)
            } catch(err) {
                 toast.error("Не удалось загрузить материалы", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            }
        }
        loadMaterials()
    } , [])
    const createMaterialHandler = async() => {
        try {
            const response = createMaterialForOrganization(getToken, {name: materialName})
            setMaterials((prev) => [...prev, {id: response.data ,name: materialName}])
        } catch(err) {

        }
    }
    const deleteMaterialHandler = async() => {
        try {

        } catch(err) {
            
        }
    }
    if (materials === null) return <div className="loadingBar"></div>
    return <>
        <table>
            <thead>
                <tr>
                    <th>
                        Наименование
                    </th>
                </tr>
            </thead>
            <tbody>
                {materials && materials.map(material => (
                    <tr>{material.name}</tr>
                ))}
            </tbody>
        </table>
        
        <Toaster position="bottom-center" reverseOrder={false}/>
    </>
}