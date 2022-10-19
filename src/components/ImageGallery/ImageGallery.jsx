import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';

export const ImageGallery = ({ images, openModal }) => {
    return (
        <ul className={css.imageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) =>
                <ImageGalleryItem
                    key={id}
                    src={webformatURL}
                    largeImageURL={largeImageURL}
                    alt={tags}
                    openModal={openModal}
                    />)}             
        </ul>
    )
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    openModal: PropTypes.func.isRequired,
}
