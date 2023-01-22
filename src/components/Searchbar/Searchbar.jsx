import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FcSearch } from 'react-icons/fc';

export default function Searchbar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const change = event => {
    setQuery(event.currentTarget.value);
  };

  const submit = event => {
    event.preventDefault();
    onSubmit(query);
    setQuery('');
  };

  return (
    <>
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={submit}>
          <button type="submit" className="SearchForm-button">
            <FcSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="search"
            onChange={change}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};
