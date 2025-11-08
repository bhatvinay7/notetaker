'use client'
import React from 'react'
import SideBarController from '../../components/ui/sidebar-controller'
import { useDispatch,useSelector } from "react-redux";
import {sideBarState} from '../../lib/redux/featuresSlice/slideBarSlice'
import Header from '../../components/ui/header'
export default function Dashboard() {
  const value = useSelector(sideBarState);
  return (
    <div className="h-screen w-full">
      <div className=" relative flex-1 h-full bg-white flex-col">
      </div>    
      </div>
  )
}



