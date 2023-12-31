import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { ModalElem } from './Modal.styled';

export const Modal = ({ onModalClose, image }) => {
  

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        onModalClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },[onModalClose]);

  const handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      onModalClose();
    }
  };

  const { img, tags } = image;
  return (
    <ModalElem onClick={handleBackdropClose}>
      <div className="modal">
        <img src={img} alt={tags} />
      </div>
    </ModalElem>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};