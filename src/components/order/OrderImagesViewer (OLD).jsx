import { SERVER_URL } from "../../services/api/urls"

export const OrderImagesViewer = ({images, imagesContentType, setShowImages}) => {
    
    if (!images) return (
        <>
            <p>По данному запросу не найдено ни одно изображение</p>
            <p>Возможно они удалены либо не были добавлены</p>
        </> 
    )
    return (
        <div className="floating-container">
            <div className="floating-component">
                <button className="exit-button" onClick={()=>setShowImages(false)}>X</button>
                <p>{imagesContentType}</p>
                <div className="imgCards">
                    {images.map(image => (
                        <div className="imgCard">
                            <img src={`${SERVER_URL}/${image.path}`}/>
                        </div>))}
                </div>
            </div>
        </div>
        
    )
}