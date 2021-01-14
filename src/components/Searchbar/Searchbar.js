import React, { Component } from 'react';
import SearchForm from '../Searchform';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ children }) => {
  return <header className={s.Searchbar}>{children}</header>;
};

export default Searchbar;

Searchbar.propTypes = {
  children: PropTypes.element.isRequired,
};
