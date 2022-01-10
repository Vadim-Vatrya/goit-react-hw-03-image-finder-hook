// import { Component } from 'react';
import { useState, useEffect } from 'react';

import imagesApi from './services/imagesApi';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';

import styles from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [images, setImages] = useState([]);
  const [totalImages, setTotalImages] = useState(null); //totalHits
  const [isLoading, setIsLoading] = useState(false);
  const [btnLoadDisabled, setBtnLoadDisabled] = useState(false);

  const handleSubmit = newSearch => {
    if (newSearch === search) return;
    setSearch(newSearch);
    setImages([]);
    setCurrentPage(1);
    setTotalImages(null);
    setBtnLoadDisabled(false);
  };

  useEffect(() => {
    if (!search) {
      return;
    }
    setIsLoading(true);
    imagesApi
      .fetchImages({ search, currentPage })
      .then(data => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setTotalImages(data.totalHits);

        if (
          data.hits.length < 12 ||
          data.totalHits === data.hits.length * (currentPage - 1)
        ) {
          setBtnLoadDisabled(true);
        }

        if (currentPage < 2) return;
        const scrollHeight =
          document.documentElement.clientHeight +
          document.documentElement.scrollTop -
          150;
        window.scrollTo({
          // top: document.documentElement.scrollHeight, //прокрутка на всю длину документа
          top: scrollHeight,
          behavior: 'smooth', // можно убрать,подключено на html
        });
      })
      .catch(error => console.log(error))
      .finally(() => setIsLoading(false));
  }, [search, currentPage]);

  const onLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmitForm={handleSubmit} />
      {!totalImages && <Loader visible={isLoading} />}
      {totalImages !== null && (
        <ImageGallery
          images={images}
          totalImages={totalImages}
          onLoadMore={onLoadMore}
          btnLoadMoreDisabled={btnLoadDisabled}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default App;
