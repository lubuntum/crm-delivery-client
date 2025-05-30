import "./css/info_style.css"

export const InfoPage = () => {
    return (
        <div className="contentWrapper">
            <div className="infoWrapper">
                <div className="pageTitle">
                    <p>Информация</p>
                </div>

                <div className="infoContainer">
                    <div className="infoItem">
                        <div className="infroItemTitle">
                            <p>Организация</p>
                        </div>
                        <p>ООО "ЕСА"</p>
                    </div>

                    <div className="infoItem">
                        <div className="infroItemTitle">
                            <p>Связаться с нами</p>
                        </div>
                        <p>89832707050</p>
                    </div>

                    <div className="infoItem">
                        <div className="infroItemTitle">
                            <p>Latest Build</p>
                        </div>
                        <p>crm_client_mobile_1.0.0</p>
                    </div>
                </div>
            </div>
        </div>
    )
}