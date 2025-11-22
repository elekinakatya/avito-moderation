import { useState } from 'react';
import styles from './Gallery.module.css';

interface GalleryProps {
    images: string[];
    title: string;
}

export const Gallery = ({ images, title }: GalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className={styles.gallery}>
            <div className={styles.mainImage}>
                <img
                    src={images[selectedImage]}
                    alt={`${title} - изображение ${selectedImage + 1}`}
                />
                {images.length > 1 && (
                    <div className={styles.imageCounter}>
                        {selectedImage + 1} / {images.length}
                    </div>
                )}
            </div>

            {images.length > 1 && (
                <div className={styles.thumbnails}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`${styles.thumbnail} ${selectedImage === index ? styles.thumbnailActive : ''}`}
                            onClick={() => setSelectedImage(index)}
                        >
                            <img src={image} alt={`${title} - миниатюра ${index + 1}`} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};