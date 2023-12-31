import { useEffect, useState } from 'react';
import { getImages } from '../helpers/pixabay-api';
import { SearchBar } from './SearchBar/SearchBar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { DivElem } from './App.styled';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalShow, setModalShow] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [isLoadMore, setIsLoadMore] = useState(false);

  useEffect(() => {
    if (!query) return;
    setIsLoading(true);
    (async () => {
      try {
        const { totalHits, hits } = await getImages(query, page);
        setImages(prevImgs => [...prevImgs, ...hits]);
        setIsLoadMore(totalHits > 0 && page < Math.ceil(totalHits / 12));
      } catch (error) {
        alert('Oops, something went wrong');
      } finally {
        setIsLoading(false);
      }
    })();
  }, [query, page]);

  const handleSearch = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleModalOpen = modalImg => {
    setModalImg(modalImg);
    setModalShow(true);
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  return (
    <DivElem>
      <SearchBar onSubmit={handleSearch} />
      {isLoading  && <Loader />}
      {images.length === 0 && query && (
        <p>Sorry, we didn't found pictures for this query</p>
      )}
      <ImageGallery images={images} modalOpen={handleModalOpen} />
      {isLoadMore && <Button onLoadMore={loadMore} />}
      {isModalShow && (
        <Modal onModalClose={handleModalClose} image={modalImg} />
      )}
    </DivElem>
  );
};
