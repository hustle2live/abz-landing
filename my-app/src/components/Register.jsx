import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import styles from './Register.module.scss';
import aboutStyles from './About.module.scss';
import mainStyles from '../Styles.module.scss';

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#7E7E7E'
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#D0CFCF'
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#D0CFCF'
    },
    '&:hover fieldset': {
      borderColor: '#D0CFCF'
    },
    '&.Mui-focused fieldset': {
      borderColor: '#D0CFCF'
    }
  }
});

export const Register = () => {
  return (
    <section className={aboutStyles.container}>
      <h3 className={styles.sectionTitle}>Working with POST request</h3>
      <div className={styles.registerSection}>
        <form action='#'>
          <fieldset className={styles.fieldSet}>
            <CssTextField
              className={styles.TextField}
              label='Your Name'
              variant='outlined'
            />
            <CssTextField
              className={styles.TextField}
              label='Email'
              variant='outlined'
            />
            <CssTextField
              className={`${styles.TextField} ${styles.phone}`}
              id='phone'
              label='Phone'
              variant='outlined'
            />
          </fieldset>

          <fieldset className={styles.fieldSet}>
            <p>Select your position</p>
            <input type='radio' name='position' value='frontend' />{' '}
            <span> frontend </span>
            <input
              className='mdc-text-field--outlined'
              type='radio'
              name='position'
              value='backend'
            />{' '}
            <span> backend </span>
            <input type='radio' name='position' value='designer' />{' '}
            <span> designer </span>
            <input type='radio' name='position' value='qa' /> <span> qa </span>
          </fieldset>

          <fieldset className={styles.fieldSet}>
            <input type='file' />
            <span> File </span>
          </fieldset>
        </form>
      </div>
      <button className={mainStyles.disabled}> Sing up</button>
    </section>
  );
};
