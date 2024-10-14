import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchEmployees = createAsyncThunk('employees/fetchEmpoloyees', async () => {
  try {
    const response = await fetch(baseUrl);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return Promise.reject('Failed to fetch employees');
    }
  } catch (error) {
    return Promise.reject(error.message || 'An error occurred while fetching employees');
  }
});
