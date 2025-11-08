// store/sidebarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState}   from '../store.js'
type Sidebar = {
  isOpen: boolean
}
const initialState: Sidebar = {
  isOpen: false
}
export const sidebarSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    toggleSidebar(state, action: PayloadAction<boolean>) {
      state.isOpen =action.payload
    }
  }
})

// Export the action
export const { toggleSidebar } = sidebarSlice.actions
export const sideBarState=(state:RootState)=>state.sideBar.isOpen
// Export the reducer
export default sidebarSlice.reducer
