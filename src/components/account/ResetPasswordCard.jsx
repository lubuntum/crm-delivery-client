import { useEffect, useState } from "react"
import { STATUSES } from "../../statuses"
import { useAuth } from "../../services/auth/AuthProvider"
import { updatePasswordRequest } from "../../services/api/accountApi"
import { ReactComponent as CrmPassIcom } from "../../res/icons/crm_password_icon.svg"
export const ResetPasswordCard = () => {
    const {getToken} = useAuth()
    const [status, setStatus] = useState(STATUSES.IDLE)
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const updatePassword = async () => {
        if (password !== repeatPassword) return
        try {
            const response = await updatePasswordRequest(getToken(), {password: password})
            if (response.data){
                setStatus(STATUSES.SUCCESS)
                setTimeout(()=> setStatus(STATUSES.IDLE), 5000)
                setPassword("")
                setRepeatPassword("")
            } 
        } catch(err) {
            console.error(err)
        }
    }
    const passwordHandler = (e) => {
        const {name, value} = e.target
        if (name === 'password') setPassword(value) 
            else setRepeatPassword(value)
    }
    useEffect(()=> {
        if (password === "" || repeatPassword === "") return
        if (password !== repeatPassword)
            setStatus(STATUSES.ERROR)
        else setStatus(STATUSES.IDLE)

    }, [password, repeatPassword])
    return (
        <div className="accountCardContainer">
            <div className="accountCardTitle">
                <p>Сброс пароля</p>
                {status === STATUSES.ERROR && <span style={{color: "red"}}>Пароли не совпадают</span>}
                {status === STATUSES.SUCCESS && <span style={{color: "green"}}>Успешно</span>}
            </div>
            
            <div className="accountCardWrapper">
                <div className="inputAccountConatiner">
                    <input className="customInput"
                        type="password" 
                        name="password"
                        placeholder="Новый пароль"
                        required
                        onChange={passwordHandler}/>
                    <CrmPassIcom className="svgIcon"/>
                </div>

                <div className="inputAccountConatiner">
                    <input className="customInput"
                        type="password" 
                        name="repeatPassword"
                        placeholder="Повторите пароль"
                        required
                        onChange={passwordHandler}/>
                    <CrmPassIcom className="svgIcon"/>
                </div>
                    
                <button className="customButton" onClick={updatePassword}>Изменить пароль</button>
            </div>
        </div>
    )
}