import { useEffect, useState } from "react"
import { getBarrelComponentsRequest } from "../../services/api/barrelComponentsApi"

import sliderImage1 from "../../res/images/banya-bochka-image1.png"

import { ReactComponent as MaterialIcon } from "../../res/icons/forest_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FormIcon } from "../../res/icons/deployed_code_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ColorIcon } from "../../res/icons/palette_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as OvenIcon } from "../../res/icons/bath_outdoor_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as OvenAddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as OvenPlaceIcon } from "../../res/icons/arrow_downward_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as WindowIcon } from "../../res/icons/grid_view_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as TankIcon } from "../../res/icons/home_speaker_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as DoorIcon } from "../../res/icons/door_front_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as SizeIcon } from "../../res/icons/straighten_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FoundationIcon } from "../../res/icons/foundation_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as TentionIcon } from "../../res/icons/circle_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as TrashIcon } from "../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { SERVER_URL } from "../../services/api/urls"
import { createOrderRequest } from "../../services/api/orderApi"
import { useAuth } from "../../services/auth/AuthProvider"
import { STATUSES } from "../../statuses"

export const ConfigureFunc = () => {
    const settingsItemsTemplate = [
        {
            name: "material_id",
            icon: <MaterialIcon className="icon" />,
            type: "material",
            title: "Выбор материала",
            orderTitle: "Материал",
            description: "Выберите материал, из которого будет изготовлена ваша баня-бочка. Каждый из них обладает уникальными свойствами, такими как теплоизоляция и долговечность, что поможет создать идеальное пространство для отдыха и релаксации.",
            options: []
        },
        {
            name: "form_id",
            icon: <FormIcon className="icon" />,
            type: "form",
            title: "Выбор формы",
            orderTitle: "Форма",
            description: "Форма вашей бани-бочки влияет на её внешний вид и внутреннее пространство. Выберите ту, которая лучше всего соответствует вашему стилю и предпочтениям, чтобы создать уютное место для парения и отдыха.",
            options: []
        },
        {
            name: "color_id", 
            icon: <ColorIcon className="icon" />,
            type: "color",
            title: "Выбор цвета",
            orderTitle: "Цвет",
            description: "Цвет вашей бани-бочки играет важную роль в её восприятии. Выберите оттенок, который гармонирует с окружающим ландшафтом и создаёт атмосферу уюта и спокойствия, подчеркивая природную красоту.",
            options: []
        },
        {   
            name: "oven_placement_id", 
            icon: <><OvenIcon className="icon" /> <OvenPlaceIcon className="icon"/></>,
            type: "ovenPlacement",
            title: "Выбор расположения печи",
            orderTitle: "Расположение печи",
            description: "Расположение печи в вашей бане-бочке влияет на комфорт и эффективность обогрева. Выберите вариант, который обеспечит оптимальные условия для парения и создаст приятную атмосферу внутри.",
            options: []
        },
        {   
            name: "oven_type_id", 
            icon: <OvenIcon className="icon" />,
            type: "ovenType",
            title: "Выбор типа печи",
            orderTitle: "Тип печи",
            description: "ип печи определяет не только способ обогрева, но и атмосферу в вашей бане-бочке. Выберите вариант, который наилучшим образом соответствует вашим предпочтениям и стилю жизни.",
            options: []
        },
        {
            name: "oven_addition_id", 
            icon: <><OvenIcon className="icon" /> <OvenAddIcon className="icon" /></>,
            type: "ovenAddition",
            title: "Выбор дополнения к печи",
            orderTitle: "Дополнения к печи",
            description: "Дополнения к печи могут улучшить её функциональность и эффективность. Выберите опцию, которая наилучшим образом соответствует вашим потребностям, чтобы сделать процесс парения ещё более комфортным.",
            options: []
        },
        {
            name: "window_id", 
            icon: <WindowIcon className="icon" />,
            type: "window",
            title: "Выбор окна",
            orderTitle: "Окно(а)",
            description: "Окна в бане-бочке обеспечивают естественное освещение и вентиляцию. Выберите вариант, который создаст комфортную атмосферу и позволит наслаждаться видами на природу, добавляя уют в ваше пространство.",
            options: []
        },
        {
            name: "tank_id", 
            icon: <TankIcon className="icon" />,
            type: "tank",
            title: "Выбор бака для воды",
            orderTitle: "Бак для воды",
            description: "Бак для воды — важный элемент вашей бани-бочки. Выберите подходящий вариант, который обеспечит необходимый запас воды для комфортного парения и удобства в использовании.",
            options: []
        },
        {   
            name: "door_id", 
            icon: <DoorIcon className="icon" />,
            type: "door",
            title: "Выбор двери",
            orderTitle: "Дверь",
            description: "Дверь — это не только элемент безопасности, но и важная деталь дизайна вашей бани-бочки. Выберите дверь, которая будет сочетаться с общим стилем и обеспечит удобный доступ.",
            options: []
        },
        {
            name: "area_id", 
            icon: <SizeIcon className="icon" />,
            type: "area",
            title: "Выбор размера",
            orderTitle: "Размер",
            description: "Размер вашей бани-бочки влияет на её вместимость и комфорт. Выберите оптимальный размер, который соответствует вашим потребностям и возможностям участка, чтобы создать идеальное место для отдыха.",
            options: []
        },
        {
            name: "base_id", 
            icon: <FoundationIcon className="icon" />,
            type: "base",
            title: "Выбор фундамента",
            orderTitle: "Фундамент",
            description: "Правильный фундамент — залог долговечности и устойчивости вашей бани-бочки. Выберите подходящий вариант, который обеспечит надежную основу для вашего строения и защитит его от воздействия внешней среды.",
            options: []
        },
        {
            name: "tension_ring_id", 
            icon: <TentionIcon className="icon" />,
            type: "tensionRing",
            title: "Выбор стяжных колец",
            orderTitle: "Стяжные колца",
            description: "Стяжные кольца обеспечивают дополнительную прочность и устойчивость конструкции вашей бани-бочки. Выберите количество колец, которое обеспечит необходимую поддержку и защиту, гарантируя долговечность вашей бани.",
            options: []
        }
    ]
    const [settingsItems, setSettingsItems] = useState(null)
    const [totalPrice, setTotalPrice] = useState(0)
    const [barrelSauna, setBarrelSauna] = useState({})
    const [status, setStatus] = useState(STATUSES.IDLE)

    const {getToken} = useAuth()

    useEffect(() => {
        const getBarrelComponents = async () => {
            const request = await getBarrelComponentsRequest()
            const preparedItems = settingsItemsTemplate.map( item => {
                const dataForItem = request.data[item.type]
                if (!dataForItem) return item
                item.options = dataForItem
                return item
            })
            setSettingsItems(preparedItems)
        }
        getBarrelComponents()
    }, [])

    const createOrder = async() => {
        if (status === STATUSES.SUCCESS) return
        const barrelSaunaForOrder = {}
        settingsItems.forEach(item => {
            if (!barrelSauna[item.type] || !barrelSauna[item.type].id ) return
            barrelSaunaForOrder[item.name] = barrelSauna[item.type].id
        })
        
        barrelSaunaForOrder.total_price = totalPrice
        try {
            const response = await createOrderRequest({barrelSauna: barrelSaunaForOrder}, getToken())
            setStatus(STATUSES.SUCCESS)
        } catch(err) {
            setStatus(STATUSES.ERROR)
        }
        
    }
    const handleOptionSelect = (type, option) => {
        const updatedBarrelSauna = {... barrelSauna, [type]: option}
        setTotalPrice(countToTotalPrice(updatedBarrelSauna))
        setBarrelSauna(updatedBarrelSauna)
    }
    const countToTotalPrice = (updatedBarrelSauna) => {
        let totalPrice = 0
        Object.entries(updatedBarrelSauna).forEach(([key, value]) => {
            console.log(`${JSON.stringify(value)} + ${totalPrice}`)
            if (key === "material" || key === "area") return
            if (value && value.price) totalPrice += value.price
        })
        if (updatedBarrelSauna["material"] && updatedBarrelSauna["area"] ) 
            totalPrice += updatedBarrelSauna["material"].price * updatedBarrelSauna["area"].total_area
        return totalPrice
    }

    const handleRemoveOption = (type) => {
        setBarrelSauna(prevState => {
            const newState = { ...prevState }
            delete newState[type]
            return newState
        })
    }

    

    const renderSelectedItems = () => {
        return Object.entries(barrelSauna).map(([key, value]) => {
            const selectedItem = settingsItems.find(item => item.type === key)
            const selectedOption = selectedItem.options.find(option => option.id === value.id)
            
            return (
                <div className="configureSelectedItem">
                    <div className="configureSelectedItemTitle">
                        <div className="orderTitle">
                            <p>{selectedItem.orderTitle}</p>
                        </div>
                        <div className="configureSelectedItemDelete">
                            <button className="transparent" onClick={() => handleRemoveOption(key)}><TrashIcon className="icon"/></button>
                        </div>
                    </div>
                    <div className="orderTitleDivider"></div>
                    <div key={`gridItem${key}`} className="configureSelectedItemText">
                        {selectedOption.path ?
                        <div className="configureSelectedItemImage">
                            <img src={`${SERVER_URL}${selectedOption.path}`}></img>
                        </div> : ""}

                        {selectedOption.hex ?
                        <div className="configureSelectedItemColor" style={{backgroundColor: selectedOption.hex}}></div> : ""}

                        <div className="configureSelectedItemType">
                            <p>{selectedOption.type}</p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="configureContainer">
            <div className="configureTitle">
                <p>Индивидуальная настройка банных бочек</p>
            </div>

            <div className="configureSubtitle">
                <p>Создайте идеальную банную бочку, которая подчеркнёт ваш стиль и гармонично впишется в ваш загородный отдых. <br/> Выберите материалы, размеры и дополнительные опции для создания уникального пространства для релаксации.</p>
            </div>

            <div className="configureContent">
                <div className="configureLeft">
                    <div className="configureLeftTitle">
                        <p>Настройки бочки</p>
                    </div>
                    <div className="configureSettings">
                        {settingsItems && settingsItems.map((item, index) => (
                            <div className="configureSettingsItem" key={`item${index}`}>
                                <div className="configureSettingsTitle">
                                    {item.icon}
                                    <div className="configureSettingsName">
                                        <p>{item.title}</p>
                                    </div>
                                </div>

                                <div className="configureSettingsDescription">
                                    <p>{item.description}</p>
                                </div>

                                <div className="configureSettingsButtons">
                                    {item.options.map((option, index) => (
                                        <button key={`itemOption${index}`}
                                                className={`configureItem ${barrelSauna[item.type]?.id === option.id ? "configureSelected" : ""}`}
                                                onClick={() => handleOptionSelect(item.type, option)}>{option.type} ({option.price} ₽)</button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={`configureRight`}>
                    <div className="configureSelectedItems">
                        {renderSelectedItems()}
                    </div>
                    
                    {Object.keys(barrelSauna).length > 0 ? 
                    <div className="configureOrderBuildButton">
                        {Object.keys(barrelSauna).length === 12 ?
                        <button style={{backgroundColor: status === STATUSES.SUCCESS ? "green" : ""}} onClick={createOrder}>
                            {status === STATUSES.SUCCESS ? "Заказ успешно сохранен" : "Сохранить заказ"}
                        </button> : ""}
                        <div className="orderSum">
                            <p>Итого: <span>{totalPrice} ₽</span></p>
                        </div> 
                    </div> : ""}
                </div>
            </div>
        </div>
    )
}