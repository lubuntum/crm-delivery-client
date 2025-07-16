import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { getRecentNews } from "../../services/api/newsApi"
import { Loader } from "../loader/Loader"
import { SERVER_URL } from "../../services/api/urls"

export const RecentNews = () => {
    const {getToken} = useAuth()
    const [news, setNews] = useState(null)
    useEffect(()=> {
        const loadRecentNews = async () => {
            const response = await getRecentNews(getToken())
            response.data.content = response.data.content.split(/\n\s*\n/)
            setNews(response.data)
        }
        loadRecentNews()
    }, [])
    if (!news) return (
        <Loader />
    )
    return (
    <div className="newsWrapper">
        <h3>{news.title}</h3>
        {news.content.map((par, index) => 
            <p key={index}>{par}</p>
        )}
        {news.imagePath && 
            <div className="imageCard"><img src={`${SERVER_URL}/${news.imagePath}`} /></div>}
    </div>)
}