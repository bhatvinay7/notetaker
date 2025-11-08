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
children,}: {
children: ReactNode}) {
  const value = useSelector(sideBarState);
  const dispatch = useDispatch();
  return (
    <div  className={` w-full   h-screen bg-white  sm:bg-white relative  grid grid-cols-[1fr] ${value ? "     sm:grid-cols-[180px_1fr] md:grid-cols-[300px_1fr]" : "sm:grid-cols-[80px_1fr]  "} `}>

      {value ?
        <div className="  w-full  relative inset-0 top-0 flex justify-center  sm:border sm:border-black/12 ">
      <div className=" absolute hidden sm:block -right-2 z-45 top-2 sm:-right-4">
        <Togglecomponent />
      </div>
          <Sidebar />
        </div>
       : 
        <div className={` ${value ? "hidden":" hidden sm:block w-full "}  z-42 sm:relative sm:border sm:border-black/12 sm:h-full `}>
          <div className=" absolute z-45 -right-4 top-2 ">
            <Togglecomponent />
          </div>
        </div>
      }
      {children}
    </div>
  );
}
