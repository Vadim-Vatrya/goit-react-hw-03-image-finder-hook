import { useState } from 'react';

import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Notification from '../Notification';
import Loader from  '../Loader'

import styles from './ImageGallery.module.css';

const ImageGallery = ({
  images,
  totalImages,
  onLoadMore,
  btnLoadDisabled,
  isLoading,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const handleOpenModal = (url, alt) => {
    setShowModal(true);
    setImageURL(url);
    setImageAlt(alt);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setImageURL('');
    setImageAlt('');

  return (
    <>
      {totalImages > 0 ? (
        <>
          <ul className={styles.ImageGallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                alt={tags}
                src={webformatURL}
                srcModal={largeImageURL}
                onOpenModal={handleOpenModal}
              />
            ))}
          </ul>
          <Loader />
          <Button
            type="button"
            title="Load more"
            onLoadMore={onLoadMore}
            btnLoadMoreDisabled={btnLoadDisabled}
          />
        </>
      ) : (
        <Notification message="Please enter a more specific querry!" />
      )}
      {showModal && (
        <Modal
          alt={imageAlt}
          srcModal={imageURL}
          onCloseModal={handleCloseModal}
        />
      )}
    </>
    
  );
};

  // imgArray.length > 0 && (
  //     <ul className={styles.ImageGallery}>
  //       {imgArray.map(({ id, webformatURL, largeImageURL, tags }) => (
  //         <ImageGalleryItem
  //           key={id}
  //           webformatURL={webformatURL}
  //           tags={tags}
  //           onClickImage={() => onClickImage(largeImageURL)}
  //         />
  //       ))}
  //     </ul>
  //   )
  
  
ImageGallery.propTypes = {
  imgArray: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    }),
  ),
  onClickImage: PropTypes.func.isRequired,
};

export default ImageGallery;
