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

export const fetchToken = createAsyncThunk(
   'users/fetchToken',
   async function (formData, { rejectWithValue, dispatch }) {
      try {
         fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token')
            .then(function (response) {
               if (!response.ok) throw new Error('Server error');

               return response.json();
            })
            .then(function (data) {
               const token = data.token;
               const action = { token, formData };
               dispatch(postNewUser(action));
               return data;
            })
            .catch(function (error) {
               return rejectWithValue(error.message);
            });
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

export const postNewUser = createAsyncThunk(
   'users/postNewUser',
   async function (action, { rejectWithValue, dispatch }) {
      try {
         const userResponse = await fetch(
            'https://frontend-test-assignment-api.abz.agency/api/v1/users',
            {
               method: 'POST',
               body: action.formData,
               headers: {
                  Token: action.token,
               },
            },
         );
         if (!userResponse.ok) throw new Error('Server error');
         const data = await userResponse.json();

         dispatch(fetchUsers());

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
