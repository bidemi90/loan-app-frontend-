import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch onePersonal loan request data from the database
export const fetchUpdatedonePersonalLoanRequests = createAsyncThunk(
  "onePersonalLoan/fetchUpdatedonePersonalLoanRequests",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8332/loanapp/fetchonePersonalLoanRequests/${id}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch one Personal loan requests"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingonePersonalLoanRequests: false,
  onePersonalLoanRequests: [],
  isFetchingonePersonalLoanRequestsFailed: null,
};

const onePersonalLoanRequestsSlice = createSlice({
  name: "onePersonalLoan",
  initialState,
  reducers: {
    fetchingonePersonalLoanRequests: (state) => {
      state.isFetchingonePersonalLoanRequests = true;
      state.onePersonalLoanRequests = [];
      state.isFetchingonePersonalLoanRequestsFailed = null;
    },
    fetchingonePersonalLoanRequestsSuccessful: (state, action) => {
      state.isFetchingonePersonalLoanRequests = false;
      state.onePersonalLoanRequests = action.payload;
      state.isFetchingonePersonalLoanRequestsFailed = null;
    },
    fetchingonePersonalLoanRequestsFailed: (state, action) => {
      state.isFetchingonePersonalLoanRequests = false;
      state.onePersonalLoanRequests = [];
      state.isFetchingonePersonalLoanRequestsFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedonePersonalLoanRequests.pending, (state) => {
        state.isFetchingonePersonalLoanRequests = true;
        state.isFetchingonePersonalLoanRequestsFailed = null;
      })
      .addCase(
        fetchUpdatedonePersonalLoanRequests.fulfilled,
        (state, action) => {
          state.isFetchingonePersonalLoanRequests = false;
          state.onePersonalLoanRequests = action.payload.data;
        }
      )
      .addCase(
        fetchUpdatedonePersonalLoanRequests.rejected,
        (state, action) => {
          state.isFetchingonePersonalLoanRequests = false;
          state.isFetchingonePersonalLoanRequestsFailed = action.payload;
        }
      );
  },
});

export default onePersonalLoanRequestsSlice.reducer;
export const {
  fetchingonePersonalLoanRequests,
  fetchingonePersonalLoanRequestsSuccessful,
  fetchingonePersonalLoanRequestsFailed,
} = onePersonalLoanRequestsSlice.actions;
