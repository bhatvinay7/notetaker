'use client'
import React, { useState } from 'react';
import { FileText, PlusCircle, Star,NotebookPen,Search } from 'lucide-react';
import useToggleDarkMode from '../../hook/use-toggle-darkMode'
import Link from 'next/link'
export default function Sidebar() {
  const [active, setActive] = useState('');
  const value = useToggleDarkMode()
  const menuItems = [
    { id: 'notes', label: 'Notes',link:"/dashboard/notes" ,icon: <FileText className="w-5 h-5" /> },
    { id: 'starred', label: 'Starred', link:"" ,icon: <Star className="w-5 h-5" /> },
    { id: 'note', label: 'search note', link:"/dashboard" ,icon: <Search className="w-5 h-5"/> },
  ];

  return (
    <div className={ ` h-screen w-full border border-black/12  z-45 ${ value ? "bg-gray-800 sm:border-0 text-white/75":"bg-white/75 text-black " }  backdrop-blur-md  p-4 flex flex-col `}>
      {/* Logo / Header */}
        <div className=" w-fit justify-center gap-x-2 sm:flex hidden ">
        <NotebookPen className="w-8 h-8  text-indigo-500" />
        <h2 className=" text-2xl  font-bold text-indigo-600 text-center mb-8 tracking-tight ">NoteTaker</h2>
        </div>  

        {/* Menu */}
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              
              <Link
                href={`${item.link}`}
                onClick={() => setActive(item.id)}
                className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all
                  ${
                    active === item.id
                      ? 'bg-indigo-600 text-black/75 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/40'
                  }`}
              >
                {item.icon}
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    
  );
}
