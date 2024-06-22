import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch personal loan  data from the database
export const fetchUpdatedpaidautoloans = createAsyncThunk(
  "paidautoloan/fetchUpdatedpaidautoloans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8332/loanapp/fetchpaidAutoLoan");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch personal loan s");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingpaidautoloans: false,
  paidautoloans: [],
  isFetchingpaidautoloansFailed: null,
};

const paidautoloansSlice = createSlice({
  name: "paidautoloan",
  initialState,
  reducers: {
    fetchingpaidautoloans: (state) => {
      state.isFetchingpaidautoloans = true;
      state.paidautoloans = [];
      state.isFetchingpaidautoloansFailed = null;
    },
    fetchingpaidautoloansSuccessful: (state, action) => {
      state.isFetchingpaidautoloans = false;
      state.paidautoloans = action.payload;
      state.isFetchingpaidautoloansFailed = null;
    },
    fetchingpaidautoloansFailed: (state, action) => {
      state.isFetchingpaidautoloans = false;
      state.paidautoloans = [];
      state.isFetchingpaidautoloansFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedpaidautoloans.pending, (state) => {
        state.isFetchingpaidautoloans = true;
        state.isFetchingpaidautoloansFailed = null;
      })
      .addCase(fetchUpdatedpaidautoloans.fulfilled, (state, action) => {
        state.isFetchingpaidautoloans = false;
        state.paidautoloans = action.payload.data;
      })
      .addCase(fetchUpdatedpaidautoloans.rejected, (state, action) => {
        state.isFetchingpaidautoloans = false;
        state.isFetchingpaidautoloansFailed = action.payload;
      });
  },
});

export default paidautoloansSlice.reducer;
export const {
  fetchingpaidautoloans,
  fetchingpaidautoloansSuccessful,
  fetchingpaidautoloansFailed,
} = paidautoloansSlice.actions;
