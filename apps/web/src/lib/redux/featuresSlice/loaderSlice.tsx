// store/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState}   from '../store.js'
type loader = {
  isLoading: boolean
}
const initialState: loader = {
  sLoading: false
}
export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isLoading =action.payload
    }
  }
})

// Export the action
export const { callLoader } = loaderSlice.actions
export const loaderState=(state:RootState)=>state.loader.isLoading
// Export the reducer
export default loaderSlice.reducer
