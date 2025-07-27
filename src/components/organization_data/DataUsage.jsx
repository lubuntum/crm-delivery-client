import {ReactComponent as InfoIcon} from "../../res/icons/crm_info_icon.svg"
import {ReactComponent as ArrowIcon} from "../../res/icons/crm_arrow_down_icon.svg"
import { useState } from "react"

export const DataUsage = () => {
    const [isExpand, setIsExpand] = useState(false)
    return (
        <div className="dataUsageContainer" >
            <div className="dataUsageTitleContainer" onClick={() => setIsExpand(!isExpand)}>
                <div className="iconContainer">
                    <InfoIcon className="icon"/>
                </div>
                <p>Дополнительная информация</p>
                <ArrowIcon className={`icon ${isExpand ? "rotated" : ""}`}  style={{ cursor: 'pointer', display: 'inline-block', transition: 'transform 0.5s' }}/>
            </div>
            <div className={`content ${isExpand ? "visible" : ""}`}>
                <p>
                    Выгрузка истории заказов - диапазон дат используется для поиска заказов по дате их создания диспетчером.
                    К примеру если между 26.07.2025 00:00 - 30.07.2025 00:00 было создано 25 заказов, по ним будет получена вся информация в документе.
                </p>
                <p>Есть возможность выбрать не только дату, но также часы и минуты, если это не нужно, то просто установите начало дня 00:00 в обеих датах. </p>
            </div>         
        </div>
    )
}