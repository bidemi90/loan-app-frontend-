import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch personal loan  data from the database
export const fetchUpdatedpaidstudentloans = createAsyncThunk(
  "paidstudentloan/fetchUpdatedpaidstudentloans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8332/loanapp/fetchpaidStudentLoan");
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
  isFetchingpaidstudentloans: false,
  paidstudentloans: [],
  isFetchingpaidstudentloansFailed: null,
};

const paidstudentloansSlice = createSlice({
  name: "paidstudentloan",
  initialState,
  reducers: {
    fetchingpaidstudentloans: (state) => {
      state.isFetchingpaidstudentloans = true;
      state.paidstudentloans = [];
      state.isFetchingpaidstudentloansFailed = null;
    },
    fetchingpaidstudentloansSuccessful: (state, action) => {
      state.isFetchingpaidstudentloans = false;
      state.paidstudentloans = action.payload;
      state.isFetchingpaidstudentloansFailed = null;
    },
    fetchingpaidstudentloansFailed: (state, action) => {
      state.isFetchingpaidstudentloans = false;
      state.paidstudentloans = [];
      state.isFetchingpaidstudentloansFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedpaidstudentloans.pending, (state) => {
        state.isFetchingpaidstudentloans = true;
        state.isFetchingpaidstudentloansFailed = null;
      })
      .addCase(fetchUpdatedpaidstudentloans.fulfilled, (state, action) => {
        state.isFetchingpaidstudentloans = false;
        state.paidstudentloans = action.payload.data;
      })
      .addCase(fetchUpdatedpaidstudentloans.rejected, (state, action) => {
        state.isFetchingpaidstudentloans = false;
        state.isFetchingpaidstudentloansFailed = action.payload;
      });
  },
});

export default paidstudentloansSlice.reducer;
export const {
  fetchingpaidstudentloans,
  fetchingpaidstudentloansSuccessful,
  fetchingpaidstudentloansFailed,
} = paidstudentloansSlice.actions;
