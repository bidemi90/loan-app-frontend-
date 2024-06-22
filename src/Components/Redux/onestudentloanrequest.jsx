import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch onestudent loan request data from the database
export const fetchUpdatedonestudentLoanRequests = createAsyncThunk(
  "onestudentLoan/fetchUpdatedonestudentLoanRequests",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8332/loanapp/fetchoneStudentLoanRequests/${id}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch one student loan requests"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingonestudentLoanRequests: false,
  onestudentLoanRequests: [],
  isFetchingonestudentLoanRequestsFailed: null,
};

const onestudentLoanRequestsSlice = createSlice({
  name: "onestudentLoan",
  initialState,
  reducers: {
    fetchingonestudentLoanRequests: (state) => {
      state.isFetchingonestudentLoanRequests = true;
      state.onestudentLoanRequests = [];
      state.isFetchingonestudentLoanRequestsFailed = null;
    },
    fetchingonestudentLoanRequestsSuccessful: (state, action) => {
      state.isFetchingonestudentLoanRequests = false;
      state.onestudentLoanRequests = action.payload;
      state.isFetchingonestudentLoanRequestsFailed = null;
    },
    fetchingonestudentLoanRequestsFailed: (state, action) => {
      state.isFetchingonestudentLoanRequests = false;
      state.onestudentLoanRequests = [];
      state.isFetchingonestudentLoanRequestsFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedonestudentLoanRequests.pending, (state) => {
        state.isFetchingonestudentLoanRequests = true;
        state.isFetchingonestudentLoanRequestsFailed = null;
      })
      .addCase(
        fetchUpdatedonestudentLoanRequests.fulfilled,
        (state, action) => {
          state.isFetchingonestudentLoanRequests = false;
          state.onestudentLoanRequests = action.payload.data;
        }
      )
      .addCase(
        fetchUpdatedonestudentLoanRequests.rejected,
        (state, action) => {
          state.isFetchingonestudentLoanRequests = false;
          state.isFetchingonestudentLoanRequestsFailed = action.payload;
        }
      );
  },
});

export default onestudentLoanRequestsSlice.reducer;
export const {
  fetchingonestudentLoanRequests,
  fetchingonestudentLoanRequestsSuccessful,
  fetchingonestudentLoanRequestsFailed,
} = onestudentLoanRequestsSlice.actions;
