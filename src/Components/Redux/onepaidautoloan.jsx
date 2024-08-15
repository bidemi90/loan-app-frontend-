import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch onePersonal loan  data from the database
export const fetchUpdatedonepaidautoloans = createAsyncThunk(
  "onepaidautoloan/fetchUpdatedonepaidautoloans",
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://loan-app-backend-siin.onrender.com/loanapp/fetchonepaidAutoLoan/${id}`
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
  isFetchingonepaidautoloans: false,
  onepaidautoloans: [],
  isFetchingonepaidautoloansFailed: null,
};

const onepaidautoloansSlice = createSlice({
  name: "onepaidautoloan",
  initialState,
  reducers: {
    fetchingonepaidautoloans: (state) => {
      state.isFetchingonepaidautoloans = true;
      state.onepaidautoloans = [];
      state.isFetchingonepaidautoloansFailed = null;
    },
    fetchingonepaidautoloansSuccessful: (state, action) => {
      state.isFetchingonepaidautoloans = false;
      state.onepaidautoloans = action.payload;
      state.isFetchingonepaidautoloansFailed = null;
    },
    fetchingonepaidautoloansFailed: (state, action) => {
      state.isFetchingonepaidautoloans = false;
      state.onepaidautoloans = [];
      state.isFetchingonepaidautoloansFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedonepaidautoloans.pending, (state) => {
        state.isFetchingonepaidautoloans = true;
        state.isFetchingonepaidautoloansFailed = null;
      })
      .addCase(
        fetchUpdatedonepaidautoloans.fulfilled,
        (state, action) => {
          state.isFetchingonepaidautoloans = false;
          state.onepaidautoloans = action.payload.data;
        }
      )
      .addCase(
        fetchUpdatedonepaidautoloans.rejected,
        (state, action) => {
          state.isFetchingonepaidautoloans = false;
          state.isFetchingonepaidautoloansFailed = action.payload;
        }
      );
  },
});

export default onepaidautoloansSlice.reducer;
export const {
  fetchingonepaidautoloans,
  fetchingonepaidautoloansSuccessful,
  fetchingonepaidautoloansFailed,
} = onepaidautoloansSlice.actions;
