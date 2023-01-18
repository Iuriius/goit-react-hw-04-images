import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

class Searchbar extends Component {
  state = {
    query: '',
  };

  change = event => {
    this.setState({
      query: event.currentTarget.value,
    });
  };

  submit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.query);
    this.setState({
      query: '',
    });
  };

  render() {
    return (
      <>
        <header className="Searchbar">
          <form className="SearchForm" onSubmit={this.submit}>
            <button type="submit" className="SearchForm-button">
              <FcSearch />
            </button>

            <input
              className="SearchForm-input"
              type="text"
              autoComplete="off"
              autoFocus
              name="search"
              onChange={this.change}
              placeholder="Search images and photos"
            />
          </form>
        </header>
      </>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export default Searchbar;
