import axios from "axios"
import { ORGANIZATION_MATERIALS, ORGANIZATION_MATERIALS_CREATE, ORGANIZATION_MATERIALS_REMOVE, SERVER_URL } from "./urls"

export const getMaterialByOrganizationId = async (token) => {
    return await axios.get(`${SERVER_URL}${ORGANIZATION_MATERIALS}`, {
        headers: {Authorization: token}
    })
}

export const createMaterialForOrganization = async (token, material) => {
    return await axios.post(`${SERVER_URL}${ORGANIZATION_MATERIALS_CREATE}`, material, {
        headers: {Authorization: token}
    })
}

export const removeMaterialForOrganization = async (token, material) => {
    return await axios.post(`${SERVER_URL}${ORGANIZATION_MATERIALS_REMOVE}`, material, {
        headers: {Authorization: token}
    })
}