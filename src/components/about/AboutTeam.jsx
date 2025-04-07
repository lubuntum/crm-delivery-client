import directorImage from "../../res/images/personalDirector.webp"
import designerImage from "../../res/images/personalDesigner.webp"
import masterImage from "../../res/images/personalMaster.webp"
import masterImage2 from "../../res/images/personalMaster2.webp"

export const AboutTeam = () => {
    return (
        <div className="teamContainer">
            <div className="teamContentWrapper">
                <div className="teamTitle">
                    <p>Наша команда</p>
                </div>

                <div className="teamSubtitle">
                    <p>Мы — команда мастеров и дизайнеров, которые объединены одной целью: <br/> создавать уникальные банные бочки, которые дарят тепло и радость.</p>
                </div>

                <div className="teamCards">
                    <div className="teamCard">
                        <div className="teamCardImg">
                            <img src={directorImage}></img>
                        </div>

                        <div className="teamCardName">
                            <p>Алексей Иванов</p>
                            <p>Основатель / директор</p>
                            <p>Абакан, Россия</p>
                        </div>
                    </div>

                    <div className="teamCard">
                        <div className="teamCardImg">
                            <img src={designerImage}></img>
                        </div>

                        <div className="teamCardName">
                            <p>София Васильева</p>
                            <p>Дизайнер</p>
                            <p>Абакан, Россия</p>
                        </div>
                    </div>

                    <div className="teamCard">
                        <div className="teamCardImg">
                            <img src={masterImage}></img>
                        </div>

                        <div className="teamCardName">
                            <p>Вадим Кузнецов</p>
                            <p>Мастер / Строитель</p>
                            <p>Абакан, Россия</p>
                        </div>
                    </div>

                    <div className="teamCard">
                        <div className="teamCardImg">
                            <img src={masterImage2}></img>
                        </div>

                        <div className="teamCardName">
                            <p>Иван Яковлев</p>
                            <p>Мастер / Строитель</p>
                            <p>Абакан, Россия</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}