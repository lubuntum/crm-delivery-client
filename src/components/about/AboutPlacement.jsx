import { ReactComponent as StreetIcon } from "../../res/icons/signpost_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as MailIcon } from "../../res/icons/mail_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AboutPlacement = () => {
    return (
        <div className="placementContainer">
            <div className="placementCard">
                <div className="placementTitle">
                    <p>Офис в Абакане</p>
                </div>

                <div className="placemetSubtitle">
                    <p>Свяжитесь с нами для получения <br/> дополнительной информации.</p>
                </div>

                <div className="placementStreet">
                    <StreetIcon className="icon"/>
                    <p>ул.Примерная, д. 1, г. Абакан, Россия</p>
                </div>

                <div className="placementMail">
                    <MailIcon className="icon"/>
                    <p>info@gmail.com</p>
                </div>
            </div>

            <div className="placementCard">
                <div className="placementTitle">
                    <p>Офис в Абакане</p>
                </div>

                <div className="placemetSubtitle">
                    <p>Свяжитесь с нами для получения <br/> дополнительной информации.</p>
                </div>

                <div className="placementStreet">
                    <StreetIcon className="icon"/>
                    <p>ул.Примерная, д. 1, г. Абакан, Россия</p>
                </div>

                <div className="placementMail">
                    <MailIcon className="icon"/>
                    <p>info@gmail.com</p>
                </div>
            </div>

            <div className="placementCard">
                <div className="placementTitle">
                    <p>Офис в Абакане</p>
                </div>

                <div className="placemetSubtitle">
                    <p>Свяжитесь с нами для получения <br/> дополнительной информации.</p>
                </div>

                <div className="placementStreet">
                    <StreetIcon className="icon"/>
                    <p>ул.Примерная, д. 1, г. Абакан, Россия</p>
                </div>

                <div className="placementMail">
                    <MailIcon className="icon"/>
                    <p>info@gmail.com</p>
                </div>
            </div>
        </div>
    )
}