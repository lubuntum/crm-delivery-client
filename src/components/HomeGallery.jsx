import sliderImage1 from "../res/images/banya-bochka-image1.png"

export const HomeGallery = () => {
    return (
        <div className="galleryContainer">
            <div className="galleryTitle">
                <p>Галерея наших работ</p>
            </div>
            
            <div className="gallerySubtitle">
                <p>Оцените красоту и качество наших банных бочек, <br/> созданных с любовью и вниманием к деталям.</p>
            </div>

            <div className="galleryImages">
                <div className="galleryItem">
                    <div className="galleryImage">
                        <img src={sliderImage1}></img>
                    </div>
                    <div className="galleryText">
                        <p>Традиционная бочка</p>
                    </div>
                </div>

                <div className="galleryItem">
                    <div className="galleryImage">
                        <img src={sliderImage1}></img>
                    </div>
                    <div className="galleryText">
                        <p>Традиционная бочка</p>
                    </div>
                </div>

                <div className="galleryItem">
                    <div className="galleryImage">
                        <img src={sliderImage1}></img>
                    </div>
                    <div className="galleryText">
                        <p>Традиционная бочка</p>
                    </div>
                </div>

                <div className="galleryItem">
                    <div className="galleryImage">
                        <img src={sliderImage1}></img>
                    </div>
                    <div className="galleryText">
                        <p>Традиционная бочка</p>
                    </div>
                </div>
            </div>
        </div>
    )
}