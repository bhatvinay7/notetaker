'use client'
import React from 'react'
import { NotebookPen, Sun, Moon, Menu, X } from "lucide-react";
import {
  sideBarState,
  toggleSidebar,
} from "../../lib/redux/featuresSlice/slideBarSlice";
import Toggle_dark_mode from './toggle_dark_mode';
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../lib/redux/featuresSlice/toggleDarkModeSlice";
import useToggleDarkMode from '../../hook/use-toggle-darkMode'

export default function Page() {
  const value = useSelector(sideBarState);
  const toggleState = useToggleDarkMode();
  const dispatch = useDispatch();

  return (
    <header className="w-full sticky top-0 flex z-45 justify-between items-center bg-gray-200 dark:bg-[hsl(210,3%,15%)] text-black/75 dark:text-[hsl(210,2%,55%)] p-1.5 sm:px-8 sm:py-4 shadow-md">
      
      
      <div className="flex items-center gap-3 p-3">
        
        <button
          onClick={() => dispatch(toggleSidebar(!value))}
          className="bg-gray-300 dark:bg-[hsl(210,3%,15%)] rounded-full p-2 block sm:hidden transition-transform hover:scale-110"
        >
          {!value ? (
            <Menu className="w-5 h-5 text-black/75 dark:text-[hsl(210,2%,55%)]" />
          ) : (
            <X className="w-5 h-5 text-black/75 dark:text-[hsl(210,2%,55%)]" />
          )}
        </button>

      
        <div className="flex items-center gap-2">
          <NotebookPen className="w-6 h-6 text-black/75 dark:text-[hsl(210,2%,55%)]" />
          <span className="text-xl font-bold whitespace-nowrap text-black/75 dark:text-[hsl(210,2%,55%)]">
            NoteTaker
          </span>
        </div>
      </div>  
      <Toggle_dark_mode/>
    </header>
  )
}
