import React from 'react'
import Controller from '../../components/ui/sidebar-controller'
import Header from '../../components/ui/header'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
    <div className=" w-full h-screen  flex flex-col">
        {children}
        <Controller/>
    </div>  
  );
}
