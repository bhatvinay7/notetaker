'use client'
import React from 'react'
import SideBarController from '../../components/ui/sidebar-controller'
import { useDispatch, useSelector } from "react-redux";
import { sideBarState } from '../../lib/redux/featuresSlice/slideBarSlice'
import Header from '../../components/ui/header'
import { useState, useEffect, useRef} from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Search_pop_up from '../../components/ui/search_pop_up';
import DashBoard from '../../components/ui/dash_board_header';
import {createSession} from '../../utils/createNewSession';
import {searchNote} from '../../utils/searchNote'
interface searchData{
  id:string,
  title:string
}
export default function Dashboard(){

  const value = useSelector(sideBarState);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false)
  const [createNewSession, setNewSession] = useState(false)
  const [search,setSearch]=useState<string>()
  const [notes,setNotes]=useState<searchData[]>([])

  useEffect(()=>{
   const interval=setTimeout(async()=>{
     if(interval){
       clearInterval(interval)
     }
     if(search){
       const response=await searchNote(search)
       setNotes(response)
     }
   },300)
   return ()=>{
    clearInterval(interval)
   }
  },[search])
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        showSearch &&
        !popupRef?.current?.contains(target) &&
        !buttonRef?.current?.contains(target)
      ) {
        setShowSearch(false);
      }
    }

    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [showSearch]);

  useEffect(() => {
    async function Session() {
      try {
       
        const response = await createSession()
        window.location.href =response
      }
      catch (error: any) {

      }
    }
    if (createNewSession) {
      Session()
    }
  }, [createNewSession])

  return (
    <div className=" h-[calc(100%-72px)] relative z-30 sm:h-screen   w-full flex flex-col items-center ">
 <DashBoard
 setShowSearch={setShowSearch}
 setNewSession={setNewSession}
 buttonRef={buttonRef}
 isVisible={true}
 />

      <div className="relative w-full h-screen overflow-y-auto flex flex-col z-30 items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 
                        dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        {/* Center message */}
        <main className="flex flex-col items-center justify-center  mt-6 sm:mt10 md:mt-12 xl::mt-16">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">
            Start your new chat
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
            Create a new session and start taking quick notes or search through your previous ones easily.
          </p>
        </main>
        {/* Search Popup */}
        <Search_pop_up
          popupRef={popupRef}
          setShowSearch={setShowSearch}
          showSearch={showSearch}
          notes={notes}
          setSearch={setSearch}
        />
      </div>
    </div>
  )
}

