import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlineImageSearch } from 'react-icons/md';

const Loader = ({ loading }) => {
  return <div className="Loader">{loading && <MdOutlineImageSearch />}</div>;
};

Loader.propTypes = {
  loading: PropTypes.bool,
};

export default Loader;
