import "../css/order_popup_style.css"

import { SERVER_URL } from "../../../services/api/urls"

export const OrderImagesPopup = ({ images, imagesContentType, setShowImages }) => {
    const getImageSrc = (image) => {
        if (image.path) return `${SERVER_URL}/${image.path}`
        if (image.data) return image.data
        if (typeof image === "string") return image.startsWith("data:") ? image : `${SERVER_URL}/${image.path}`
        return ""
    }
    const getImageKey = (image, index) => {
        return image.id || image.path || `image-${index}`
    }
    return (
        <div className="popupWrapper">
            <div className="popupContainer">
                <p>{imagesContentType}</p>

                <div className="popupCards">
                    {images.map((image, index) => (
                        <div key={getImageKey(image, index)} className="popupCard">
                            <img src={getImageSrc(image)} alt={`popupImage${index}`}/>
                        </div>
                    ))}
                </div>

                <button className="customButton" onClick={() => setShowImages(false)}>Закрыть</button>
            </div>
        </div>
    )
}