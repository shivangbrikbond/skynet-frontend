import { createSlice, createAsyncThunk, rejectWithValue } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  message: '',
  isLoggedIn: true
};

const baseUrl = process.env.REACT_APP_API_URL

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    const { confirmpassword, ...dataToSend } = userData;

    try {
      if (userData.password !== userData.confirmpassword) {
        console.log("->", userData)
        return rejectWithValue({ message: 'Password do not match' });
      }
      const response = await axios.post(`${baseUrl}/register`, dataToSend);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const CheckUser = createAsyncThunk(
  'auth/CheckUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = axios.get(`${baseUrl}/healthCheck`, {
        headers: {
          'authorization': 'Bearer ' + localStorage.getItem('skyn_token'),
          'Content-Type': 'application/json'
        }
      })
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      // Make the API request with credentials
      const response = await axios.post(
        `${baseUrl}/login`,
        userData,
        { withCredentials: true } // Ensure cookies are included with the request
      );

      // Return the response data on success
      console.log(response.data)
      return response.data;
    } catch (error) {
      // Handle error and provide detailed information if available
      const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
      return rejectWithValue(errorMessage);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('skyn_userId');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
        state.error = null;
        state.message = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload.message || 'Registration failed';
        console.log(state.message)
        console.log(state.error)
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.loginUser;
        localStorage.setItem('skyn_token', action.payload.token)
        localStorage.setItem('skyn_userId', action.payload.loginUser["userId"])
        localStorage.setItem('skyn_email', action.payload.loginUser["email"])
        localStorage.setItem('profile_pic', action.payload.loginUser["profilePic"])
        console.log(action.payload.loginUser["email"])
        state.error = null;
        state.message = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
        state.message = action.payload.message || 'Login failed';
      })


      .addCase(CheckUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = '';
      })
      .addCase(CheckUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.isLoggedIn = true;

      })
      .addCase(CheckUser.rejected, (state, action) => {
        state.status = 'failed';
        state.isLoggedIn = false;
      })
  }
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;