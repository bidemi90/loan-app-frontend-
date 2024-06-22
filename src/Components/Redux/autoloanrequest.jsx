import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch auto loan request data from the database
export const fetchUpdatedAutoLoanRequests = createAsyncThunk(
  "autoLoan/fetchUpdatedAutoLoanRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8332/loanapp/fetchAutoLoanRequests");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch auto loan requests");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingAutoLoanRequests: false,
  autoLoanRequests: [],
  isFetchingAutoLoanRequestsFailed: null,
};

const autoLoanRequestsSlice = createSlice({
  name: "autoLoan",
  initialState,
  reducers: {
    fetchingAutoLoanRequests: (state) => {
      state.isFetchingAutoLoanRequests = true;
      state.autoLoanRequests = [];
      state.isFetchingAutoLoanRequestsFailed = null;
    },
    fetchingAutoLoanRequestsSuccessful: (state, action) => {
      state.isFetchingAutoLoanRequests = false;
      state.autoLoanRequests = action.payload;
      state.isFetchingAutoLoanRequestsFailed = null;
    },
    fetchingAutoLoanRequestsFailed: (state, action) => {
      state.isFetchingAutoLoanRequests = false;
      state.autoLoanRequests = [];
      state.isFetchingAutoLoanRequestsFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedAutoLoanRequests.pending, (state) => {
        state.isFetchingAutoLoanRequests = true;
        state.isFetchingAutoLoanRequestsFailed = null;
      })
      .addCase(fetchUpdatedAutoLoanRequests.fulfilled, (state, action) => {
        state.isFetchingAutoLoanRequests = false;
        state.autoLoanRequests = action.payload.data;
      })
      .addCase(fetchUpdatedAutoLoanRequests.rejected, (state, action) => {
        state.isFetchingAutoLoanRequests = false;
        state.isFetchingAutoLoanRequestsFailed = action.payload;
      });
  },
});

export default autoLoanRequestsSlice.reducer;
export const {
  fetchingAutoLoanRequests,
  fetchingAutoLoanRequestsSuccessful,
  fetchingAutoLoanRequestsFailed,
} = autoLoanRequestsSlice.actions;
