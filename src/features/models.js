import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { modelsLocalStorage } from '../storage/local';
import { newModelName } from '../utils/constants';
import { modelsValues } from '../utils/data';

const initialState = {
  models: [],
  modelSelected: {
    currency: 'USD',
  },
};

export const localDataModel = createAsyncThunk('/models', async () => {
  try {
    const m = modelsLocalStorage.getAll();
    if (m.length < 1) {
      const newModel = modelsValues.modelDefault;
      newModel.uuid = uuidv4();
      newModel.name = newModelName;
      modelsLocalStorage.create(newModel);
      return [newModel];
    }
    return m;
  } catch (error) {
    return [];
  }
});

export const modelsSlice = createSlice({
  name: 'models',
  initialState,
  reducers: {
    setDataModel: (state, action) => {
      state.models.push(action.payload);
    },
    changeSelectModel: (state, action) => {
      state.modelSelect = action.payload;
    },
    addNewModelItem: (state, action) => {
      state.models.push(action.payload);
    },
    updateModelItem: (state, action) => {
      state.models = state.models.map((item) => {
        let newItem = item;
        if (item.uuid === action.payload.uuid) {
          newItem = { ...item, ...action.payload };
        }
        return newItem;
      });
      state.modelSelect = { ...state.modelSelect, ...action.payload };
    },
    deleteModelItem: (state, action) => {
      state.models = state.models.filter((item) => item.uuid !== action.payload);
    },
    setModelSelected: (state, action) => {
      state.modelSelected = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(localDataModel.fulfilled, (state, action) => {
        state.models = action.payload;
      })
      .addCase(localDataModel.rejected, (state) => {
        state.models = [];
      });
  },
});
// Action creators are generated for each case reducer function
export const {
  setDataModel, addNewModelItem, updateModelItem, deleteModelItem, setModelSelected,
} = modelsSlice.actions;

export default modelsSlice.reducer;
