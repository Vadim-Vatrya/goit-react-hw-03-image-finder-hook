import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ title, type, onLoadMore, btnLoadDisabled }) => {
  const handleClick = () => {
    onLoadMore();
  };

  return (
    <button
      className={styles.Button}
      type={type}
      onClick={() => handleClick()}
      disabled={btnLoadDisabled}
    >
      {title}
    </button>
  );
};

Button.defaultProps = {
  title: 'button',
  type: 'button',
  onLoadMore: () => {},
};

Button.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  onLoadMore: PropTypes.func,
  btnLoadMoreDisabled: PropTypes.bool.isRequired,
};

export default Button;
