import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ alt, srcModal, onCloseModal }) => {
  useEffect(() => {
    // console.log('Modal componentDidMount');
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      // console.log('Modal componentWillUnmount');
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };

  const closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={styles.Overlay} onClick={closeByBackdrop}>
      <div className={styles.Modal}>
        <img src={srcModal} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
};

Modal.defaultProps = {
  onCloseModal: () => {},
};
Modal.propTypes = {
  alt: PropTypes.string.isRequired,
  srcModal: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
