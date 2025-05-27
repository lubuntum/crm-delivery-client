import { useEffect, useState } from "react"
import { STATUSES } from "../../statuses"
import { useAuth } from "../../services/auth/AuthProvider"
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
                <h4 className="cardTitle">Сброс пароля</h4>
                <div className="cardContentWrapper">
                    <input type="password" placeholder="Введите пароль" />
                    <input type="password" placeholder="Повторите пароль" />
                    <button>Изменить пароль</button>
                </div>
                    
                <button className="customButton">Изменить пароль</button>
            </div>
        </>
    )
}