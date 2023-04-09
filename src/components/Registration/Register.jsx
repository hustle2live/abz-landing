import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchToken } from '../../store/userslice';

import styles from './Register.module.scss';
import global from '../../styles/global.module.scss';

import {
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';

import {
  CssTextField,
  CssRadioButton,
  CssCustomInputLabel,
  CssCustomOutlinedInput
} from '../../styles/styledComponentsMUI';

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
    <section className={global.container}>
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
          <input type='submit' className={global.disabled} value={'Sign up'} />
        </form>
      </div>
    </section>
  );
};
