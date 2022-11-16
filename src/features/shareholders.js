import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { shareholdersLocalStorage } from '../storage/local';

const initialState = {
  shareholdersList: [],
};

export const localDataShareholders = createAsyncThunk('/shareholders', async (uuid) => {
  try {
    const m = shareholdersLocalStorage.getAll(uuid);
    return m;
  } catch (error) {
    return [];
  }
});

export const shareholdersSlice = createSlice({
  name: 'shareholders',
  initialState,
  reducers: {
    setDataShareholders: (state, action) => {
      state.shareholdersList.push(action.payload);
    },
    updateDataShareholder: (state, action) => {
      const idx = state.shareholdersList
        .findIndex((e) => action.payload.uuid === e.uuid);
      state.shareholdersList[idx] = { ...action.payload };
    },
    deleteDataShareholder: (state, action) => {
      const idx = state.shareholdersList
        .findIndex((e) => action.payload === e.uuid);
      state.shareholdersList.splice(idx, 1);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(localDataShareholders.fulfilled, (state, action) => {
        state.shareholdersList = action.payload;
      })
      .addCase(localDataShareholders.rejected, (state) => {
        state.shareholdersList = [];
      });
  },
});
// Action creators are generated for each case reducer function
export const {
  setDataShareholders,
  updateDataShareholder,
  deleteDataShareholder,
} = shareholdersSlice.actions;

export default shareholdersSlice.reducer;
