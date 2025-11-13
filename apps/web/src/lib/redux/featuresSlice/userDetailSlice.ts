import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store.js';
import {} from '../../../utils/getUserData';
import {userCredentials} from 'types'
interface UserState extends userCredentials{
 state?: 'pending' | 'loading' | 'succeeded' | 'failed';
}
const  initialState:UserState={
  username: '',
  userId: '',
  picture: '',
  email: '',
  token: "",
  isVerified:null,
  state: 'pending',
};

export const fetch_user_Details = createAsyncThunk(
  'getAdmin_Details',
  async (_, thunkAPI) => {
    try {
      const res = await getAdminData();
      return res
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase( fetch_user_Details.pending, (state) => {
        state.state ='loading';
      })
      .addCase( fetch_user_Details.fulfilled, (state, action)=> {
      
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.userId = action.payload.userId;
        state.picture = action.payload.picture;
        state.isVerified=action.payload.isVerified;
        state.token=action.payload.token;
        state.state = 'succeeded';
        }
      )
      .addCase( fetch_user_Details.rejected, (state) => {
        state.state = 'failed';
      });
  },
});

export const userInfo = (state: RootState) => state.user;

export default userSlice.reducer;
