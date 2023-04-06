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
    border: '1px solid rgba(0, 0, 0, 0.87)',
    borderRadius: '4px 0 0 4px',
    boxSizing: 'border-box',
    maxHeight: '54px'
  },
  '&.MuiButtonBase-root button': {
    boxSizing: 'border-box',
    maxHeight: '54px'
  }
});

const CssRadioButton = styled(Radio)({
  '&.MuiRadio-root': {
    color: '#D0CFCF',
    height: '34px'
  },
  '&.Mui-checked': {
    color: '#00BDD3'
  }
});

const RadioButtonsGroup = () => (
  <FormControl className={styles.radioGroup}>
    <FormLabel
      id='demo-radio-buttons-group-label'
      className={styles.radioGroupTitle}
    >
      Select your position
    </FormLabel>
    <RadioGroup defaultValue='backend' name='radio-buttons-group' color='#000'>
      <FormControlLabel
        value='frontend'
        control={<CssRadioButton />}
        label='Frontend developer'
        className={styles.radioGroupElement}
      />
      <FormControlLabel
        value='backend'
        control={<CssRadioButton />}
        label='Backend Developer'
        className={styles.radioGroupElement}
      />
      <FormControlLabel
        value='designer'
        control={<CssRadioButton />}
        label='Designer'
        className={styles.radioGroupElement}
      />
      <FormControlLabel
        value='qa'
        control={<CssRadioButton />}
        label='QA'
        className={styles.radioGroupElement}
      />
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

const formDataHandler = (e) => {
  e.preventDefault();
  return false;
};

export const Register = () => {
  return (
    <section
      className={`${aboutStyles.container} ${styles.registerMainContainer}`}
    >
      <h3 className={styles.sectionTitle}>Working with POST request</h3>
      <div className={styles.registerSection}>
        <form action='/' method='post' enctype='multipart/form-data'>
          <TextFieldsGroup />
          <RadioButtonsGroup />
          <UploadInputField />
        </form>
      </div>
      <button
        className={mainStyles.disabled}
        onClick={(e) => formDataHandler(e)}
      >
        {' '}
        Sing up
      </button>
    </section>
  );
};
