import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchWorkers } from '../utils/gateway';

export interface WorkersData {
  id: string;
  name: string;
  phone: string;
  position: string;
  avatar?: string;
  email: string;
  birthDate: string;
  tag: string;
  isFavorite: boolean;
}

interface WorkersState {
  workersList: WorkersData[];
  sorting: 'alphabet' | 'birthday';
  loading: 'ok' | 'loading' | 'success' | 'failed';
  errorMessage: string | null;
  position: 'all' | 'designer' | 'analyst' | 'manager' | 'android' | 'iso' | 'favorite';
}

enum LoadingStatus {
  OK = 'ok',
  LOADING = 'loading',
  SUCCESS = 'success',
  FAILED = 'failed',
}

const initialState: WorkersState = {
  workersList: [],
  sorting: 'alphabet',
  loading: LoadingStatus.OK,
  errorMessage: null,
  position: 'all',
};

const workersSlice = createSlice({
  name: 'workers',
  initialState,
  reducers: {
    setWorkersList: (state, action: PayloadAction<WorkersData[]>) => {
      state.workersList = action.payload;
    },
    setSorting: (state, action: PayloadAction<'alphabet' | 'birthday'>) => {
      state.sorting = action.payload;
    },
    setPosition: (
      state,
      action: PayloadAction<
        'all' | 'designer' | 'analyst' | 'manager' | 'android' | 'iso' | 'favorite'
      >,
    ) => {
      state.position = action.payload;
    },
    setFavorite: (state, action: PayloadAction<{ id: string; isFavorite: boolean }>) => {
      const workerIndex = state.workersList.findIndex(worker => worker.id === action.payload.id);
      if (workerIndex !== -1) {
        state.workersList[workerIndex] = {
          ...state.workersList[workerIndex],
          isFavorite: action.payload.isFavorite,
        };
      }
      console.log('Обновленный работник:', state.workersList[workerIndex]);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchWorkers.pending, state => {
        state.loading = LoadingStatus.LOADING;
        state.errorMessage = null;
      })
      .addCase(fetchWorkers.fulfilled, (state, action: PayloadAction<WorkersData[]>) => {
        state.loading = LoadingStatus.SUCCESS;
        state.workersList = action.payload.map(worker => ({
          ...worker,
          isFavorite: worker.isFavorite ?? false,
        }));
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.loading = LoadingStatus.FAILED;
        state.errorMessage = action.error.message || 'An error occurred while fetching workers';
      });
  },
});

export const { setWorkersList, setPosition, setSorting, setFavorite } = workersSlice.actions;
export default workersSlice.reducer;
