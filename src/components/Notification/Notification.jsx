import PropTypes from 'prop-types';
import { createUseStyles } from 'react-jss';

const useStyles = createUseStyles({
  title: {
    marginTop: 20,
    fontSize: 30,
    color: 'red',
    textAlign: 'center',
  },
});

const Notification = ({ message }) => {
  const classes = useStyles();
  return <p className={classes.title}>{message}</p>;
};

Notification.defaultProps = {
  message: '',
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
