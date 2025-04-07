import "../../styles/about_page/about.css"

import { FooterComponent } from "../footer/FooterComponent"
import { AboutBanner } from "./AboutBanner"
import { AboutHistory } from "./AboutHistory"
import { AboutInvite } from "./AboutInvite"
import { AboutTeam } from "./AboutTeam"
import { AboutAchivements } from "./AboutAchivements"
import { AboutPlacement } from "./AboutPlacement"
import { HeaderComponent } from "../header/HeaderComponent"

export const AboutPage = () => {
    return (<>
        <HeaderComponent/>
        <div className="contentWrapper">
            <AboutBanner/>
            <AboutHistory/>
            <AboutInvite/>
        </div>
        <AboutTeam/>
        <div className="contentWrapper">
            <AboutAchivements/>
            <AboutPlacement/>
        </div>
        <FooterComponent/>
    </>)
}