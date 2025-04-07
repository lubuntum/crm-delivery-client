import { useEffect, useState } from "react"
import { ReactComponent as EcoIcon } from "../res/icons/forest_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ComIcon } from "../res/icons/local_fire_department_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as StarIcon } from "../res/icons/star_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import sliderImage1 from "../res/images/banya-bochka-image1.png"

export const HomeBanner = () => {
    const slides = [
        {image: sliderImage1},
        {image: sliderImage1},
        {image: sliderImage1},
        {image: sliderImage1},
    ]  
    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState(1)
    const [isPaused, setIsPaused] = useState(false)
    
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isPaused) {
                setCurrentIndex((prevIndex) => {
                    if (prevIndex === slides.length - 1) {
                        setDirection(-1)
                        return prevIndex - 1
                    } else if (prevIndex === 0) {
                        setDirection(1);
                        return prevIndex + 1
                    } else {
                        return prevIndex + direction
                    }
                })
            }
        }, 4000)
    
        return () => clearInterval(interval)
    }, [direction, slides.length, isPaused])

    return (<>
        <div className="bannerContainer">
            <div className="bannerLeft">
                <div className="bannerTitle">
                    <p>Открой для себя уют и <br/> комфорт с Rustic Retreat</p>
                </div>

                <div className="bannerSubtitle">
                    <p>Погрузитесь в мир уюта и наслаждения с нашими банными <br/> бочками, которые сочетают в себе деревенский шарм и <br/> современное качество.</p>
                </div>

                <div className="bannerAdvantages">
                    <div className="bannerAdvantagesItem">
                        <EcoIcon className="icon"/>
                        <p>Экологичность</p>
                    </div>
                    <div className="bannerAdvantagesItem">
                        <ComIcon className="icon"/>
                        <p>Тепло и уют</p>
                    </div>
                    <div className="bannerAdvantagesItem">
                        <StarIcon className="icon"/>
                        <p>Высокое качество</p>
                    </div>
                </div>

                <div className="bannerButtons">
                    <button style={{fontSize: "1.25rem", height: "50px", padding: "0 50px"}}>Регистрация</button>
                    <button className="outline" style={{fontSize: "1.25rem", height: "50px", padding: "0 50px"}}>О нас</button>
                </div>
            </div>

            <div className="bannerRight">
                <div className="bannerSlider">
                    <div className="bannerSlides" 
                         onMouseEnter={() => {setIsPaused(true)}}
                         onMouseLeave={() => {setIsPaused(false)}} 
                         style={{transform: `translateX(-${currentIndex * 100}%)`}}>
                        {slides.map((slide, index) => (
                            <div className="bannerSlide" key={index}>
                                <div className="bannerSlideContent">
                                    <img src={slide.image}></img>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bannerSliderGradientLeft"></div>
                </div>
            </div>
        </div>
    </>)
}