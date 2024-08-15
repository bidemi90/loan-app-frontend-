import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch oneauto loan request data from the database
export const fetchUpdatedoneautoLoanRequests = createAsyncThunk(
  "oneautoLoan/fetchUpdatedoneautoLoanRequests",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://loan-app-backend-siin.onrender.com/loanapp/fetchoneAutoLoanRequests/${id}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch one auto loan requests"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingoneautoLoanRequests: false,
  oneautoLoanRequests: [],
  isFetchingoneautoLoanRequestsFailed: null,
};

const oneautoLoanRequestsSlice = createSlice({
  name: "oneautoLoan",
  initialState,
  reducers: {
    fetchingoneautoLoanRequests: (state) => {
      state.isFetchingoneautoLoanRequests = true;
      state.oneautoLoanRequests = [];
      state.isFetchingoneautoLoanRequestsFailed = null;
    },
    fetchingoneautoLoanRequestsSuccessful: (state, action) => {
      state.isFetchingoneautoLoanRequests = false;
      state.oneautoLoanRequests = action.payload;
      state.isFetchingoneautoLoanRequestsFailed = null;
    },
    fetchingoneautoLoanRequestsFailed: (state, action) => {
      state.isFetchingoneautoLoanRequests = false;
      state.oneautoLoanRequests = [];
      state.isFetchingoneautoLoanRequestsFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedoneautoLoanRequests.pending, (state) => {
        state.isFetchingoneautoLoanRequests = true;
        state.isFetchingoneautoLoanRequestsFailed = null;
      })
      .addCase(
        fetchUpdatedoneautoLoanRequests.fulfilled,
        (state, action) => {
          state.isFetchingoneautoLoanRequests = false;
          state.oneautoLoanRequests = action.payload.data;
        }
      )
      .addCase(
        fetchUpdatedoneautoLoanRequests.rejected,
        (state, action) => {
          state.isFetchingoneautoLoanRequests = false;
          state.isFetchingoneautoLoanRequestsFailed = action.payload;
        }
      );
  },
});

export default oneautoLoanRequestsSlice.reducer;
export const {
  fetchingoneautoLoanRequests,
  fetchingoneautoLoanRequestsSuccessful,
  fetchingoneautoLoanRequestsFailed,
} = oneautoLoanRequestsSlice.actions;
