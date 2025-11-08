import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "note taker",
  description: "",
};
import RedduxProvider from '../components/ui/ReduxRootProvider'
import Controller from '../components/ui/sidebar-controller'
import Header from '../components/ui/header'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (  
  <html lang="en">
  <body className={`${geistSans.variable} h-screen  ${geistMono.variable}`}>
    <RedduxProvider>
    <div className=" w-full min-h-screen  flex flex-col">

      <div className=" w-full  sticky top-0 z-50 sm:hidden ">
        <Header/>  
      </div> 

           {children}
    </div>  
      
    </RedduxProvider>
  </body>
</html>
  );
}
