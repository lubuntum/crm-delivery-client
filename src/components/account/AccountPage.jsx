import { FooterComponent } from "../footer/FooterComponent"
import { HeaderComponent } from "../header/HeaderComponent"
import "../../styles/account_page/account.css"
import { AccountInfoCard } from "./AccountInfoCard"
import { ResetPasswordCard } from "./ResetPasswordCard"
export const AccountPage = () => {

    return(
        <>
            <HeaderComponent/>
            <div className="contentWrapper">
                <div className="cardsWrapper">
                        <AccountInfoCard />
                        <ResetPasswordCard />
                    </div>
            </div>
                
            <FooterComponent/>
        </>
    )
}