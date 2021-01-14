import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './Spinner.module.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className={s.div}>
        <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} />
      </div>
    );
  }
}
