import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Login User
export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/user/login', credentials);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Register User
export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const response = await api.post('/user/register', data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Logout User
export const logoutUser = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await api.post('/user/logout');
    return {};
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Load User - new thunk to fetch the user data from '/user'
export const loadUser = createAsyncThunk('auth/loadUser', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/user');
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// Get Profile - new thunk to fetch the profile data from '/user/profile'
export const updateProfile = createAsyncThunk('auth/updateProfile', async (data, { rejectWithValue }) => {
  try {
    const response = await api.put('/user/profile', data);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { 
    user: null, 
    isAuthenticated: false, 
    error: null, 
    profile: null // Add profile state
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      // Handle loadUser action
      .addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Handle getProfile action
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
