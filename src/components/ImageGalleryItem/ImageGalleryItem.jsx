import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ alt, src, srcModal, onOpenModal }) => {
  const handleOpenImg = () => {
    onOpenModal(srcModal, alt);
  };

  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        onClick={handleOpenImg}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  alt: PropTypes.string.isRequired,
  src: PropTypes.string,
  srcModal: PropTypes.string,
  onOpenModal: PropTypes.func,
};
export default ImageGalleryItem;
