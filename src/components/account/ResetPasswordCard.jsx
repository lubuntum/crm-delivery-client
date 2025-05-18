import { ReactComponent as CrmPassIcom } from "../../res/icons/crm_password_icon.svg"

export const ResetPasswordCard = () => {
    return (
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Сброс пароля</p>
            </div>
            
            <div className="accountCardWrapper">
                <div className="inputAccountConatiner">
                    <input className="customInput"
                        type="password" 
                        placeholder="Новый пароль"
                        required/>
                    <CrmPassIcom className="svgIcon"/>
                </div>

                <div className="inputAccountConatiner">
                    <input className="customInput"
                        type="password" 
                        placeholder="Повторите пароль"
                        required/>
                    <CrmPassIcom className="svgIcon"/>
                </div>
                    
                <button className="customButton">Изменить пароль</button>
            </div>
        </div>
    )
}