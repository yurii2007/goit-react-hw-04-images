import PropTypes from 'prop-types';
import { Component } from 'react';
import { HeaderElem } from './SearchBar.styled';

export class SearchBar extends Component {
  state = {
    query: ''
  }

  handleSubmit = evt => {
    const {query} = this.state
    evt.preventDefault();
    if(!query.trim()) return alert('Please enter a valid query') ;
    this.props.onSubmit(query.trim())
    this.setState({query: ''})
  }

  handleChange = evt => {
    this.setState({query: evt.target.value})
  }

  render() {
    const {query} = this.state

    return (
      <HeaderElem>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>

          <input
            name="query"
            value={query}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
          />
        </form>
      </HeaderElem>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};