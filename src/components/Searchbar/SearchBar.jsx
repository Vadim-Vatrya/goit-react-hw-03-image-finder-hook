import { toast } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';

import styles from './SearchBar.module.css';

const SearchBar = ({ onSubmitForm }) => {
  const [value, setValue] = useState('');

  const handleSearch = ({ target }) => {
    setValue(target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return toast.error('Please enter something to start your search!');
    }

    onSubmitForm(value);
    setValue(''); // если хотим очисть форму поиска после сабмита
  };

  return (
    <header className={styles.SearchBar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}></span>
        </button>

        <input
          className={styles.SearchFormInput}
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearch}
        />
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};

export default SearchBar;
