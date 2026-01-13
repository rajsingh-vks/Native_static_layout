import AsyncStorage from '@react-native-async-storage/async-storage';
import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    data:{}
  },
  reducers: {
    setUser: (state, action) => {
      state.data = {...state.data,...action.payload};
      AsyncStorage.setItem('user', JSON.stringify(state.data));
    },    
    removeUser: state => {
      AsyncStorage.removeItem('user')
      state.data = {};
    },
  },
});

export const {setUser, removeUser} = userSlice.actions;

// Get User data from redux store
export const getUser = (state) => state.user?.data

export default userSlice.reducer;
