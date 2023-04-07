import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  usersArray: [],
  status: null,
  error: null,
  usersLimit: 6,
  fetchData: null,
  postData: {
    tokenData: null,
    userData: null
  },
  fetchPosition: null
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async function (limit = 6, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://frontend-test-assignment-api.abz.agency/api/v1/users?page=1&count=${limit}`
      );
      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchPosition = createAsyncThunk(
  'users/fetchPosition',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/positions'
      );
      if (!response.ok) throw new Error('Server error');
      const positions = await response.json();
      return positions;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postNewUser = createAsyncThunk(
  'users/postNewUser',
  async function (action, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        {
          method: 'POST',
          body: action.formData,
          headers: {
            Token: action.token
            //  get token with GET api/v1/token method
          }
        }
      );
      if (!response.ok) throw new Error('Server error');

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchToken = createAsyncThunk(
  'users/fetchToken',
  async function (formData, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/token'
      );
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      const token = data.token;
      // const action = { token, formData };

      dispatch(postNewUser({ token, formData }));

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
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
      state.usersLimit = state.usersLimit + 3;
    },
    resetUsersLimit: (state) => {
      state.usersLimit = 6;
    }
    // getUsers: (state, action) => {
    //   state.usersArray = action.payload;
    // },
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
      state.status = 'resolved';
      state.postData.tokenData = action.payload;
      state.error = null;
    },

    [postNewUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    [postNewUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.postData.userData = action.payload;
      state.error = null;
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
    [postNewUser.rejected]: (state, action) => functionRejected(state, action),
    [fetchPosition.rejected]: (state, action) => functionRejected(state, action)
  }
});

export const { increaseUsersLimit, resetUsersLimit } = userSlice.actions;

export default userSlice.reducer;

// export const { getUsers, removeUser, increaseUsersLimit } = newsSlice.actions;

// state.newsArray = state.removed.length
//   ? filteringUsersState(action.payload, state.removed)
//   : action.payload;

// getUsers: (state, action) => {
//   state.usersArray = action.payload;
// },

// export const fetchToken = createAsyncThunk(
//   'users/fetchToken',
//   async function (_, { rejectWithValue }) {
//     try {
//       const response = await fetch(
//         'https://frontend-test-assignment-api.abz.agency/api/v1/token'
//       );
//       if (!response.ok) throw new Error('Server error');
//       const data = await response.json();
//       return data;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );
