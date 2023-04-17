import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const usersStartingLimit = 6;
const increment = 3;

const initialState = {
   usersArray: [],
   status: null,
   error: null,
   usersLimit: usersStartingLimit,
   fetchData: null,
   postData: {
      tokenData: null,
      responseData: null,
   },
   fetchPosition: null,
   successSend: false,
};

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

const functionRejected = (state, action) => {
   state.status = 'rejected';
   state.error = action.payload;
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
