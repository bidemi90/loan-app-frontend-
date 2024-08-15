import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch onePersonal loan  data from the database
export const fetchUpdatedonepaidpersonalloans = createAsyncThunk(
  "onepaidpersonalloan/fetchUpdatedonepaidpersonalloans",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://loan-app-backend-siin.onrender.com/loanapp/fetchonepaidpersonalloan/${id}`
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
  isFetchingonepaidpersonalloans: false,
  onepaidpersonalloans: [],
  isFetchingonepaidpersonalloansFailed: null,
};

const onepaidpersonalloansSlice = createSlice({
  name: "onepaidpersonalloan",
  initialState,
  reducers: {
    fetchingonepaidpersonalloans: (state) => {
      state.isFetchingonepaidpersonalloans = true;
      state.onepaidpersonalloans = [];
      state.isFetchingonepaidpersonalloansFailed = null;
    },
    fetchingonepaidpersonalloansSuccessful: (state, action) => {
      state.isFetchingonepaidpersonalloans = false;
      state.onepaidpersonalloans = action.payload;
      state.isFetchingonepaidpersonalloansFailed = null;
    },
    fetchingonepaidpersonalloansFailed: (state, action) => {
      state.isFetchingonepaidpersonalloans = false;
      state.onepaidpersonalloans = [];
      state.isFetchingonepaidpersonalloansFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedonepaidpersonalloans.pending, (state) => {
        state.isFetchingonepaidpersonalloans = true;
        state.isFetchingonepaidpersonalloansFailed = null;
      })
      .addCase(
        fetchUpdatedonepaidpersonalloans.fulfilled,
        (state, action) => {
          state.isFetchingonepaidpersonalloans = false;
          state.onepaidpersonalloans = action.payload.data;
        }
      )
      .addCase(
        fetchUpdatedonepaidpersonalloans.rejected,
        (state, action) => {
          state.isFetchingonepaidpersonalloans = false;
          state.isFetchingonepaidpersonalloansFailed = action.payload;
        }
      );
  },
});

export default onepaidpersonalloansSlice.reducer;
export const {
  fetchingonepaidpersonalloans,
  fetchingonepaidpersonalloansSuccessful,
  fetchingonepaidpersonalloansFailed,
} = onepaidpersonalloansSlice.actions;
