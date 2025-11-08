import { configureStore,EnhancedStore } from '@reduxjs/toolkit'
import userReducer from './featuresSlice/userDetailSlice'
import toggleBarReducer from './featuresSlice/slideBarSlice'
import toggleDarkModeState from './featuresSlice/toggleDarkModeSlice'
export const makeStore= ():EnhancedStore => {
  return configureStore({
    reducer: {
        user: userReducer,
        sideBar:toggleBarReducer,
        mode:toggleDarkModeState
    }
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']