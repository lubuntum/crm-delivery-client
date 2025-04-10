//Информация о сайте, возможности и тд. Главный контент
import "../styles/home_page/banner.css"
import "../styles/home_page/about.css"
import "../styles/home_page/products.css"
import "../styles/home_page/reviews.css"
import "../styles/home_page/gallery.css"
import "../styles/home_page/contacts.css"

import { HeaderComponent } from "./header/HeaderComponent"
import { HomeBanner } from "./HomeBanner"
import { HomeAbout } from "./HomeAbout"
import { HomeProducts } from "./HomeProducts"
import { HomeSecondAbout } from "./HomeSecondAbout"
import { HomeReviews } from "./HomeReviews"
import { HomeGallery } from "./HomeGallery"
import { HomeContacts } from "./HomeContacts"
import { FooterComponent } from "./footer/FooterComponent"
import { useAuth } from "../services/auth/AuthProvider"

export const HomePage = () => {
    const {checkAuth} = useAuth()
    return (<>
        <HeaderComponent/>
        <div className="contentWrapper">
            {checkAuth() ? <p>Welcome home</p> : <p>Main page</p>}
        </div>
        <FooterComponent/>
    </>)
}