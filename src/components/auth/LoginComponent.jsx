import { useState } from "react"
import { loginRequest } from "../../services/api/authApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { toast, Toaster } from "react-hot-toast"

import { ReactComponent as CrmEmailIcom } from "../../res/icons/crm_email_icon.svg"
import { ReactComponent as CrmPassIcom } from "../../res/icons/crm_password_icon.svg"

const LoginComponent = () => {
    const { login } = useAuth()
    
    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    
    
    const loginHandler = async () => {
        try {
            const response = await loginRequest(email, pass)
            login(response.data)
        } catch(err) {
            toast.error("Ошибка входа!", {icon: false, style: {backgroundColor: "rgba(239, 71, 111, .8)",color: "white",backdropFilter: "blur(3px)"}})
        }
    }

    return (
        <div className="loginContainer">
            <div className="loginTitle">
                <p>Добро пожаловать!</p>
            </div>

            <div className="cutomInputContainer">
                <input className="customInput" 
                       type="email" 
                       placeholder="Электронная почта" 
                       required
                       onChange={e => setEmail(e.target.value)}/>
                <CrmEmailIcom className="svgIcon"/>
            </div>

            <div className="cutomInputContainer">
                <input className="customInput" 
                       type="password" 
                       placeholder="Пароль" 
                       required
                       onChange={e => setPass(e.target.value)}/>
                <CrmPassIcom className="svgIcon"/>
            </div>

            <div className="forgotPassContainer">
                <button className="linkButton">Восстановить пароль</button>
            </div>

            <button className="customButton" onClick={loginHandler}>Войти</button>

            <Toaster position="bottom-center" reverseOrder={false}/>
        </div>
    )
}

export default LoginComponent