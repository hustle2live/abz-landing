import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import {
   FormControl,
   FormControlLabel,
   FormLabel,
   RadioGroup,
} from '@mui/material';

import { userRegister } from '../../redux/apiRequests';

import {
   CssCustomInputLabel,
   CssCustomOutlinedInput,
   CssRadioButton,
   CssTextField,
} from '../../styles/styledComponentsMUI';

import {
   cutElementsName,
   regExpEmail,
   regExpPhone,
} from '../../features/helpers.js';

import global from '../../styles/global.module.scss';

import styles from './Register.module.scss';

export const Register = () => {
   const dispatch = useDispatch();

   const {
      register,
      formState: { errors, isValid },
      handleSubmit,
      getValues,
   } = useForm({
      mode: 'onTouched',
   });

   const userFiles = getValues('userFile');
   const userFilesDidUpload = () => userFiles && !!userFiles.length;

   const onSubmit = (data) => {
      const formData = new FormData();
      formData.append('position_id', data.userPosition);
      formData.append('name', data.userName);
      formData.append('email', data.userEmail);
      formData.append('phone', data.userPhone);
      formData.append('photo', data.userFile[0]);
      dispatch(userRegister(formData));
   };

   return (
      <section className={global.container}>
         <h3 className={styles.sectionTitle}>Working with POST request</h3>
         <div className={styles.registerSection}>
            <form
               method="post"
               encType="multipart/form-data"
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className={styles.textFieldsGroup}>
                  <CssTextField
                     className={styles.textField}
                     variant="outlined"
                     label="Your name"
                     {...register('userName', {
                        required: 'Empty field!',
                        minLength: {
                           value: 2,
                           message: 'Min length is 2 ',
                        },
                        maxLength: {
                           value: 60,
                           message: 'Max length is 60 ',
                        },
                     })}
                     helperText={
                        (errors.userName && errors.userName.message) || ' '
                     }
                     error={!!errors.userName}
                     required
                  />
                  <CssTextField
                     className={styles.textField}
                     variant="outlined"
                     label="Email"
                     {...register('userEmail', {
                        required: 'Empty field!',
                        pattern: {
                           value: regExpEmail,
                           message: 'Not correct email format',
                        },
                     })}
                     helperText={
                        (errors.userEmail && errors.userEmail.message) || ' '
                     }
                     error={!!errors.userEmail}
                     required
                  />
                  <CssTextField
                     className={`${styles.textField} ${styles.phone}`}
                     label="Phone"
                     variant="outlined"
                     {...register('userPhone', {
                        required: '+38 (XXX) XXX-XX-XX',
                        pattern: {
                           value: regExpPhone,
                           message: '+38 (XXX) XXX-XX-XX',
                        },
                        minLength: {
                           value: 13,
                           message: '+38 (XXX) XXX-XX-XX',
                        },
                        maxLength: {
                           value: 13,
                           message: 'Max length is 13',
                        },
                     })}
                     helperText={
                        (errors.userPhone && errors.userPhone.message) || ' '
                     }
                     error={!!errors.userPhone}
                     required
                  />
               </div>
               <div className={styles.radioGroup}>
                  <FormControl>
                     <FormLabel
                        focused={false}
                        className={styles.radioGroupTitle}
                     >
                        Select your position
                     </FormLabel>
                     <RadioGroup defaultValue={3} name="radio-buttons-group">
                        <FormControlLabel
                           {...register('userPosition')}
                           value={1}
                           control={<CssRadioButton />}
                           label="Frontend developer"
                           className={styles.radioGroupElement}
                        />
                        <FormControlLabel
                           {...register('userPosition')}
                           value={2}
                           control={<CssRadioButton />}
                           label="Backend Developer"
                           className={styles.radioGroupElement}
                        />
                        <FormControlLabel
                           {...register('userPosition')}
                           value={3}
                           control={<CssRadioButton />}
                           label="Designer"
                           className={styles.radioGroupElement}
                        />
                        <FormControlLabel
                           {...register('userPosition', {
                              required: true,
                           })}
                           value={4}
                           control={<CssRadioButton />}
                           label="QA"
                           className={styles.radioGroupElement}
                        />
                     </RadioGroup>
                  </FormControl>
               </div>
               <div className={styles.inputFileEmement}>
                  <CssCustomInputLabel error={!!errors.userFile}>
                     Upload
                     <input
                        className={styles.uploadButton}
                        accept="image/jpg, image/jpeg"
                        type="file"
                        {...register('userFile', {
                           required: true,
                        })}
                        required
                     />
                  </CssCustomInputLabel>
                  <CssCustomOutlinedInput
                     className={styles.fileInput}
                     error={!!errors.userFile}
                     value={
                        userFilesDidUpload()
                           ? cutElementsName(userFiles[0])
                           : 'Upload your photo'
                     }
                  />
               </div>
               <input
                  type="submit"
                  className={global.primary}
                  value={'Sign up'}
                  disabled={!isValid}
               />
            </form>
         </div>
      </section>
   );
};
