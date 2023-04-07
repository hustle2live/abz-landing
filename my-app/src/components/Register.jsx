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

import { fetchToken, postNewUser, fetchPosition } from '../store/userslice';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

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

export const Register = () => {
  const store = useSelector((state) => state);
  const dispatch = useDispatch();
  // console.log(store);
  // ----------------------------------------------
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('');
  const [position, setPosition] = useState('');

  function clearForm() {
    setName('');
    setEmail('');
    setPhone('');
    setPhoto('');
    setPosition('');
  }

  const newUser = {
    position_id: position,
    name: name,
    email: email,
    phone: phone,
    photo: photo
  };

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('position_id', position);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('photo', photo);

    console.log(newUser);

    // dispatch(fetchToken(formData));

    return clearForm();
  }

  function validateName(e) {
    const re = /^[a-z а-яёЁЇїІіЄєҐґ ,.'-]+$/i;
    if (e.target.value === '' || re.test(e.target.value))
      return setName(e.target.value);
  }

  function validateEmail(e) {
    const re = /^[a-z 0-9 .@-_]+$/i;
    if (e.target.value === '' || re.test(e.target.value))
      return setEmail(e.target.value);
  }

  function validatePhone(e) {
    const re = /^[\+\d]*$/;
    if (e.target.value === '' || re.test(e.target.value))
      return setPhone(e.target.value);
  }

  function handlePosition(e) {
    return setPosition(e.target.value);
  }

  function handlePhoto(e) {
    if (e.target.files[0]) return setPhoto(e.target.files[0]);
    return setPhoto('');
  }

  return (
    <section
      className={`${aboutStyles.container} ${styles.registerMainContainer}`}
    >
      <h3 className={styles.sectionTitle}>Working with POST request</h3>
      <div className={styles.registerSection}>
        <form method='post' enctype='multipart/form-data'>
          <div className={styles.textFieldsGroup}>
            <CssTextField
              className={styles.textField}
              label='Your Name'
              variant='outlined'
              value={name}
              onChange={(e) => validateName(e)}
            />
            <CssTextField
              className={styles.textField}
              label='Email'
              variant='outlined'
              value={email}
              onChange={(e) => validateEmail(e)}
            />
            <CssTextField
              className={`${styles.textField} ${styles.phone}`}
              id='phone'
              label='Phone'
              variant='outlined'
              value={phone}
              onChange={(e) => validatePhone(e)}
            />
          </div>
          <div className={styles.radioGroup}>
            <FormControl>
              <FormLabel
                id='demo-radio-buttons-group-label'
                className={styles.radioGroupTitle}
              >
                Select your position
              </FormLabel>
              <RadioGroup
                defaultValue={3}
                name='radio-buttons-group'
                color='#000'
                value={position}
                onChange={handlePosition}
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
            <CssIconButton component='label'>
              Upload
              <input
                hidden
                accept='image/jpg, image/jpeg'
                type='file'
                name='image_upload'
                onChange={(e) => handlePhoto(e)}
              />
            </CssIconButton>
            <OutlinedInput
              className={styles.fileInput}
              disabled
              value={
                photo
                  ? [...photo.name]
                      .slice(0, 24)
                      .slice(0, -4)
                      .concat('... ' + [...photo.name].slice(-4).join(''))
                      .join('')
                  : 'Upload your photo'
              }
            />
          </div>
        </form>
      </div>
      <button className={mainStyles.disabled} onClick={(e) => handleSubmit(e)}>
        Sing up
      </button>
    </section>
  );
};

// const InputOutlined = (props) => {
//   const fileName = props.file ? props.file.name : 'chose Fiole sad sd';
//   return (
//     <OutlinedInput className={styles.fileInput} disabled value={fileName} />
//   );
// };

// const [value, setValue] = React.useState('female');

// const handleChange = (event) => {
//   setValue(event.target.value);
// };

//------------------------------------------

// const RadioButtonsGroup = () => (
//   <FormControl className={styles.radioGroup}>
//     <FormLabel
//       id='demo-radio-buttons-group-label'
//       className={styles.radioGroupTitle}
//     >
//       Select your position
//     </FormLabel>
//     <RadioGroup
//       defaultValue='backend'
//       name='radio-buttons-group'
//       color='#000'
//       value={position}
//       onChange={(e) => handlePosition(e)}
//     >
//       <FormControlLabel
//         value={1}
//         control={<CssRadioButton />}
//         label='Frontend developer'
//         className={styles.radioGroupElement}
//       />
//       <FormControlLabel
//         value={2}
//         control={<CssRadioButton />}
//         label='Backend Developer'
//         className={styles.radioGroupElement}
//       />
//       <FormControlLabel
//         value={3}
//         control={<CssRadioButton />}
//         label='Designer'
//         className={styles.radioGroupElement}
//       />
//       <FormControlLabel
//         value={4}
//         control={<CssRadioButton />}
//         label='QA'
//         className={styles.radioGroupElement}
//       />
//     </RadioGroup>
//   </FormControl>
// );

// const TextFieldsGroup = () => (
//   <div className={styles.textFieldsGroup}>
//     <CssTextField
//       className={styles.textField}
//       label='Your Name'
//       variant='outlined'
//       value={name}
//       onChange={(e) => validateName(e)}
//     />
//     <CssTextField
//       className={styles.textField}
//       label='Email'
//       variant='outlined'
//       value={email}
//       onChange={(e) => validateEmail(e)}
//     />
//     <CssTextField
//       className={`${styles.textField} ${styles.phone}`}
//       id='phone'
//       label='Phone'
//       variant='outlined'
//       value={phone}
//       onChange={(e) => validatePhone(e)}
//     />
//   </div>
// );

// const UploadInputField = () => (
//   <div className={styles.inputFileEmement}>
//     <CssIconButton component='label'>
//       Upload
//       <input
//         hidden
//         accept='image/jpg, image/jpeg'
//         type='file'
//         onChange={(e) => handlePhoto(e)}
//       />
//     </CssIconButton>
//     <OutlinedInput
//       className={styles.fileInput}
//       disabled
//       value='Upload your photo'
//     />
//   </div>
// );

// const formDataHandler = (e) => {
//   e.preventDefault();
//   dispatch(fetchToken());
//   return false;
// };
