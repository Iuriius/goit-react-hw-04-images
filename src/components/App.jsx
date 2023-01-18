import React, { Component } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetch from '../components/Api';
import Searchbar from '../components/Searchbar';
import ImageGallery from '../components/ImageGallery';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Loader from '../components/Loader';

export class App extends Component {
  state = {
    images: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    modalUrl: '',
  };

  onSubmit = query => {
    this.setState({
      images: [],
      currentPage: 1,
      searchQuery: query,
      error: null,
    });
  };

  fetchPictures = async () => {
    this.setState({ isLoading: true });
    try {
      const { currentPage, searchQuery } = this.state;
      const response = await fetch({
        page: currentPage,
        searchQuery: searchQuery,
      });

      this.setState(prevState => ({
        images: [...prevState.images, ...response],
        currentPage: prevState.currentPage + 1,
      }));
      toast.success('Loaded, here you go 🙂');
    } catch (error) {
      this.setState({ error });
      toast.error('Sorry, something went wrong 😭');
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchPictures();
    }
  }

  toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalUrl: largeImageURL,
    }));
  };

  render() {
    const { images, isLoading, showModal, modalUrl } = this.state;
    return (
      <>
        <Toaster />
        <div className="App">
          <Searchbar onSubmit={this.onSubmit} />
          <div>
            <ImageGallery images={images} onClick={this.toggleModal} />
          </div>
          {images.length % 12 < 1 && images.length > 0 && (
            <Button onClick={this.fetchPictures} btn={this.btn} />
          )}
          <Loader loading={isLoading} />
          {showModal && <Modal url={modalUrl} toggleModal={this.toggleModal} />}
        </div>
      </>
    );
  }
}
