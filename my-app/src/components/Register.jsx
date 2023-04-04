import * as React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

import styles from './Register.module.scss';
import aboutStyles from './About.module.scss';
import mainStyles from '../Styles.module.scss';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';

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

const CssIconButton = styled(IconButton)({
  '&.MuiButtonBase-root': {
    fontFamily: "'Nunito', sans-serif",
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.87)',
    lineHeight: '26px',
    padding: '14px 15px',
    border: '2px solid rgba(0, 0, 0, 0.87)',
    borderRadius: '4px 0 0 4px'
  }
});

const RadioButtonsGroup = () => (
  <FormControl className={styles.radioGroup}>
    <FormLabel id='demo-radio-buttons-group-label'>
      Select your position
    </FormLabel>
    <RadioGroup
      aria-labelledby='demo-radio-buttons-group-label'
      defaultValue='female'
      name='radio-buttons-group'
    >
      <FormControlLabel
        value='frontend'
        control={<Radio />}
        label='Frontend developer'
      />
      <FormControlLabel
        value='backend'
        control={<Radio />}
        label='Backend Developer'
      />
      <FormControlLabel value='designer' control={<Radio />} label='Designer' />
      <FormControlLabel value='qa' control={<Radio />} label='QA' />
    </RadioGroup>
  </FormControl>
);

const TextFieldsGroup = () => (
  <div className={styles.fieldsGroup}>
    <CssTextField
      className={styles.textField}
      label='Your Name'
      variant='outlined'
    />
    <CssTextField
      className={styles.textField}
      label='Email'
      variant='outlined'
    />
    <CssTextField
      className={`${styles.textField} ${styles.phone}`}
      id='phone'
      label='Phone'
      variant='outlined'
    />
  </div>
);

const UploadInputField = () => (
  <div className={styles.inputFileEmement}>
    <CssIconButton component='label'>
      Upload
      <input hidden accept='image/*' multiple type='file' />
    </CssIconButton>
    <OutlinedInput
      className={styles.fileInput}
      disabled
      value='Upload your photo'
    />
  </div>
);

export const Register = () => {
  return (
    <section className={`${aboutStyles.container} ${styles.sectionAbout}`}>
      <h3 className={styles.sectionTitle}>Working with POST request</h3>
      <div className={styles.registerSection}>
        <form>
          <TextFieldsGroup />
          <RadioButtonsGroup />
          <UploadInputField />
        </form>
      </div>
      <button className={mainStyles.disabled}> Sing up</button>
    </section>
  );
};
