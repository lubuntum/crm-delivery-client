export const OrderReview = () => {
    return (
        <div className="orderContactsContainer">
            <div className="orderContactsWrapper">
                <div className="orderContactsTitle">
                    <p>Оставить отзыв</p>
                </div>

                <div className="orderContatcsInput">
                    <p>Имя Фамилия</p>
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