import "../../styles/configure_page/configure.css"

import { FooterComponent } from "../footer/FooterComponent"
import { ConfigureFunc } from "./ConfigureFunc"
import { HeaderComponent } from "../header/HeaderComponent"

export const ConfigurePage = () => {
    return (<>
        <HeaderComponent/>
        <div className="contentWrapper">
            <ConfigureFunc/>
        </div>
        <FooterComponent/>
    </>)
}