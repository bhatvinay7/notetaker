'use client'
import React, { useState } from 'react';
import { FileText, PlusCircle, Star,NotebookPen } from 'lucide-react';
import useToggleDarkMode from '../../hook/use-toggle-darkMode'
export default function Sidebar() {
  const [active, setActive] = useState('notes');
  const value = useToggleDarkMode()
  const menuItems = [
    { id: 'notes', label: 'Notes', icon: <FileText className="w-5 h-5" /> },
    { id: 'new', label: 'New Note', icon: <PlusCircle className="w-5 h-5" /> },
    { id: 'starred', label: 'Starred', icon: <Star className="w-5 h-5" /> },
  ];

  return (
    <div className={ ` h-screen w-full  z-45 ${ value ? "bg-gray-900 text-white/75":"bg-white/75 text-black " }  backdrop-blur-md   dark:border-gray-700 p-4 flex flex-col `}>
      {/* Logo / Header */}
        <div className=" w-fit justify-center gap-x-2 sm:flex hidden ">
        <NotebookPen className="w-8 h-8  text-indigo-500" />
        <h2 className=" text-2xl  font-bold text-indigo-600 text-center mb-8 tracking-tight ">NoteTaker</h2>
        </div>  

        {/* Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all
                  ${
                    active === item.id
                      ? 'bg-indigo-600 text-black/75 shadow-sm'
                      : 'text-gray-700 dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700/40'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    
  );
}
