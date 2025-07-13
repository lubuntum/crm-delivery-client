import axios from "axios"
import { CREATE_NEWS, SERVER_URL } from "./urls"

export const createNewsRequest = async (token, news, imageBanner) => {
    const formData = new FormData()
    formData.append("news", JSON.stringify(news))
    formData.append("imageBanner", imageBanner)

    return axios.post(`${SERVER_URL}${CREATE_NEWS}`, formData, {
        headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data"
        }
    })
}