import { ReactComponent as EcoIcon } from "../../res/icons/eco_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as HourglassIcon } from "../../res/icons/hourglass_empty_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as PaletteIcon } from "../../res/icons/palette_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const ProductThirdAbout = () => {
    return (
        <div className="aboutContainer">
            <div className="aboutLeft">
                <div className="aboutTitle">
                    <p>Природные материалы</p>
                </div>

                <div className="aboutSubtitle">
                    <p>Качество, проверенное временем</p>
                </div>

                <div className="aboutDescription">
                    <p>Наши банные бочки изготавливаются из натурального дерева, <br/> обеспечивая долговечность и экологичность. Мы используем только <br/> высококачественные материалы, такие как кедр и дуб, которые славятся <br/> своими полезными свойствами. Каждая бочка проходит тщательную <br/> обработку, чтобы гарантировать комфорт и безопасность <br/> использования.</p>
                </div>

                <div className="aboutAdvantages">
                    <div className="aboutAdvantagesItem">
                        <EcoIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Экологичность</p>
                            <p>Только натуральные материалы для вашего здоровья.</p>
                        </div>
                    </div>
                    <div className="aboutAdvantagesItem">
                        <HourglassIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Долговечность</p>
                            <p>Высокое качество, которое сохраняется годами.</p>
                        </div>
                    </div>
                    <div className="aboutAdvantagesItem">
                        <PaletteIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Эстетика</p>
                            <p>Уникальный дизайн, подчеркивающий природное очарование.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="aboutRight">
                <div className="aboutComment">
                    <div className="aboutBorder"></div>
                    <div className="aboutText">
                        <p>Дерево — это живой материал, который дарит уют <br/> и гармонию.</p>
                        <div className="aboutUser">
                            <div className="aboutUserImg">
                                <img></img>
                            </div>
                            <div className="aboutUserName">
                                <p>Rustic Retreat</p>
                                <p>Эксперты по банным бочкам</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}