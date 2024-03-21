import ImageUploads from './ImageUploads.js';
import { useState } from 'react';

const ImagesDemo = () => {
    const [URLList, setURLList] = useState(null);

    const handleURLListChange = (urlList) => {
        if (URLList) {
            setURLList(urlList.concat(URLList))
        } else {
            setURLList(urlList);
        }
    };

    const handleDeleteClick = () => {
        setURLList(null);
    };

    return (
        <div className="image-container">
            <div className="image-upload-section">
                <ImageUploads onURLListChange={handleURLListChange} />
                {URLList && (
                    <button class ="img-delete-button" onClick={handleDeleteClick}>Delete Images</button>
                )}
            </div>
            <div className="image-carousel">
                {URLList && URLList.map((url, index) => (
                    <img key={index} className="img-preview" src={url} alt="Uploaded" />
                ))}
            </div>
        </div>
    );
}

export default ImagesDemo;
