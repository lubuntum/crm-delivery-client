import { ReactComponent as EcoIcon } from "../../res/icons/forest_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FireIcon } from "../../res/icons/local_fire_department_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as HeartIcon } from "../../res/icons/favorite_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AboutHistory = () => {
    return (
        <div className="aboutContainer">
            <div className="aboutLeft">
                <div className="aboutTitle">
                    <p>История <span>Rustic Retreat</span></p>
                </div>

                <div className="aboutSubtitle">
                    <p>Наш путь к совершенству</p>
                </div>

                <div className="aboutDescription">
                    <p>Rustic Retreat начиналась с простой идеи — вернуть людям радость от <br/> традиционных банных процедур в современном исполнении. Мы <br/> гордимся своим наследием и стремимся сохранить тепло и уют в каждом <br/> изделии.</p>
                </div>

                <div className="aboutAdvantages">
                    <div className="aboutAdvantagesItem">
                        <EcoIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Экологичные материалы</p>
                            <p>Мы используем только натуральную древесину, чтобы сохранить природу <br/> и обеспечить долговечность продукции.</p>
                        </div> 
                    </div>
                    <div className="aboutAdvantagesItem">
                        <FireIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Уникальный дизайн</p>
                            <p>Каждая банная бочка создается с учетом традиций и современных <br/> стандартов.</p>
                        </div>
                    </div>
                    <div className="aboutAdvantagesItem">
                        <HeartIcon className="icon"/>
                        <div className="aboutAdvantagesText">
                            <p>Клиентский подход</p>
                            <p>Мы заботимся о каждом клиенте, предлагая персонализированные <br/> решения.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="aboutRight">
                <div className="aboutComment">
                    <div className="aboutBorder"></div>
                    <div className="aboutText">
                        <p>Заказав банную бочку у Rustic Retreat, мы получили не просто продукт, а настоящий кусочек уюта и традиций. Это была лучшая инвестиция в наш отдых.</p>
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