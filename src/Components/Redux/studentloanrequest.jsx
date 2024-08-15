import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch student loan request data from the database
export const fetchUpdatedStudentLoanRequests = createAsyncThunk(
  "studentLoan/fetchUpdatedStudentLoanRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("https://loan-app-backend-siin.onrender.com/loanapp/fetchStudentLoanRequests");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch student loan requests");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingStudentLoanRequests: false,
  studentLoanRequests: [],
  isFetchingStudentLoanRequestsFailed: null,
};

const studentLoanRequestsSlice = createSlice({
  name: "studentLoan",
  initialState,
  reducers: {
    fetchingStudentLoanRequests: (state) => {
      state.isFetchingStudentLoanRequests = true;
      state.studentLoanRequests = [];
      state.isFetchingStudentLoanRequestsFailed = null;
    },
    fetchingStudentLoanRequestsSuccessful: (state, action) => {
      state.isFetchingStudentLoanRequests = false;
      state.studentLoanRequests = action.payload;
      state.isFetchingStudentLoanRequestsFailed = null;
    },
    fetchingStudentLoanRequestsFailed: (state, action) => {
      state.isFetchingStudentLoanRequests = false;
      state.studentLoanRequests = [];
      state.isFetchingStudentLoanRequestsFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedStudentLoanRequests.pending, (state) => {
        state.isFetchingStudentLoanRequests = true;
        state.isFetchingStudentLoanRequestsFailed = null;
      })
      .addCase(fetchUpdatedStudentLoanRequests.fulfilled, (state, action) => {
        state.isFetchingStudentLoanRequests = false;
        state.studentLoanRequests = action.payload.data;
      })
      .addCase(fetchUpdatedStudentLoanRequests.rejected, (state, action) => {
        state.isFetchingStudentLoanRequests = false;
        state.isFetchingStudentLoanRequestsFailed = action.payload;
      });
  },
});

export default studentLoanRequestsSlice.reducer;
export const {
  fetchingStudentLoanRequests,
  fetchingStudentLoanRequestsSuccessful,
  fetchingStudentLoanRequestsFailed,
} = studentLoanRequestsSlice.actions;
