import { createSlice } from '@reduxjs/toolkit';

import { functionRejected } from '../features/helpers.js';

import { increment, initialState, usersStartingLimit } from './initial.js';
import { fetchPosition, fetchToken, fetchUsers, postNewUser } from './api.js';

export const userSlice = createSlice({
   name: 'users',
   initialState: initialState,

   reducers: {
      increaseUsersLimit: (state) => {
         state.usersLimit = state.usersLimit + increment;
      },
      resetUsersLimit: (state) => {
         state.usersLimit = usersStartingLimit;
      },
   },

   extraReducers: {
      [fetchUsers.pending]: (state) => {
         state.status = 'loading';
         state.error = null;
      },
      [fetchUsers.fulfilled]: (state, action) => {
         state.status = 'resolved';
         state.fetchData = action.payload;
         state.usersArray = action.payload.users;
         state.error = null;
      },

      [fetchToken.pending]: (state) => {
         state.status = 'loading';
         state.error = null;
      },
      [fetchToken.fulfilled]: (state, action) => {
         state.status = 'loading';
         state.postData.tokenData = action.payload;
         state.error = null;
      },

      [postNewUser.pending]: (state) => {
         state.status = 'loading';
         state.error = null;
      },
      [postNewUser.fulfilled]: (state, action) => {
         state.status = 'resolved';
         state.postData.responseData = action.payload;
         state.successSend = action.payload.success;
         state.error = null;
         state.usersLimit = 6;
      },

      [fetchPosition.pending]: (state) => {
         state.status = 'loading';
         state.error = null;
      },
      [fetchPosition.fulfilled]: (state, action) => {
         state.status = 'resolved';
         state.fetchPosition = action.payload;
         state.error = null;
      },

      [fetchUsers.rejected]: (state, action) => functionRejected(state, action),
      [fetchToken.rejected]: (state, action) => functionRejected(state, action),
      [postNewUser.rejected]: (state, action) =>
         functionRejected(state, action),
      [fetchPosition.rejected]: (state, action) =>
         functionRejected(state, action),
   },
});

export const { increaseUsersLimit, resetUsersLimit } = userSlice.actions;

export default userSlice.reducer;
