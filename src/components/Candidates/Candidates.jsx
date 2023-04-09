import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchUsers, increaseUsersLimit } from '../../store/userslice';

import mainStyles from '../../styles/styles.module.scss';
import styles from './Candidates.module.scss';
import Logo from '../../assets/photo-cover.svg';

import { Box, Typography, InputLabel, CircularProgress } from '@mui/material';

export const Candidates = () => {
  const { status, error, usersArray, usersLimit } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers(usersLimit));
  }, [usersLimit]);

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
                <InputLabel>{email}</InputLabel>

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
