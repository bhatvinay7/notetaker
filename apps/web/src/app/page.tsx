'use client'
import React, { useState } from 'react'
import { Pencil,ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import useToggleDarkMode from '../hook/use-toggle-darkMode'
import SlideBar from '../components/ui/sidebar'
import Header from '../components/ui/header'
import { useSelector } from 'react-redux';
import {
  sideBarState,
} from "../lib/redux/featuresSlice/slideBarSlice";
export default function LandingPage() {
  const slideState= useSelector(sideBarState)
  const value =useToggleDarkMode()
  return (
    <div
      className={`relative h-screen select-none  transition-colors duration-500 ${
        value ? "dark bg-gray-800 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className={` ${slideState ? "block":"hidden"} bg-white sm:hidden absolute z-45 inset-0 top-0 w-full h-full `}>
        <SlideBar/>
      </div>
      {/* Background Gradients */}
      <div className="hidden sm:block w-full">
      <Header/>

      </div>
      {/* Hero Section (Animated) */}
      <motion.main
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-8 lg:px-20 top-16 sm:top-20 sm:py-14 md:py-16 lg:py-24 gap-10"
      >
        <div className="text-center lg:text-left max-w-xl space-y-3 sm:space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
            Capture your <span className="text-indigo-500">thoughts</span> effortlessly
          </h1>
          <p className={`text-base md:text-lg ${ value ? "text-gray-300" : "text-black"}`}>
            Organize ideas, create sessions, and manage notes seamlessly — all in one elegant workspace.
          </p>
          <div className="flex justify-center lg:justify-start gap-4 pt-4">
            <button className="flex items-center text-base sm:text-lg gap-2 p-1 sm:px-3 sm:py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg transition-all">
              Start Writing <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
            <button className="p-1 sm:px-3 sm:py-2 text-base sm:text-lg rounded-lg border text-white border-gray-400 dark:border-gray-800 bg-[hsl(140,2%,37%)] hover:bg-gray-100 dark:hover:bg-[hsl(129,49%,16%)] transition-all">
              Learn More
            </button>
          </div>
        </div>

        {/* Preview Card */}
        <div
          className={`relative ${
            value ? "text-gray-900/60 border-white/20" : "bg-gray-100"
          } mb-3 sm:mb-0 rounded-3xl border border-black/20 p-6 w-full max-w-md sm:max-w-sm `}
        >
          <div className="flex justify-between mb-4">
            <span className="font-semibold text-gray-700 font-serif dark:text-gray-500">
              Session: Personal Notes
            </span>
            <Pencil className="w-5 h-5 text-indigo-500" />
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-100 text-base hover:scale-105 transition dark:bg-gray-300 rounded-lg">
              ✨ Improve UI for landing page
            </div>
            <div className="p-3 bg-gray-100 text-base hover:scale-105 transition dark:bg-gray-300 rounded-lg">
              🧠 Plan note synchronization logic
            </div>
            <div className="p-3 bg-gray-100 text-base hover:scale-105 transition dark:bg-gray-300 rounded-lg">
              📦 Add cloud backup integration
            </div>
          </div>
          <button className="mt-6 w-full bg-indigo-600/60 hover:scale-105 text-white py-2 rounded-lg transition">
            Save Note
          </button>
        </div>
      </motion.main>

      {/* Footer (Animated) */}
      <motion.footer
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="w-full text-center py-8 absolute mt-auto flex justify-center mx-auto text-gray-500 dark:text-gray-400"
      >
        © {new Date().getFullYear()} NoteTaker
      </motion.footer>
    </div>
  );
}
