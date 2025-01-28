import axios from 'axios';
import { loginStart, loginSuccess, loginFailure, logout } from '../slices/authSlice';
import { clearProfile } from '../slices/userSlice';

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials);
    dispatch(loginSuccess(response.data.token));
    return response.data;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    throw error;
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    dispatch(loginStart());
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, userData);
    dispatch(loginSuccess(response.data.token));
    return response.data;
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || 'Signup failed'));
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
  dispatch(clearProfile());
}; 