import PropTypes from 'prop-types';

export const ImageGalleryItem = ({ image, modalOpen }) => {
  const { webformatURL, tags, largeImageURL } = image;
  const modalObject = { img: largeImageURL, tags: tags };
  return (
    <li
      onClick={() => {
        modalOpen(modalObject);
      }}
    >
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
  modalOpen: PropTypes.func.isRequired,
};
