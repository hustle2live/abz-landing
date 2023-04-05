import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  usersArray: [],
  status: null,
  error: null,
  usersLimit: 6
};

export const fetchUsers = createAsyncThunk(
  'news/fetchNews',
  async function (limit = 6, { rejectWithValue }) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}`
      );
      if (!response.ok) throw new Error('Server error');
      console.log(response);

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const filteringUsersState = () => {};

export const userSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    getUsers: (state, action) => {
      state.usersArray = action.payload;
    },
    increaseUsersLimit: (state) => {
      state.usersLimit = state.usersLimit + 3;
    },
    resetUsersLimit: (state) => {
      state.usersLimit = 6;
    }
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.newsArray = state.removed.length
        ? filteringUsersState(action.payload, state.removed)
        : action.payload;
    },

    [fetchUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    }
  }
});

export const { getUsers, increaseUsersLimit, resetUsersLimit } =
  userSlice.actions;

export default userSlice.reducer;

// export const { getUsers, removeUser, increaseUsersLimit } = newsSlice.actions;
