import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  usersArray: [],
  status: null,
  error: null,
  usersLimit: 6,
  fetchData: null,
  postData: {
    token: null,
    userData: null
  }
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

export const fetchToken = createAsyncThunk(
  'users/fetchToken',
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/token'
      );
      if (!response.ok) throw new Error('Server error');
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postNewUser = createAsyncThunk(
  'users/postNewUser',
  async function (formData, { rejectWithValue }) {
    try {
      const response = await fetch(
        'https://frontend-test-assignment-api.abz.agency/api/v1/users',
        {
          method: 'POST',
          body: formData.userData,
          headers: {
            Token: formData.token
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
      state.postData.token = action.payload;
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

    [fetchUsers.rejected]: (state, action) => functionRejected(state, action),
    [fetchToken.rejected]: (state, action) => functionRejected(state, action),
    [postNewUser.rejected]: (state, action) => functionRejected(state, action)
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
