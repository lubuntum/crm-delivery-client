export const OrderContacts = () => {
    return (
        <div className="orderContactsContainer">
            <div className="orderContactsWrapper">
                <div className="orderContactsTitle">
                    <p>Свяжитесь с нами</p>
                </div>

                <div className="orderContatcsInput">
                    <p>Имя</p>
                    <input type="text"></input>
                </div>

                <div className="orderContatcsInput">
                    <p>Email</p>
                    <input type="text"></input>
                </div>

                <div className="orderContatcsInput">
                    <p>Сообщение</p>
                    <textarea type="text"></textarea>
                </div>

                <button>Отправить</button>
            </div>
        </div>
    )
}