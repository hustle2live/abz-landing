import { createSlice } from '@reduxjs/toolkit';

import { increment, initialState, usersStartingLimit } from './initial.js';
import { fetchUsers, userRegister } from './api.js';

const stateError = (state, action) => {
   state.status = 'rejected';
   state.error = action.payload || 'server error';
};

const stateLoading = (state) => {
   state.status = 'loading';
   state.error = null;
};

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
      [fetchUsers.fulfilled]: (state, action) => {
         state.fetchData = action.payload;
         state.usersArray = action.payload.users;
         state.status = 'resolved';
         state.error = null;
      },
      [userRegister.fulfilled]: (state, action) => {
         state.postData.responseData = action.payload;
         state.successSend = action.payload.success;
         state.usersLimit = usersStartingLimit;
         state.status = 'resolved';
         state.error = null;
      },

      [fetchUsers.pending]: (state) => stateLoading(state),
      [userRegister.pending]: (state) => stateLoading(state),

      [fetchUsers.rejected]: (state, action) => stateError(state, action),
      [userRegister.rejected]: (state, action) => stateError(state, action),
   },
});

export const { increaseUsersLimit, resetUsersLimit } = userSlice.actions;

export default userSlice.reducer;
