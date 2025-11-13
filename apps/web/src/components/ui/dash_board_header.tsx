'use client'
import React from 'react'
import { Dispatch, Ref, SetStateAction } from 'react'
import Toggle_dark_mode from './toggle_dark_mode';
import { Search, Plus } from "lucide-react";
interface seachProps{
setShowSearch?:Dispatch<React.SetStateAction<boolean>>,
setNewSession?:Dispatch<React.SetStateAction<boolean>>,
buttonRef?:Ref<HTMLButtonElement>
isVisible?:Boolean 
}
export default function Dash_board_header({setShowSearch,setNewSession,buttonRef,isVisible}:seachProps) {
  return (
          <header className={` ${isVisible ? "flex" :"hidden"} sticky top-0 z-35 left-0 w-full sm:flex justify-between items-center px-6 py-4 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 shadow-sm "`}>
        <div className={`${isVisible ?"flex":"hidden"} gap-3`}>   
          {/* Search Button */}
          <button
            onClick={() => setShowSearch?.(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 
            transition-all duration-200">
            <Search className='w-5 h-5' />
            <span className='text-base'>Search</span>
          </button>
          {/* New Chat Button */}
          <button
            onClick={() => setNewSession?.(true)}
            ref={buttonRef}
            className="flex items-center gap-1 py-1 px-2 sm:px-4 sm:py-2 rounded-2xl bg-blue-600/75 dark:bg-gray-800 text-white 
            hover:bg-blue-700 dark:hover:bg-gray-700  transition-all duration-200 
              shadow-md">
            <Plus className='w-5 h-5' />
            <span className='text-base'>New Chat</span>
          </button>
        </div>
        <div className='w-fit h-fit hidden ml-auto sm:block'>
          <Toggle_dark_mode />
        </div>
      </header>
  )
}
