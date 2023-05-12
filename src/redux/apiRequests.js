import { createAsyncThunk } from '@reduxjs/toolkit';

import { usersStartingLimit } from './initialState.js';


const fetchPosition = async () => {
   const response = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/positions');
   if (!response.ok) throw new Error('Server error');
   const data = await response.json();
   return data;
};

const fetchToken = async () => {
   const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
   if (!response.ok) throw new Error("Can't get token. Error");
   const data = await response.json();
   return data;
};

const postUser = async (userData, token) => {
   const response = await fetch(
      'https://frontend-test-assignment-api.abz.agency/api/v1/users',
      {
         method: 'POST',
         body: userData,
         headers: {
            Token: token,
         },
      });
   if (!response.ok) throw new Error("User's registration Failed. Error");
   const data = await response.json();
   return data;
};

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

export const userRegister = createAsyncThunk(
   'users/userRegister',
   async function (formData, { rejectWithValue }) {
      try {
         const getNewTokenRequest = await fetchToken();
         const registerNewUserRequest = await postUser(
            formData,
            getNewTokenRequest.token,
         );
         return registerNewUserRequest;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
