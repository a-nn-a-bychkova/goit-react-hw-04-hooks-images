import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from '../Loader';
import Button from '../Button';
import imageAPI from '../../services/images-api';
import PropTypes from 'prop-types';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  static propTypes = {
    searchQuery: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  state = {
    images: [],
    error: null,
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const currentSearchQuery = this.props.searchQuery;
    const currentPage = this.state.page;
    if (prevProps.searchQuery !== currentSearchQuery) {
      this.setState({ images: [], error: null, status: Status.IDLE, page: 1 });
    }

    if (
      prevProps.searchQuery !== currentSearchQuery ||
      prevState.page !== currentPage
    ) {
      if (prevProps.searchQuery !== currentSearchQuery) {
        this.setState({
          images: [],
          error: null,
          status: Status.IDLE,
          page: 1,
        });
        this.fetchImages(currentSearchQuery, 1);
      }
      if (prevState.page !== currentPage) {
        if (currentPage === 1) {
          return;
        }
        this.fetchImages(currentSearchQuery, currentPage);
      }
    }
  }

  fetchImages = (currentSearchQuery, page) => {
    this.setState({ status: Status.PENDING });
    imageAPI
      .fetchImage(currentSearchQuery, page)
      .then(newImages => {
        if (newImages.hits.length > 0) {
          return (
            this.setState(prevState => ({
              images: [...prevState.images, ...newImages.hits],
              status: Status.RESOLVED,
            })),
            window.scrollTo({
              top: document.documentElement.scrollHeight,
              behavior: 'smooth',
            })
          );
        }
        return this.setState({
          error: `по запросу ${currentSearchQuery} ничего не найдено`,
          status: Status.REJECTED,
        });
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }));
  };

  changePageNumber = page => {
    this.setState({ page: this.state.page + 1 });
  };

  handleImgClick = event => {
    if (event.target.tagName === 'IMG') {
      this.props.onClick(event.target.dataset.url, event.target.alt);
    }
  };

  render() {
    const { error, images, status } = this.state;

    if (status === 'idle') {
      return <></>;
    }
    if (status === 'pending' || status === 'resolved') {
      return (
        <div>
          <ul className={s.ImageGallery} onClick={this.handleImgClick}>
            {images.map((image, index) => (
              <ImageGalleryItem
                key={`${image.id}${index}`}
                smallPicture={image.webformatURL}
                largePicture={image.largeImageURL}
                alt={image.tags}
              />
            ))}
          </ul>
          {status === 'resolved' && <Button onClick={this.changePageNumber} />}
          {status === 'pending' && <Loader />}
        </div>
      );
    }

    if (status === 'rejected') {
      return <h1>{error}</h1>;
    }
  }
}
