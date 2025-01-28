import axios from 'axios';
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileStart,
  updateProfileSuccess,
  updateProfileFailure
} from '../slices/userSlice';

export const fetchUserProfile = () => async (dispatch, getState) => {
  try {
    dispatch(fetchProfileStart());
    const token = getState().auth.token;
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    dispatch(fetchProfileSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(fetchProfileFailure(error.response?.data?.message || 'Failed to fetch profile'));
    throw error;
  }
};

export const updateUserProfile = (profileData) => async (dispatch, getState) => {
  try {
    dispatch(updateProfileStart());
    const token = getState().auth.token;
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/user/profile`,
      profileData,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    dispatch(updateProfileSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(updateProfileFailure(error.response?.data?.message || 'Failed to update profile'));
    throw error;
  }
}; 