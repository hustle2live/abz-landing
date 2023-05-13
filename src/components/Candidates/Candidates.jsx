import * as React from 'react';
import { Box, CircularProgress, InputLabel, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { increaseUsersLimit } from '../../redux/userSlice';
import { fetchUsers } from '../../redux/apiRequests';
import global from '../../styles/global.module.scss';
import logo from '../../assets/photo-cover.svg';

import styles from './Candidates.module.scss';

export const Candidates = () => {
   const { status, error, usersArray, usersLimit, successSend } = useSelector(
      (state) => state,
   );

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchUsers(usersLimit));
   }, [dispatch, successSend, usersLimit]);

   const LoadingElement = () => (
      <Box className={styles.loadingElement} sx={{ margin: '20px auto' }}>
         <CircularProgress />
      </Box>
   );

   const ErrorMessage = (props) => (
      <Typography variant="h4" component="p">
         An error occured : {props.error}
      </Typography>
   );

   return (
      <section className={global.container}>
         <h2 className={styles.heading}>Working with GET request</h2>
         <div className={styles.candidates}>
            {usersArray && usersArray.length
               ? usersArray.map(
                  ({ id, name, phone, photo, position, email }) => (
                     <li key={id} className={styles.candidates__card}>
                        <div className={styles.candidates__photo}>
                           <img
                              src={photo || logo}
                              alt={'candidate'}
                           />
                        </div>
                        <InputLabel className={styles.candidates__name}>
                           {name}
                        </InputLabel>
                        <div className={styles.candidates__description}>
                           <p
                              className={
                                 styles.candidates__description_position
                              }
                           >
                              {position}
                           </p>
                           <p
                              className={`${styles.candidates__description_email}  ${global.tooltip}`}
                           >
                              <InputLabel>{email}</InputLabel>
                              <span className={global.tooltiptext}>
                                 {email}{' '}
                              </span>
                           </p>
                           <p
                              className={styles.candidates__description_phone}
                           >
                              {phone}
                           </p>
                        </div>
                     </li>
                  ),
               )
               : null}
         </div>
         {status === 'loading' && <LoadingElement />}
         {error && <ErrorMessage error={error} />}
         <button
            className={`${styles.more} ${global.primary}`}
            onClick={() => dispatch(increaseUsersLimit())}
         >
            Show more
         </button>
      </section>
   );
};
