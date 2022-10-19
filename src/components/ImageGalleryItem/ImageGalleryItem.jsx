import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ src, alt, largeImageURL, openModal }) => {
    return (
        <li className={css.imageGalleryItem} onClick={() => openModal(largeImageURL)}>
            <img src={src} alt={alt} width="250" className={css.imageGalleryItemImage}/>
        </li>
    )
}

ImageGalleryItem.propTypes = {
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    openModal: PropTypes.func.isRequired,
}