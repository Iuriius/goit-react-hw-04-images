import React, { useState, useEffect, useCallback } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import fetch from '../components/Api';
import Searchbar from '../components/Searchbar';
import ImageGallery from '../components/ImageGallery';
import Modal from '../components/Modal';
import Button from '../components/Button';
import Loader from '../components/Loader';

export default function App() {
  const [images, setImages] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [searchQuery, setsearchQuery] = useState('');
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setshowModal] = useState(false);
  const [modalUrl, setmodalUrl] = useState('');

  const onSubmit = query => {
    images: [],
      currentPage: 1;
      searchQuery: query;
      error: null;
    };

  const fetchPictures = () => {
    useCallback async () => {
      setIsLoading(true);
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
  })

 useEffect(()=> {
    if (searchQuery) {
      fetchPictures();
   }
    if (error) {
      console.log('Error');
    }
  }, [searchQuery, currentPage, fetchPictures, error]);

  toggleModal((largeImageURL ) => {
    showModal: !showModal;
    modalUrl: largeImageURL;
  });
  
  return (
    <>
      <Toaster />
      <div className="App">
        <Searchbar onSubmit={onSubmit} />
        <div>
          <ImageGallery images={images} onClick={toggleModal} />
        </div>
        {images.length % 12 < 1 && images.length > 0 && (
          <Button onClick={fetchPictures} btn={btn} />
        )}
        <Loader loading={isLoading} />
        {showModal && <Modal url={modalUrl} toggleModal={toggleModal} />}
      </div>
    </>
  );
}
