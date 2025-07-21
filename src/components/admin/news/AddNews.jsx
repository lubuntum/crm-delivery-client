import "../../order/css/order_pickup_style.css"
import {ReactComponent as CrmCommentIcon} from "../../../res/icons/crm_comment_icon.svg"
import { useState } from "react"
import toast from "react-hot-toast"
import { createNewsRequest } from "../../../services/api/newsApi"
import { useAuth } from "../../../services/auth/AuthProvider"
export const AddNews = () => {
    const {getToken} = useAuth()
    const [news, setNews] = useState({title: "", tags: null, content: ""})
    const [newsBanner, setNewsBanner] = useState(null)
    const newsHandler = (e) => {
        setNews(prev => ({...prev, [e.target.name] : e.target.value}))
    }
    const createNews = async () => {
        if (!news || !news.content || !news.title) {
            toast.error("Контент или заголовок новости пуст", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        if (!newsBanner) {
            toast.error("Выберите новостной баннер", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
            return
        }
        try {
            if (news.tags) news.tags = news.tags.split(" ")
            await createNewsRequest(getToken(), news, newsBanner)
            resetFrom()
            toast.success("Новость создана!", {icon: false, style: {backgroundColor: "rgba(57, 189, 64, 0.8)",color: "white",backdropFilter: "blur(3px)"}})
        } catch(err) {
            toast.error("Ошибка при создании новости", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }
    const resetFrom = () => {
        setNews({title: "", tags: null, content: ""})
        setNewsBanner(null)
    }
    return (
        <div className="addNewsWrapper">
            <input className="customInput" 
                        placeholder="Заголовок" 
                        name="title" 
                        onChange={newsHandler}
                        value={news.title} />
            <input className="customInput"
                        placeholder="Теги через пробел (опционально)"
                        name="tags"
                        required
                        onChange={newsHandler}
                        value={!news.tags ? "" : news.tags}/>
            <textarea className="customTextarea"
                        placeholder="Добавьте контент новости"
                        name="content"
                        required
                        onChange={newsHandler}
                        value={news.content}/>
            <div className="customFileUploadContainer">
                <label className={`customFileUploadLabel`}
                        htmlFor="customFileUploadInputOrderPickup">Выбрать баннер {newsBanner && newsBanner.name}</label>
                <input id="customFileUploadInputOrderPickup"
                        type="file"
                        onChange={(e) => setNewsBanner(e.target.files[0])}
                        accept="image/*"/>
            </div>
            <button className="customButton" onClick={createNews}>Создать новость</button>
        </div>
    )
}