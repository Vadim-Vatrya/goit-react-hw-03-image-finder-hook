import { useState } from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem';
import Loader from 'react-loader-spinner';
import Button from 'components/Button';
import Notification from '../Notification';
import Modal from 'components/Modal';
import styles from './ImageGallery.module.scss';

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
  };
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
          <Loader visible={isLoading} />
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

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  totalImages: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ImageGallery;
