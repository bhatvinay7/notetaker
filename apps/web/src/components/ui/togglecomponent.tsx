"use client";
import React from 'react'
import {MoveLeft,MoveRight} from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { toggleSidebar,sideBarState } from "../../lib/redux/featuresSlice/slideBarSlice";

export default function Togglecomponent() {
  const dispatch=useDispatch()  
  const value=useSelector(sideBarState)
  return (
    <div onClick={()=>{dispatch(toggleSidebar(!value))}} className=' hidden border sm:block cursor-pointer w-fit p-2 dark:bg-[hsl(210,3%,15%)] bg-gray-300 rounded-full  dark:white/20 dark:border-white/20'>
      {value ?<MoveLeft className='w-5 h-5  text-black/60  dark:text-white/20 '/>:<MoveRight className='w-5 h-5 text-black/60 dark:text-white/20  '/>}
    </div>
  )
}
