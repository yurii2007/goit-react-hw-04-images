import PropTypes from 'prop-types';
import { ButtonElem } from './Button.styled';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonElem onClick={onLoadMore} type="button">
      Load more
    </ButtonElem>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};