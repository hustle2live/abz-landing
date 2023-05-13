import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
   FormControl,
   FormControlLabel,
   FormLabel,
   RadioGroup,
} from '@mui/material';

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

import { userRegister } from '../../redux/apiRequests';
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
         <h3 className={styles.heading}>Working with POST request</h3>
         <form
            className={styles.formSubmit}
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
         >
            <div className={styles.textFieldsGroup}>
               <CssTextField
                  className={styles.textFieldsGroup__cssTextField}
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
                  className={styles.textFieldsGroup__cssTextField}
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
                  className={styles.textFieldsGroup__cssTextField}
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
                     (errors.userPhone && errors.userPhone.message) ||
                     '+38 (XXX) XXX-XX-XX'
                  }
                  error={!!errors.userPhone}
                  required
               />
            </div>
            <div className={styles.radioGroup}>
               <FormControl>
                  <FormLabel
                     focused={false}
                     className={styles.radioGroup__title}
                  >
                     Select your position
                  </FormLabel>
                  <RadioGroup defaultValue={3} name="radio-buttons-group">
                     <FormControlLabel
                        className={styles.radioGroup__element}
                        {...register('userPosition')}
                        value={1}
                        control={<CssRadioButton />}
                        label="Frontend developer"
                     />
                     <FormControlLabel
                        className={styles.radioGroup__element}
                        {...register('userPosition')}
                        value={2}
                        control={<CssRadioButton />}
                        label="Backend Developer"
                     />
                     <FormControlLabel
                        className={styles.radioGroup__element}
                        {...register('userPosition')}
                        value={3}
                        control={<CssRadioButton />}
                        label="Designer"
                     />
                     <FormControlLabel
                        className={styles.radioGroup__element}
                        {...register('userPosition', {
                           required: true,
                        })}
                        value={4}
                        control={<CssRadioButton />}
                        label="QA"
                     />
                  </RadioGroup>
               </FormControl>
            </div>
            <div className={styles.fileUpload}>
               <CssCustomInputLabel
                  className={styles.fileUpload__fileInput} // not use
                  error={!!errors.userFile}
               >Upload
                  <input
                     className={styles.fileUpload__fileInput_hidden}
                     accept="image/jpg, image/jpeg"
                     type="file"
                     {...register('userFile', {
                        required: true,
                     })}
                     required
                  />
               </CssCustomInputLabel>
               <CssCustomOutlinedInput
                  className={styles.fileUpload__description}
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
      </section>
   );
};
