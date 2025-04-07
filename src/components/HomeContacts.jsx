import sliderImage1 from "../res/images/banya-bochka-image1.png"

export const HomeContacts = () => {
    return (
        <div className="contactsContainer">
            <div className="contactsLeft">
                <div className="contactsTitle">
                    <p>Свяжитесь с нами</p>
                </div>

                <div className="contactsSubtitle">
                    <p>Мы готовы ответить на ваши вопросы и помочь выбрать идеальную <br/> банную бочку для вашего дома.</p>
                </div>
            </div>

            <div className="contactsRight">
                <div className="contactsImage">
                    <img src={sliderImage1}></img>
                </div>
            </div>

            <div className="contactsBootom">
                <div className="contactsItem">
                    <div className="contactsItemTitle">
                        <p>Часы работы</p>
                    </div>
                    <div className="contactsItemText">
                        <p>Понедельник - Пятница</p>
                        <p>9:00 - 18:00</p>
                    </div>
                </div>

                <div className="contactsItem">
                    <div className="contactsItemTitle">
                        <p>Наш адрес</p>
                    </div>
                    <div className="contactsItemText">
                        <p>Москва, ул. Лесная, д. 10</p>
                    </div>
                </div>

                <div className="contactsItem">
                    <div className="contactsItemTitle">
                        <p>Свяжитесь с нами</p>
                    </div>
                    <div className="contactsItemText">
                        <p>+7 (888) 888-88-88</p>
                        <p>+7 (888) 888-88-88</p>
                    </div>
                </div>
            </div>
        </div>
    )
}