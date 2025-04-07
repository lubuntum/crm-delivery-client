import { useState } from "react"
import { STATUSES } from "../../statuses"
import { registerRequest } from "../../services/api/authApi"
import { authComponentsKeys } from "./AuthPage"

import { ReactComponent as RegisterIcon } from "../../res/icons/person_add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

const RegisterComponent = ({setCurrentComponent}) => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [accountData, setAccountData] = useState({
        name: "",
        secondName: "",
        patronymic: "",
        phoneNumber: "",
        email: "",
        password: ""
    })
    
    const registerHandler = async () => {
        try {
            console.log(accountData)
            const response = await registerRequest(accountData)
            console.log(response)
            if (response.status === 201) setCurrentComponent(authComponentsKeys.LOGIN)
        } catch(err) {
            console.error(err)
            setStatus(STATUSES.ERROR)
        }
    }

    const handleUserInput = (key, value) => {
        setAccountData(prev => { return {...prev, [key] : value}})
    }

    return (
        <div className="registrationContainer">
            <div className="registrationTitle">
                <p>Регистрация</p>
                <button className="link" onClick={()=> {setCurrentComponent(authComponentsKeys.LOGIN)}}>Назад</button>
            </div>

            <div className="registrationSubtitle">
                <p>Создайте свой аккаунт, чтобы получить доступ к эксклюзивным предложениям и возможности конфигурации сообственной бани бочки</p>
            </div>

            {status === STATUSES.ERROR && <p style={{color:'red'}}>Error occurred</p>}
            <div className="registrationForm">
                <div className="formTitle">
                    <RegisterIcon className="icon"/>
                    <p>Создать аккаунт</p>
                </div>

                <div className="formSubtitle">
                    <p>Заполните форму ниже, чтобы начать</p>
                </div>

                <input autoComplete="off" type="text" placeholder="Имя" onChange={e => handleUserInput('name', e.target.value)} />
                <input autoComplete="off" type="text" placeholder="Фамилия" onChange={e => handleUserInput('secondName',e.target.value)}/>
                <input autoComplete="off" type="text" placeholder="Отчество" onChange={e => handleUserInput('patronymic',e.target.value)}/>
                <input autoComplete="off" type="text" placeholder="Номер телефона"  onChange={e => handleUserInput('phoneNumber',e.target.value)}/>
                <input autoComplete="off" type="email" placeholder="Почта"  onChange={e => handleUserInput('email',e.target.value)}/>
                <input autoComplete="off" type="password" placeholder="Пароль" onChange={e => handleUserInput('password',e.target.value)}/>
                <input autoComplete="off" type="password" placeholder="Повторите Пароль"/>
                
                <button onClick={registerHandler}>Регистрация</button>
            </div>
        </div>
    )
}

export default RegisterComponent