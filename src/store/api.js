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
         const response = await fetch(
            `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${limit}`,
         );
         if (!response.ok) throw new Error('Server error');
         const data = await response.json();
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const userRegister = createAsyncThunk(
   'users/userRegister',
   async function (formData, { rejectWithValue }) {
      try {
         const getTokenResponse = await fetch(
            'https://frontend-test-assignment-api.abz.agency/api/v1/token',
         );
         if (!getTokenResponse.ok) throw new Error('Can\'t get token. Error');
         const data = await getTokenResponse.json();

         const registerUserResponse = await fetch(
            'https://frontend-test-assignment-api.abz.agency/api/v1/users',
            {
               method: 'POST',
               body: formData,
               headers: {
                  Token: data.token,
               },
            },
         );
         if (!registerUserResponse.ok)
            throw new Error('User\'s registration Failed. Error');
         const postData = await registerUserResponse.json();
         return postData;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
