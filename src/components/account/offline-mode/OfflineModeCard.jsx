import { useAccountSettings } from '../../../services/account-settings/useAccountSettings'
import '../../../styles/ui_elements/inputs.css'
import styles from "./offline-card.module.css"
import { ReactComponent as HintIcon } from '../../../res/icons/crm_info_icon.svg'
import { useState } from 'react'
export const OfflineModeCard = () => {
    const {settings, setSettings} = useAccountSettings()
    const [expand, setExpand] = useState(false)
    return <>
        <div className='accountCardContainer'>
            <div className={styles["card-content"]}>
                <div className={styles["card-desc"]}>
                    <div className="iconContainer" onClick={() => setExpand(prev => !prev)}>
                        <HintIcon className='icon'/>
                    </div>
                    <p>Оффлайн режим</p>
                </div>
                <label className="switch" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked = {settings.offlineMode} onChange={e => {e.stopPropagation(); setSettings(prev => ({...prev, offlineMode: e.target.checked}))}} />
                    <span className="slider"></span>
                </label>
            </div>
            <div className={`${styles["content"]} ${expand ? styles["visible"]: ""}`}>
                <p><b>Экспериментальная функция</b>, позволяет курьерам работать с заказами без интернет соединения.</p>
                <p>При активации данной функции заказы будут временно сохраняться на ваше устройство и использоваться в режиме оффлайн</p>
                <p>Пожалуйста воздрежитесь от обновления приложения и выхода из аккауна если вы работаете в этом режиме и у вас нет интернет соединения.</p>
                <p>Как только вы снова окажитесь в сети и перейдете к списку заказов, система применит все сделанные вами изменения.</p>
                <p>Удобной работы и доставки мы стараемся для вас! 🚚📦</p>
            </div>
            
        </div>
    </>
}