import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { captableLocalStorage } from '../storage/local';
import { capTableCalcs } from '../utils/calcs';
import { itemCaptableFounding } from '../utils/constants';

const initialState = {
  data: [],
  capitalization: {
    table: [],
    totals: {},
  },
  shareholders: {},
  terms: {
    table: [],
  },
  investorReturn: {
    table: [],
    values: {},
  },
  selectItemUuid: '',
};

export const localDataCT = createAsyncThunk('/captable', async (uuid) => {
  try {
    let cls = captableLocalStorage.getAll(uuid);
    if (cls.length < 1) {
      cls = [];
      const f = capTableCalcs.getNewItem(uuid, itemCaptableFounding);
      cls.push(f);
      captableLocalStorage.create(uuid, f);
    }
    return cls;
  } catch (error) {
    return [];
  }
});

export const captableSlice = createSlice({
  name: 'captable',
  initialState,
  reducers: {
    addNewCaptableItem: (state, action) => {
      state.data.push(action.payload);
    },
    updateCaptableItem: (state, action) => {
      state.data = state.data.map((item) => {
        let newItem = item;
        if (item.uuid === action.payload.uuid) {
          newItem = { ...item, ...action.payload.data };
        }
        return newItem;
      });
    },
    deleteCaptableItem: (state, action) => {
      state.data = state.data.filter((item) => item.uuid !== action.payload);
    },
    setShareHolder: (state, action) => {
      state.shareholders = action.payload;
    },
    setCapitalization: (state, action) => {
      state.capitalization = action.payload;
    },
    setTerms: (state, action) => {
      state.terms = action.payload;
    },
    setInvestorReturn: (state, action) => {
      state.investorReturn = action.payload;
    },
    setselectItemUuid: (state, action) => {
      state.selectItemUuid = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(localDataCT.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(localDataCT.rejected, (state) => {
        state.data = [];
      });
  },
});
// Action creators are generated for each case reducer function
export const {
  addNewCaptableItem,
  updateCaptableItem,
  deleteCaptableItem,
  setShareHolder,
  setCapitalization,
  setTerms,
  setInvestorReturn,
  setselectItemUuid,
} = captableSlice.actions;

export default captableSlice.reducer;
