import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetch from '../components/Api';
import Searchbar from '../components/Searchbar';
import ImageGallery from '../components/ImageGallery';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Loader from '../components/Loader';

export default function App() {
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
    setIsLoading({ isLoading: true });
    try {
      const response = await fetch({
        page: currentPage,
        searchQuery: searchQuery,
      });
      setCurrentPage(prevState => ({
        images: [...prevState.images, ...response],
        currentPage: prevState.currentPage + 1,
      }));
      toast.success('Loaded, here you go 🙂');
    } catch (error) {
      setError(error);
      toast.error('Sorry, something went wrong 😭');
    } finally {
      setShowModal({ isLoading: false });
    }

    const toggleModal = largeImageURL => {
      setShowModal(({ showModal }) => ({
        showModal: !showModal,
        modalUrl: largeImageURL,
      }));
    };

    
    useEffect(searchQuery) => {}, [fetchPictures];

    return (
      <>
        <Toaster />
        <div className="App">
          <Searchbar onSubmit={onSubmit} />
          <div>
            <ImageGallery images={images} onClick={toggleModal} />
          </div>
          {images.length % 12 < 1 && images.length > 0 && (
            <Button onClick={fetchPictures} btn={Button} />
          )}
          <Loader loading={isLoading} />
          {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
        </div>
      </>
    );
  };
}
