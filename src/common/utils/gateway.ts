import { createAsyncThunk } from '@reduxjs/toolkit';

const baseUrl = 'https://66a0f8b17053166bcabd894e.mockapi.io/api/workers';

export const fetchWorkers = createAsyncThunk('workers/fetchWorkers', async () => {
  try {
    const response = await fetch(baseUrl);
    if (response.ok) {
      return await response.json();
    } else {
      return Promise.reject('Failed to fetch workers');
    }
  } catch (error) {
    return Promise.reject(error.message || 'An error occurred while fetching workers');
  }
});
