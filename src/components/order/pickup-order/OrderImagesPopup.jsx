import "../css/order_popup_style.css"

import { SERVER_URL } from "../../../services/api/urls"

export const OrderImagesPopup = ({ images, imagesContentType, setShowImages }) => {
    return (
        <div className="popupWrapper">
            <div className="popupContainer">
                <p>{imagesContentType}</p>

                <div className="popupCards">
                    {images.map((image, index) => (
                        <div className="popupCard">
                            <img src={`${SERVER_URL}/${image.path}`} alt={`popupImage${index}`}/>
                        </div>
                    ))}
                </div>

                <button className="customButton" onClick={() => setShowImages(false)}>Закрыть</button>
            </div>
        </div>
    )
}