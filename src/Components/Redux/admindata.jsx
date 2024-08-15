import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk to fetch updated admin data from the database
export const fetchUpdatedAdmindata = createAsyncThunk(
  "admin/fetchUpdatedAdmindata",
  async (email, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://loan-app-backend-siin.onrender.com/loanapp/getAdminByEmail/${email}`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch admin data");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isFetchingAdmin: false,
  admindata: {},
  isFetchingAdminFailed: null,
};

const admindataSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    fetchingAdmin: (state) => {
      state.isFetchingAdmin = true;
      state.admindata = {};
      state.isFetchingAdminFailed = null;
    },
    fetchingAdminSuccessful: (state, action) => {
      state.isFetchingAdmin = false;
      state.admindata = action.payload;
      state.isFetchingAdminFailed = null;
    },
    fetchingAdminFailed: (state, action) => {
      state.isFetchingAdmin = false;
      state.admindata = {};
      state.isFetchingAdminFailed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUpdatedAdmindata.pending, (state) => {
        state.isFetchingAdmin = true;
        state.isFetchingAdminFailed = null;
      })
      .addCase(fetchUpdatedAdmindata.fulfilled, (state, action) => {
        state.isFetchingAdmin = false;
        state.admindata = action.payload.admin;
      })
      .addCase(fetchUpdatedAdmindata.rejected, (state, action) => {
        state.isFetchingAdmin = false;
        state.isFetchingAdminFailed = action.payload;
      });
  },
});

export default admindataSlice.reducer;
export const { fetchingAdmin, fetchingAdminSuccessful, fetchingAdminFailed } =
  admindataSlice.actions;
