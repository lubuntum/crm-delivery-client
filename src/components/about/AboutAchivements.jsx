import { ReactComponent as EcoIcon } from "../../res/icons/forest_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as PaleteIcon } from "../../res/icons/palette_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as PartnerIcon } from "../../res/icons/handshake_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LeafIcon } from "../../res/icons/eco_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AboutAchivements = () => {
    return (
        <div className="achivementsContainer">
            <div className="achivementsTitle">
                <p>Наши достижения</p>
            </div>

            <div className="achivementsSubtitle">
                <p>Rustic Retreat гордится своими сертификатами качества и <br/> профессиональными достижениями, которые подтверждают наш опыт и <br/> преданность делу.</p>
            </div>

            <div className="achivementsCards">
                <div className="achivementCard">
                    <EcoIcon className="icon"/>
                    <p>Мастерство работы с деревом</p>
                    <p>Создание изделий из натуральной древесины с учетом всех традиций.</p>
                </div>

                <div className="achivementCard">
                    <PaleteIcon className="icon"/>
                    <p>Дизайн и эстетика</p>
                    <p>Уникальные и привлекательные дизайны, которые впишутся в любой интерьер.</p>
                </div>

                <div className="achivementCard">
                    <PartnerIcon className="icon"/>
                    <p>Клиентский сервис</p>
                    <p>Индивидуальный подход и забота о каждом клиенте.</p>
                </div>

                <div className="achivementCard">
                    <LeafIcon className="icon"/>
                    <p>Экологичность</p>
                    <p>Использование материалов, которые безопасны для природы и человека.</p>
                </div>
            </div>
        </div>
    )
}