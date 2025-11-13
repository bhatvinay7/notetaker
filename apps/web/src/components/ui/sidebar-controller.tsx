"use client";
import React from "react";
import {
  sideBarState,
  toggleSidebar,
} from "../../lib/redux/featuresSlice/slideBarSlice";

import Togglecomponent from "./togglecomponent";
import Sidebar from "./sidebar";
import { useDispatch,useSelector } from "react-redux";
export default function SidebarController({
children}: {
children: ReactNode}) {
  const value = useSelector(sideBarState);
  const dispatch = useDispatch();
  return (
    <div  className={` w-full   h-screen  sm:bg-none relative z-50 grid grid-cols-[1fr] ${value ? "sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr] border-0 " : "sm:grid-cols-[80px_1fr]  "} `}>

      {value ?
        <div className="  w-full absolute sm:relative inset-0 top-0 z-45 flex justify-center  sm:border sm:border-black/12 ">
      <div className=" absolute hidden sm:block -right-2 z-50 top-2 sm:-right-4">
        <Togglecomponent />
      </div>
          <Sidebar />
        </div>
       : 
        <div className={` ${value ? "hidden":" hidden sm:block w-full "}  z-45 dark:bg-gray-800 sm:relative sm:border sm:border-black/10 sm:h-full `}>
          <div className=" absolute z-50 -right-4 top-2 ">
            <Togglecomponent />
          </div>
        </div>
      }
      {children}
    </div>
  );
}
