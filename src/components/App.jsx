import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetch from '../components/Api';
import Searchbar from '../components/Searchbar';
import ImageGallery from '../components/ImageGallery';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Loader from '../components/Loader';

export default function App {
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalUrl, setModalUrl] = useState('');

  const onSubmit = query => {
    setImages([]);
    setCurrentPage(1);
    setSearchQuery(query);
    setError(null);
  };

  const fetchPictures = async () => {
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

  const componentDidUpdate(_, prevState) {
    if (this.state.searchQuery !== prevState.searchQuery) {
      this.fetchPictures();
    }
  }

  const toggleModal = largeImageURL => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      modalUrl: largeImageURL,
    }));
  };

    return (
      <>
        <Toaster />
        <div className="App">
          <Searchbar onSubmit={onSubmit} />
          <div>
            <ImageGallery images={images} onClick={toggleModal} />
          </div>
          {images.length % 12 < 1 && images.length > 0 && (
            <Button onClick={this.fetchPictures} btn={btn} />
          )}
          <Loader loading={isLoading} />
          {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
        </div>
      </>
    );
  }
