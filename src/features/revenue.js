import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { revenueLocalStorage } from '../storage/local';

const initialState = {
  data: [],
  result: {},
  selectItemUuid: '',
};

export const localDataR = createAsyncThunk('/revenue', async (uuid) => {
  try {
    const cls = revenueLocalStorage.getAll(uuid);
    return cls;
  } catch (error) {
    return [];
  }
});

export const revenueSlice = createSlice({
  name: 'revenue',
  initialState,
  reducers: {
    addNewRevenueItem: (state, action) => {
      state.data.push(action.payload);
    },
    updateRevenueItem: (state, action) => {
      state.data = state.data.map((item) => {
        let newItem = item;
        if (item.uuid === action.payload.uuid) {
          newItem = { ...item, ...action.payload.data };
        }
        return newItem;
      });
    },
    deleteRevenueItem: (state, action) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setselectItemUuid: (state, action) => {
      state.selectItemUuid = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(localDataR.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(localDataR.rejected, (state) => {
        state.data = [];
      });
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewRevenueItem,
  updateRevenueItem,
  deleteRevenueItem,
  setResult,
  setselectItemUuid,
} = revenueSlice.actions;

export default revenueSlice.reducer;
