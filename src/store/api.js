import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersStartingLimit } from './initial.js';

export const fetchPosition = createAsyncThunk(
   'users/fetchPosition',
   async function (_, { rejectWithValue }) {
      try {
         const response = await fetch(
            'https://frontend-test-assignment-api.abz.agency/api/v1/positions',
         );
         if (!response.ok) throw new Error('Server error');
         const positions = await response.json();
         return positions;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const fetchUsers = createAsyncThunk(
   'users/fetchUsers',
   async function (limit = usersStartingLimit, { rejectWithValue }) {
      try {
         return fetch(
            `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${limit}`,
         )
            .then((response) =>
               !response.ok ? rejectWithValue('Server error') : response.json(),
            )
            .then((data) => data);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

const fetchToken = () =>
   fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
      .then((response) => {
         if (!response.ok) throw new Error("Can't get token. Error");
         return response.json();
      })
      .then((data) => data);

const postUserRegister = (userData, token) =>
   fetch('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
      method: 'POST',
      body: userData,
      headers: {
         Token: token,
      },
   })
      .then((response) => {
         if (!response.ok) throw new Error("User's registration Failed. Error");
         return response.json();
      })
      .then((data) => data);

export const userRegister = createAsyncThunk(
   'users/userRegister',
   async function (formData, { rejectWithValue }) {
      try {
         const getTokenResponse = await fetchToken();
         const registerUserResponse = await postUserRegister(
            formData,
            getTokenResponse.token,
         );
         return registerUserResponse;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
