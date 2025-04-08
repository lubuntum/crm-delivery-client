
export const ResetPasswordCard = () => {

    return (
        <>
            <div className="cardWrapper">
                <h4 className="cardTitle">Сброс пароля</h4>
                <div className="cardContentWrapper">
                    <input type="password" placeholder="Введите пароль" />
                    <input type="password" placeholder="Повторите пароль" />
                    <button>Изменить пароль</button>
                </div>
            </div>
        </>
    )
}