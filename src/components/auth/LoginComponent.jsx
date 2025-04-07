import { useState } from "react"
import { STATUSES } from "../../statuses"
import { loginRequest } from "../../services/api/authApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { authComponentsKeys } from "./AuthPage"

import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

const LoginComponent = ({setCurrentComponent}) => {
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const {login} = useAuth()

    const loginHandler = async () => {
        try {
            const response = await loginRequest(email, pass)
            login(response.data.token)
        } catch(err) {
            setStatus(STATUSES.ERROR)
        }
    }

    return (
        <div className="authContainer">
            <div className="formContainer">
                <p className="fira-sans-regular">Вход в систему</p>
                <input type="email" placeholder="Почта" />
                <input type="password" placeholder="Пароль" />
                <button>Войти</button>
                <button>Восстановить пароль</button>
            </div>
        </div>
    )
}

export default LoginComponent