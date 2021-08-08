import {configureStore} from '@reduxjs/toolkit'
import ImageSlice from './ImagesSlice'
const store = configureStore({
    reducer : ImageSlice.reducer
}); 
export default store;