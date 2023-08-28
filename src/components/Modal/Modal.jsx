import PropTypes from 'prop-types';
import { Component } from 'react';
import { ModalElem } from './Modal.styled';

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.key === 'Escape') {
      this.props.onModalClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdropClose = event => {
    if (event.target === event.currentTarget) {
      this.props.onModalClose();
    }
  };

  render() {
    const { img, tags } = this.props.image;
    return (
      <ModalElem onClick={this.handleBackdropClose}>
        <div className="modal">
          <img src={img} alt={tags} />
        </div>
      </ModalElem>
    );
  }
}

Modal.propTypes = {
  onModalClose: PropTypes.func.isRequired,
  image: PropTypes.object.isRequired,
};