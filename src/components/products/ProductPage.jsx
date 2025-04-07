import "../../styles/product_page/selection.css"
import "../../styles/product_page/care.css"
import "../../styles/product_page/qa.css"

import { HeaderComponent } from "../header/HeaderComponent"
import { ProductSelection } from "./ProductSelection"
import { ProductThirdAbout } from "./ProductThirdAbout"
import { ProductCare } from "./ProductCare"
import { ProductQA } from "./ProductQA"
import { FooterComponent } from "../footer/FooterComponent"

export const ProductPage = () => {
    return (<>
        <HeaderComponent/>
        <div className="contentWrapper">
            <ProductSelection/>
            <ProductThirdAbout/>
        </div>
        <ProductCare/>
        <div className="contentWrapper">
            <ProductQA/>
        </div>
        <FooterComponent/>
    </>)
}