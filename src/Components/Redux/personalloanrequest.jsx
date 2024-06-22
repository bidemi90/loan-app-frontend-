import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch personal loan request data from the database
export const fetchUpdatedPersonalLoanRequests = createAsyncThunk(
  "personalLoan/fetchUpdatedPersonalLoanRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8332/loanapp/fetchPersonalLoanRequests");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch personal loan requests");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingPersonalLoanRequests: false,
  personalLoanRequests: [],
  isFetchingPersonalLoanRequestsFailed: null,
};

const personalLoanRequestsSlice = createSlice({
  name: "personalLoan",
  initialState,
  reducers: {
    fetchingPersonalLoanRequests: (state) => {
      state.isFetchingPersonalLoanRequests = true;
      state.personalLoanRequests = [];
      state.isFetchingPersonalLoanRequestsFailed = null;
    },
    fetchingPersonalLoanRequestsSuccessful: (state, action) => {
      state.isFetchingPersonalLoanRequests = false;
      state.personalLoanRequests = action.payload;
      state.isFetchingPersonalLoanRequestsFailed = null;
    },
    fetchingPersonalLoanRequestsFailed: (state, action) => {
      state.isFetchingPersonalLoanRequests = false;
      state.personalLoanRequests = [];
      state.isFetchingPersonalLoanRequestsFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedPersonalLoanRequests.pending, (state) => {
        state.isFetchingPersonalLoanRequests = true;
        state.isFetchingPersonalLoanRequestsFailed = null;
      })
      .addCase(fetchUpdatedPersonalLoanRequests.fulfilled, (state, action) => {
        state.isFetchingPersonalLoanRequests = false;
        state.personalLoanRequests = action.payload.data;
      })
      .addCase(fetchUpdatedPersonalLoanRequests.rejected, (state, action) => {
        state.isFetchingPersonalLoanRequests = false;
        state.isFetchingPersonalLoanRequestsFailed = action.payload;
      });
  },
});

export default personalLoanRequestsSlice.reducer;
export const {
  fetchingPersonalLoanRequests,
  fetchingPersonalLoanRequestsSuccessful,
  fetchingPersonalLoanRequestsFailed,
} = personalLoanRequestsSlice.actions;
