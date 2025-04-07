import { ReactComponent as WaterIcon } from "../../res/icons/water_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as SunIcon } from "../../res/icons/wb_sunny_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as BrushIcon } from "../../res/icons/format_paint_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as TempIcon } from "../../res/icons/device_thermostat_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const ProductCare = () => {
    return (
        <div className="careContainer">
            <div className="careTitle">
                <p>Как ухаживать за бочкой</p>
            </div>

            <div className="careSubtitle">
                <p>Следуйте этим простым рекомендациям, чтобы ваша банная бочка служила долго и радовала вас.</p>
            </div>

            <div className="careCards">
                <div className="careItem">
                    <div className="careIcon">
                        <WaterIcon className="icon"/>
                    </div>
                    <div className="careText">
                        <p>Регулярно очищайте <br/> внутреннюю поверхность от <br/> загрязнений.</p>
                    </div>
                </div>

                <div className="careItem">
                    <div className="careIcon">
                        <SunIcon className="icon"/>
                    </div>
                    <div className="careText">
                        <p>Избегайте длительного <br/> воздействия прямых солнечных <br/> лучей.</p>
                    </div>
                </div>

                <div className="careItem">
                    <div className="careIcon">
                        <BrushIcon className="icon"/>
                    </div>
                    <div className="careText">
                        <p>Используйте специальные <br/> средства для ухода за деревом.</p>
                    </div>
                </div>

                <div className="careItem">
                    <div className="careIcon">
                        <TempIcon className="icon"/>
                    </div>
                    <div className="careText">
                        <p>Контролируйте уровень <br/> влажности и температуры.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}