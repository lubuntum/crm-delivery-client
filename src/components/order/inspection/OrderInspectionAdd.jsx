import "../css/order_details_style.css"

export const OrderInspectionAdd = ({ detailsContentType, setShowDetails }) => {
    const tempList = ["Хлопок", "Шерсть", "Полиэстр", "Полиамид", "Сизаль"]

    return (
        <div className="detailsWrapper">
            <div className="detailsContaner">
                <p>{detailsContentType}</p>

                <div className="detailsInput">
                    <select className="customSelect" name="materialId">
                        <option value="" disabled>Материал</option>
                        {tempList.map((material, index) => (
                            <option key={`selectMaterial${index}`}>{material}</option>
                        ))}
                    </select>

                    <div className="detailsInputRow">
                        <input className="customInput"
                               type="number"
                               name="width"
                               step={0.1}
                               min={0}
                               required
                               max={9999}
                               placeholder="Ширина"/>

                        <input className="customInput"
                               type="number"
                               name="height"
                               step={0.1}
                               min={0}
                               max={9999}
                               required
                               placeholder="Высота"/>
                    </div>

                    <div className="detailsTotal">
                        <p>ИТОГО (площадь): 100 м<sup>2</sup></p>
                    </div>

                    <div className="detailsInputRow">
                        <input className="customInput"
                               type="number"
                               name="price"
                               step={0.1}
                               min={0}
                               required
                               placeholder="Цена за ед."/>

                        <input className="customInput"
                               type="number"
                               name="addPrice"
                               step={0.1}
                               min={0}
                               required
                               placeholder="Доп. цена"/>
                    </div>

                    <div className="detailsTotal">
                        <p>ИТОГО (сумма): 1000 ₽</p>
                    </div>

                    <textarea className="customTextarea"
                              placeholder="Комментарии к позиции"
                              rows={5}
                              required/>
                </div>
                
                <div className="customFileUploadContainer">
                    <label className={`customFileUploadLabel`}
                           htmlFor="customFileUploadInputOrderInspect">Выбрать изображения</label>
                    <input id="customFileUploadInputOrderInspect"
                           type="file"
                           multiple
                           accept="image/*"/>
                </div>

                <button className="customButton">Добавить к заказу</button>

                <button className="customButton" onClick={() => setShowDetails(false)}>Закрыть</button>
            </div>
        </div>
    )
}