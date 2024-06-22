import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch onePersonal loan  data from the database
export const fetchUpdatedonepaidstudentloans = createAsyncThunk(
  "onepaidstudentloan/fetchUpdatedonepaidstudentloans",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8332/loanapp/fetchonepaidStudentLoan/${id}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch one Personal loan s"
        );
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingonepaidstudentloans: false,
  onepaidstudentloans: [],
  isFetchingonepaidstudentloansFailed: null,
};

const onepaidstudentloansSlice = createSlice({
  name: "onepaidstudentloan",
  initialState,
  reducers: {
    fetchingonepaidstudentloans: (state) => {
      state.isFetchingonepaidstudentloans = true;
      state.onepaidstudentloans = [];
      state.isFetchingonepaidstudentloansFailed = null;
    },
    fetchingonepaidstudentloansSuccessful: (state, action) => {
      state.isFetchingonepaidstudentloans = false;
      state.onepaidstudentloans = action.payload;
      state.isFetchingonepaidstudentloansFailed = null;
    },
    fetchingonepaidstudentloansFailed: (state, action) => {
      state.isFetchingonepaidstudentloans = false;
      state.onepaidstudentloans = [];
      state.isFetchingonepaidstudentloansFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedonepaidstudentloans.pending, (state) => {
        state.isFetchingonepaidstudentloans = true;
        state.isFetchingonepaidstudentloansFailed = null;
      })
      .addCase(
        fetchUpdatedonepaidstudentloans.fulfilled,
        (state, action) => {
          state.isFetchingonepaidstudentloans = false;
          state.onepaidstudentloans = action.payload.data;
        }
      )
      .addCase(
        fetchUpdatedonepaidstudentloans.rejected,
        (state, action) => {
          state.isFetchingonepaidstudentloans = false;
          state.isFetchingonepaidstudentloansFailed = action.payload;
        }
      );
  },
});

export default onepaidstudentloansSlice.reducer;
export const {
  fetchingonepaidstudentloans,
  fetchingonepaidstudentloansSuccessful,
  fetchingonepaidstudentloansFailed,
} = onepaidstudentloansSlice.actions;
