import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUsers, increaseUsersLimit } from '../store/userslice';

import mainStyles from '../Styles.module.scss';
import styles from './About.module.scss';

import Logo from './assets/photo-cover.svg';

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Typography, InputLabel } from '@mui/material';

// import Photo from './assets/photo-cover.svg';

export const About = () => {
  const { status, error, usersArray, usersLimit } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(usersLimit));
  }, [usersLimit]);

  // console.log(usersArray);

  const UserCardElement = () =>
    usersArray.length
      ? usersArray.map(({ id, name, phone, photo, position, email }) => (
          <div key={id} className={styles.card}>
            <div className={styles.card__image}>
              <img src={photo || Logo} alt={`candidate id ${id}`} />
            </div>
            <InputLabel className={styles.card__name}>{name}</InputLabel>
            <div className={styles.card__description}>
              <p className={styles.card__description__position}>{position} </p>
              <p
                className={`${styles.card__description__email}  ${mainStyles.tooltip}`}
              >
                {email}
                <span className={mainStyles.tooltiptext}>{email} </span>
              </p>
              <p className={styles.card__description__phone}>{phone}</p>
            </div>
          </div>
        ))
      : null;

  const LoadingElement = () => (
    <Box className={styles.loadingElement} sx={{ margin: '20px auto' }}>
      <CircularProgress />
    </Box>
  );

  const ErrorMessage = () => (
    <Typography variant='h4' component='p'>
      An error occured : {error}
    </Typography>
  );

  return (
    <section className={styles.container}>
      <h2>Working with GET request</h2>
      <div className={styles.cardSection}>
        <UserCardElement />
      </div>
      {status === 'loading' && <LoadingElement />}
      {error && <ErrorMessage />}
      <button
        className={`${styles.more} ${mainStyles.primary}`}
        onClick={() => dispatch(increaseUsersLimit())}
      >
        Show more
      </button>
    </section>
  );
};
