'use client'
import React from 'react'
import {Sun, Moon} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../lib/redux/featuresSlice/toggleDarkModeSlice";
import useToggleDarkMode from '../../hook/use-toggle-darkMode'
export default function Toggle_dark_mode() {
const toggleState = useToggleDarkMode();
const dispatch = useDispatch();
  return (
   
   <div className="flex items-center  gap-4 pr-3">
  <button
    onClick={() => dispatch(toggleDarkMode(!toggleState))}
    className={`${toggleState ? "bg-gray-300" : "bg-gray-300"} cursor-pointer p-2 rounded-full hover:scale-110 transition-transform`}
  >
    {toggleState ? (
      <Sun className="w-5 h-5 text-yellow-400" />
    ) : (
      <Moon className="w-5 h-5 text-gray-800" />
    )}
  </button>
</div>
   
  )
}
