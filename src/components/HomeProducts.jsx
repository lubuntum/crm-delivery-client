import sliderImage1 from "../res/images/banya-bochka-image1.png"

export const HomeProducts = () => {
    return (
        <div className="productsContainer">
            <div className="productsCard">
                <div className="productImage">
                    <img src={sliderImage1}></img>
                </div>
                <div className="proudctText">
                    <div className="productTitle">
                        <p>Классические модели</p>
                    </div>
                    <div className="productSubtitle">
                        <p>Откройте для себя традиционные бочки, которые идеально подходят для любого дома.</p>
                    </div>
                    <div className="productButton">
                        <a>Подробнее &#8594;</a>
                    </div>
                </div>
            </div>

            <div className="productsCard">
                <div className="productImage">
                    <img src={sliderImage1}></img>
                </div>
                <div className="proudctText">
                    <div className="productTitle">
                        <p>Современные решения</p>
                    </div>
                    <div className="productSubtitle">
                        <p>Элегантные и стильные бочки для тех, кто ценит современный дизайн.</p>
                    </div>
                    <div className="productButton">
                        <a>Подробнее &#8594;</a>
                    </div>
                </div>
            </div>
        </div>
    )
}