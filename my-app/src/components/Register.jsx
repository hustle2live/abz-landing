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

import OutlinedInput from '@mui/material/OutlinedInput';

import { fetchToken } from '../store/userslice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';

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
      // border: '2px solid #CB3D40'
    }
  }
});

const CssCustomInputLabel = styled(InputLabel)({
  '&.MuiInputLabel-root': {
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
    maxHeight: '54px',
    minWidth: '83px'
  },
  '&.Mui-error': {
    border: '2px solid #CB3D40'
  }
});

const CssCustomOutlinedInput = styled(OutlinedInput)({
  '&.MuiOutlinedInput-root': {
    border: '1px solid #d0cfcf',
    borderRadius: '0 4px 4px 0',
    color: '#7E7E7E',
    zIndex: '-1'
  },
  '&.Mui-error': {
    border: '2px solid #CB3D40',
    color: '#7E7E7E'
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

export const Register = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState(null);
  const [position, setPosition] = useState(1);

  const clearForm = () => {
    setName('');
    setEmail('');
    setPhone('');
    setPhoto(null);
    setPosition(1);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('position_id', position);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', photo);
    console.group({
      position_id: position,
      name: name,
      email: email,
      phone: phone,
      photo: photo
    });
    dispatch(fetchToken(formData));
    return clearForm;
  };

  const validateName = (e) => {
    e.preventDefault();
    const re = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;
    if (e.target.value === '' || re.test(e.target.value))
      return setName(e.target.value);
  };

  const validateEmail = (e) => {
    e.preventDefault();
    const re = /^[a-z 0-9 .@-_]+$/i;
    if (e.target.value === '' || re.test(e.target.value))
      return setEmail(e.target.value);
  };

  const validatePhone = (e) => {
    e.preventDefault();
    const re = /^[\+\d]*$/;
    if (e.target.value === '' || re.test(e.target.value))
      return setPhone(e.target.value);
  };

  const handlePosition = (e) => {
    e.preventDefault();
    return setPosition(e.target.value);
  };

  const handlePhoto = (e) => {
    e.preventDefault();
    if (e.target.files[0]) return setPhoto(e.target.files[0]);
    return setPhoto(null);
  };

  return (
    <section
      className={`${aboutStyles.container} ${styles.registerMainContainer}`}
    >
      <h3 className={styles.sectionTitle}>Working with POST request</h3>
      <div className={styles.registerSection}>
        <form
          method='post'
          encType='multipart/form-data'
          onSubmit={handleFormSubmit}
        >
          <div className={styles.textFieldsGroup}>
            <CssTextField
              className={styles.textField}
              label='Your Name'
              variant='outlined'
              value={name}
              onChange={(e) => validateName(e)}
              required
              inputProps={{
                minLength: 2,
                maxLength: 60
              }}
              error={name.length < 2 || name.length > 60}
              helperText={name === '' ? 'Empty field!' : ' '}
            />
            <CssTextField
              className={styles.textField}
              label='Email'
              variant='outlined'
              value={email}
              onChange={(e) => validateEmail(e)}
              required
              error={!(email.includes('@') && email.includes('.'))}
              helperText={email === '' ? 'Empty field!' : ' '}
            />
            <CssTextField
              className={`${styles.textField} ${styles.phone}`}
              id='phone'
              label='Phone'
              variant='outlined'
              value={phone}
              onChange={(e) => validatePhone(e)}
              required
              error={!phone.includes('+380')}
            />
          </div>
          <div className={styles.radioGroup}>
            <FormControl>
              <FormLabel focused={false} className={styles.radioGroupTitle}>
                Select your position
              </FormLabel>
              <RadioGroup
                defaultValue={position}
                name='radio-buttons-group'
                color='#000'
                value={position}
                onChange={handlePosition}
                required
              >
                <FormControlLabel
                  value={1}
                  control={<CssRadioButton />}
                  label='Frontend developer'
                  className={styles.radioGroupElement}
                />
                <FormControlLabel
                  value={2}
                  control={<CssRadioButton />}
                  label='Backend Developer'
                  className={styles.radioGroupElement}
                />
                <FormControlLabel
                  value={3}
                  control={<CssRadioButton />}
                  label='Designer'
                  className={styles.radioGroupElement}
                />
                <FormControlLabel
                  value={4}
                  control={<CssRadioButton />}
                  label='QA'
                  className={styles.radioGroupElement}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={styles.inputFileEmement}>
            <CssCustomInputLabel error={!photo === null}>
              Upload
              <input
                className={styles.uploadButton}
                accept='image/jpg, image/jpeg'
                type='file'
                name='image_upload'
                onChange={(e) => handlePhoto(e)}
                required
              />
            </CssCustomInputLabel>
            <CssCustomOutlinedInput
              className={styles.fileInput}
              value={
                photo
                  ? [...photo.name]
                      .slice(0, 24)
                      .slice(0, -4)
                      .concat('... ' + [...photo.name].slice(-4).join(''))
                      .join('')
                  : 'Upload your photo'
              }
              error={!photo === null}
            />
          </div>
          <input
            type='submit'
            className={mainStyles.disabled}
            value={'Sign up'}
          />
        </form>
      </div>
    </section>
  );
};
