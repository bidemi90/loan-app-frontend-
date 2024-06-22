import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch personal loan  data from the database
export const fetchUpdatedpaidpersonalloans = createAsyncThunk(
  "paidpersonalloan/fetchUpdatedpaidpersonalloans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8332/loanapp/fetchpaidpersonalloan");
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
  isFetchingpaidpersonalloans: false,
  paidpersonalloans: [],
  isFetchingpaidpersonalloansFailed: null,
};

const paidpersonalloansSlice = createSlice({
  name: "paidpersonalloan",
  initialState,
  reducers: {
    fetchingpaidpersonalloans: (state) => {
      state.isFetchingpaidpersonalloans = true;
      state.paidpersonalloans = [];
      state.isFetchingpaidpersonalloansFailed = null;
    },
    fetchingpaidpersonalloansSuccessful: (state, action) => {
      state.isFetchingpaidpersonalloans = false;
      state.paidpersonalloans = action.payload;
      state.isFetchingpaidpersonalloansFailed = null;
    },
    fetchingpaidpersonalloansFailed: (state, action) => {
      state.isFetchingpaidpersonalloans = false;
      state.paidpersonalloans = [];
      state.isFetchingpaidpersonalloansFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedpaidpersonalloans.pending, (state) => {
        state.isFetchingpaidpersonalloans = true;
        state.isFetchingpaidpersonalloansFailed = null;
      })
      .addCase(fetchUpdatedpaidpersonalloans.fulfilled, (state, action) => {
        state.isFetchingpaidpersonalloans = false;
        state.paidpersonalloans = action.payload.data;
      })
      .addCase(fetchUpdatedpaidpersonalloans.rejected, (state, action) => {
        state.isFetchingpaidpersonalloans = false;
        state.isFetchingpaidpersonalloansFailed = action.payload;
      });
  },
});

export default paidpersonalloansSlice.reducer;
export const {
  fetchingpaidpersonalloans,
  fetchingpaidpersonalloansSuccessful,
  fetchingpaidpersonalloansFailed,
} = paidpersonalloansSlice.actions;
