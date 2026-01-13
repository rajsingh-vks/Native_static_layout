import {createSlice} from '@reduxjs/toolkit';

// This is a common slice to manage App state
// Common Spinner (Ovarlay Loading)
// Common DatePicker for all input fields
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    spinner: false,
    uploadedFile: {},
    selectedDate: null,
    dateModal: {
      visible: false,
      mode: 'calendar',
      maxDate: null,
    },
    popupModal: {
      visible: false,
      message: '',
      type: '', // 'success' or 'error' or 'progressbar'
    },
    progressBar: {
      visible: false,
      completed: 0,
    },
    login: {
      username: '',
      password: '',
    },
  },
  reducers: {
    setSpinner: (state, action) => {
      state.spinner = action.payload;
    },
    setSelcetedDate: (state, action) => {
      state.selectedDate = action.payload;
      state.dateModal = false;
    },
    setDateModal: (state, action) => {
      state.dateModal = {...state.dateModal, ...action.payload};
    },
    setPopupModal: (state, action) => {
      state.popupModal = {...state.popupModal, ...action.payload};
      if (action.payload?.type == 'progressbar') {
        state.progressBar = {
          visible: true,
          completed: 0,
        };
      }
    },
    setProgressBar: (state, action) => {
      state.progressBar = {...state.progressBar, ...action.payload};
    },
  },
});

export const {
  setSpinner,
  setSelcetedDate,
  setDateModal,
  setPopupModal,
  setProgressBar,
} = appSlice.actions;

// Get spinner visibility
export const spinnerVisible = state => state.app?.spinner;

// Get selected date
export const getSelectedDate = state => state.app?.selectedDate;

// Get date modal visiblity
export const getDateModal = state => state.app?.dateModal;

// Get date modal visiblity
export const getPopupModal = state => state.app?.popupModal;

// Get uploaded file percentage
export const getProgressBar = state => state.app?.progressBar;

export default appSlice.reducer;
