'use client'
import React from 'react'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../../lib/redux/store'

export default function StoreProvider(
  {
  children,}: {
  children: ReactNode}) {
 
  const storeRef = useRef<AppStore | null>(null)

  if (!storeRef.current) {
    
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current as any}>{children}</Provider>
}
