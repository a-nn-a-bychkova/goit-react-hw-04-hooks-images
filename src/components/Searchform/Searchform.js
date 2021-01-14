import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchform.module.css';
import PropTypes from 'prop-types';

export default class Searchform extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  state = {
    searchQuery: '',
  };

  handleSearchQueryChange = event => {
    this.setState({ searchQuery: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;
    event.preventDefault();
    if (searchQuery.trim() === '') {
      // toast.error('The request is empty');

      return alert('The request is empty');
    }
    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.button}>
          <span className={s.label}>Search</span>
        </button>

        <input
          className={s.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={this.handleSearchQueryChange}
        />
      </form>
    );
  }
}
