import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  item: [],
  isLoading: false,
  isError: false,
  name: '',
  localstorage: localStorage.getItem('search')
    ? [...localStorage.getItem('search').split(',')]
    : [],
};
const ImageSlice = createSlice({
  name: 'image',
  initialState: initialState,
  reducers: {
    AddImage(state, action) {
      state.item = [...action.payload.images];
      const exist = state.localstorage.find(
        item => item === action.payload.name
      );
      if (action.payload.name && !exist) {
        state.name = action.payload.name;
        state.localstorage = [action.payload.name, ...state.localstorage];
        localStorage.setItem('search', state.localstorage);
      }
    },
    AddMore(state, action) {
      state.item = [...state.item, ...action.payload.images];
    },
    Loading(state) {
      state.isLoading = true;
      state.isError = false;
    },
    NotLoading(state) {
      state.isLoading = false;
    },
    Addmore(state, action) {
      state.item.push([...action.payload.images]);
    },
    IsError(state) {
      state.isError = true;
      state.Loading = false;
      state.item = [];
    },
  },
});

export default ImageSlice;
export const ImageSliceAction = ImageSlice.actions;
