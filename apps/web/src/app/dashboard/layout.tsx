import React from 'react'
import Controller from '../../components/ui/sidebar-controller'
import Header from '../../components/ui/header'
export default function RootLayout(
  {
  children,}: Readonly<{children: React.ReactNode;}>) {
  return (  
    <div className=" w-full h-screen relative overflow-y-hidden z-32 flex flex-col">
        <Controller>
          {children}
        </Controller>
    </div>  
  );
}
