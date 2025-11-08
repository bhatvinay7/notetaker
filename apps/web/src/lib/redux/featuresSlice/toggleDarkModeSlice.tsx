import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState}   from '../store.js'
type toggleState = {
  modeState: boolean
}
const initialState: toggleState  = {
 modeState: false
}

export const darkModeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    toggleDarkMode(state, action: PayloadAction<boolean>) {

      state.modeState =action.payload
    }
  }
})

// Export the action
export const { toggleDarkMode } = darkModeSlice.actions
export const darkModeState=(state:RootState)=>state.mode.modeState
// Export the reducer
export default darkModeSlice.reducer
