import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import getfetch from '../components/Api';
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

  useEffect(() => {
    async function foo() {
      setIsLoading({ isLoading: true });
      try {
        const response = await getfetch({
          page: currentPage,
          searchQuery: searchQuery,
        });
        setImages(prevState => [...prevState, ...response.hits]);
        toast.success('Loaded, here you go 🙂');
      } catch {
        setError(error);
        toast.error('Sorry, something went wrong 😭');
      } finally {
        setShowModal({ isLoading: false });
      }
    }
    foo();
  }, [searchQuery, currentPage]);

  const toggleModal = () => {
    setShowModal(!showModal);
    setModalUrl(modalUrl);
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
          <Button onClick={fetchPictures} btn={Button} />
        )}
        {error && <p> {error} </p>}
        <Loader loading={isLoading} />
        {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
      </div>
    </>
  );
}
