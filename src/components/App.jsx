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
  const [loading, setLoading] = useState(false);
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
    if (!searchQuery) {
      return;
    } else {
      async function foo() {
        setLoading(true);
        try {
          const response = await getfetch({
            page: currentPage,
            searchQuery: searchQuery,
          });
          setImages(prevState => [...prevState, ...response.hits]);
          toast.success('Loaded, here you go 🙂');
        } catch {
          setError(error => error);
          toast.error('Sorry, something went wrong 😭');
        } finally {
          setLoading(false);
        }
      }
      foo();
    }
  }, [searchQuery, currentPage]);

  const toggleModal = modalUrl => {
    setShowModal(!showModal);
    setModalUrl(modalUrl);
  };

  const more = () => {
    setCurrentPage(prev => prev + 1);
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
          <Button onClick={more} btn={Button} />
        )}
        <Loader loading={loading} />
        {error && <p> {error} </p>}
        {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
      </div>
    </>
  );
}
