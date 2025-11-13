import { configureStore,EnhancedStore } from '@reduxjs/toolkit'
import userReducer from './featuresSlice/userDetailSlice'
import toggleBarReducer from './featuresSlice/slideBarSlice'
import toggleDarkModeReducer from './featuresSlice/toggleDarkModeSlice'
import loaderReducer  from './featuresSlice/loaderSlice'
export const makeStore= ():EnhancedStore => {
  return configureStore({
    reducer: {
        user: userReducer,
        sideBar:toggleBarReducer,
        mode:toggleDarkModeReducer,
        loader: loaderReducer
    }
  })
}
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']