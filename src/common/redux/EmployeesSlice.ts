import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchEmployees } from '../utils/gateway';

export interface EmployeesData {
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

interface EmloyeesState {
  employeesList: EmployeesData[];
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

const initialState: EmloyeesState = {
  employeesList: [],
  sorting: 'alphabet',
  loading: LoadingStatus.OK,
  errorMessage: null,
  position: 'all',
};

const employeesSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    setEmloyeesList: (state, action: PayloadAction<EmployeesData[]>) => {
      state.employeesList = action.payload;
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
      const employeeIndex = state.employeesList.findIndex(
        employee => employee.id === action.payload.id,
      );
      if (employeeIndex !== -1) {
        state.employeesList[employeeIndex] = {
          ...state.employeesList[employeeIndex],
          isFavorite: action.payload.isFavorite,
        };
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending, state => {
        state.loading = LoadingStatus.LOADING;
        state.errorMessage = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action: PayloadAction<EmployeesData[]>) => {
        state.loading = LoadingStatus.SUCCESS;
        state.employeesList = action.payload.map(employee => ({
          ...employee,
          isFavorite: employee.isFavorite ?? false,
        }));
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = LoadingStatus.FAILED;
        state.errorMessage = action.error.message || 'An error occurred while fetching workers';
      });
  },
});

export const { setEmloyeesList, setPosition, setSorting, setFavorite } = employeesSlice.actions;
export default employeesSlice.reducer;
