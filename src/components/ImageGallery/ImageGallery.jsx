import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { UlElem } from './ImageGallery.styled';

export const ImageGallery = ({ images, modalOpen }) => {
  return (
    <UlElem>
      {images.map(el => (
        <ImageGalleryItem
          key={el.id}
          modalOpen={modalOpen}
          image={el}
          largeImageURL={el.largeImageURL}
        />
      ))}
    </UlElem>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
