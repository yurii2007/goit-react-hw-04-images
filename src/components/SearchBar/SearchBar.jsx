import PropTypes from 'prop-types';
import { useState } from 'react';
import { HeaderElem } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    if (!query.trim()) return alert('Please enter a valid query');
    onSubmit(query.trim());
    setQuery('');
  };

  const handleChange = evt => {
    setQuery(evt.target.value);
  };

  return (
    <HeaderElem>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          <span>Search</span>
        </button>

        <input
          name="query"
          value={query}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          required
        />
      </form>
    </HeaderElem>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};