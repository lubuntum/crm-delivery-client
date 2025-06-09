import { useEffect, useState } from "react"
import { toast, Toaster } from "react-hot-toast"
import { createMaterialForOrganization, getMaterialByOrganizationId, removeMaterialForOrganization } from "../../services/api/materialsApi"
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
        if (!materialName) {
            toast.error("Напишите наименование материала", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        try {
            const response = await createMaterialForOrganization(getToken(), {name: materialName})
            setMaterials((prev) => [...prev, {id: response.data, name: materialName}])
            setMaterialName("")
            toast.success("Материал добавлен", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            toast.error("Не удалось добавить материал", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})  
        }
    }
    const removeMaterialHandler = async(material) => {
        try {
            const response = removeMaterialForOrganization(getToken(), material)
            setMaterials(materials.filter(m => m.name !== material.name))
            toast.success("Материал удален!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            console.error(err)
            toast.error("Не удалось удалить материал", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})  
        }
    }
    //TODO - доделать добавление и удаление материалов, кнопки, протестировать.
    // - исправить то, как добавляются ФИО в работниках
    
    if (materials === null) return <div className="loadingBar"></div>
    return <div style={{display: "flex", border: "1px solid gray", padding: "5px", borderRadius: "5px"}}>
        <table style={{textAlign: "justify"}}>
            <thead>
                <tr>
                    <th>
                        Наименование
                    </th>
                </tr>
            </thead>
            <tbody>
                {materials && materials.map(material => (
                    <tr>
                        <th>{material.name}</th>
                        <th><button onClick={() => removeMaterialHandler(material)}>Удалить</button></th>
                    </tr>
                ))}
            </tbody>
        </table>
        <div>
            <div>
                <input name="materialName" value={materialName} type="text" placeholder="Наименование материала" onChange={(e)=> setMaterialName(e.target.value)} />
                <button onClick={createMaterialHandler}>Добавить</button>
            </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false}/>
    </div>
}