import { useEffect, useState } from "react"
import { useAuth } from "../../services/auth/AuthProvider"
import { STATUSES } from "../../statuses"
import { updatePasswordRequest } from "../../services/api/accountApi"

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
        console.log(value)
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
        <>
            <div className="cardWrapper">
                {status === STATUSES.ERROR && <p style={{color: "red"}}>Пароли не совпадают</p>}
                {status === STATUSES.SUCCESS && <p style={{color: "green"}}>Пароль успешно изменен</p>}
                <h4 className="cardTitle">Сброс пароля</h4>
                <div className="cardContentWrapper">
                    <input type="password" onChange={(e) => passwordHandler(e)} value={password} name="password" placeholder="Введите пароль" />
                    <input type="password" onChange={(e) => passwordHandler(e)} value={repeatPassword} name="repeatPassword" placeholder="Повторите пароль" />
                    <button onClick={updatePassword}>Изменить пароль</button>
                </div>
            </div>
        </>
    )
}