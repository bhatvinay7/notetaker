"use client";
import React from 'react'
import {MoveLeft,MoveRight} from "lucide-react";
import { useDispatch,useSelector } from "react-redux";
import { toggleSidebar,sideBarState } from "../../lib/redux/featuresSlice/slideBarSlice";

export default function Togglecomponent() {
  const dispatch=useDispatch()  
  const value=useSelector(sideBarState)
  return (
    <div onClick={()=>{dispatch(toggleSidebar(!value))}} className=' hidden sm:block cursor-pointer w-fit p-2 bg-gray-300 rounded-full border border-black/12'>
      {value ?<MoveLeft className='w-5 h-5 text-black/60 '/>:<MoveRight className='w-5 h-5 text-black/60 '/>}
    </div>
  )
}
