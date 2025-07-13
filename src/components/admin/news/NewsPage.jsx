import { Toaster } from "react-hot-toast"
import { AddNews } from "./AddNews"
import "./css/news.css"
export const NewsPage = () => {

    return (
    <div className="contentWrapper" style={{alignItems: "end"}}>
        <AddNews />
        <Toaster position="bottom-center" reverseOrder={false}/>
    </div>)
}