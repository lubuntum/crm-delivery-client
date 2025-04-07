import { ReactComponent as EcoIcon } from "../res/icons/eco_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as HandshakeIcon } from "../res/icons/handshake_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ThumbIcon } from "../res/icons/thumb_up_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const HomeAbout = () => {
    return (
        <div className="aboutContainer">
            <div className="aboutLeft">
                <div className="aboutTitle">
                    <p>О компании <span>Rustic Retreat</span></p>
                </div>

                <div className="aboutSubtitle">
                    <p>Деревенский шарм и современное качество</p>
                </div>

                <div className="aboutDescription">
                    <p>Мы создаем банные бочки, которые идеально сочетают в себе традиции <br/> и инновации. Наши изделия помогут вам создать уникальную атмосферу <br/> для отдыха и расслабления.</p>
                </div>

                <div className="aboutAdvantages">
                    <div className="aboutAdvantagesItem">
                        <EcoIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Натуральные материалы</p>
                            <p>Мы используем только натуральное дерево высокого качества, чтобы <br/> обеспечить долговечность и экологичность.</p>
                        </div>
                    </div>
                    <div className="aboutAdvantagesItem">
                        <HandshakeIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Индивидуальный подход</p>
                            <p>Каждая бочка создается с учетом ваших пожеланий и потребностей.</p>
                        </div>
                    </div>
                    <div className="aboutAdvantagesItem">
                        <ThumbIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Гарантия качества</p>
                            <p>Мы уверены в своем продукте и предоставляем гарантию на все наши изделия.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="aboutRight">
                <div className="aboutComment">
                    <div className="aboutBorder"></div>
                    <div className="aboutText">
                        <p>Покупка банной бочки Rustic Retreat стала лучшим решением для нашей семьи. Это не только функционально, но и невероятно красиво.</p>
                        <div className="aboutUser">
                            <div className="aboutUserName">
                                <p>Иванов Иван</p>
                                <p>@ivanovivan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}