import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link"
export default function Search_pop_up({ popupRef, setShowSearch, showSearch, setSearch, notes }: { popupRef: React.Ref<HTMLDivElement>, setShowSearch: React.Dispatch<React.SetStateAction<boolean>>, showSearch: boolean, setSearch: React.Dispatch<React.SetStateAction<string>>, notes: string[] }) {
    return (
        <AnimatePresence>
            {showSearch && (
                <>
                    {/* Background Blur */}
                    <motion.div
                        className=" fixed inset-0  bg-black/20 backdrop-blur-sm z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowSearch(false)}
                    />
                    <motion.div
                        className=" absolute top-[10%] sm:top-[20%] inset-0 w-full z-50 flex items-start justify-center"
                        transition={{ type: "spring", duration: 0.4 }}
                    >
                        <div ref={popupRef} className="bg-white border dark:border-white/20 relative mx-auto dark:bg-gray-900 max-h-65 rounded-xl overflow-y-auto custom-scrollbar overflow-x-hidden p-6 shadow-xl w-[90%]  max-w-xl">
                        <div className='w-full sticky bg-white z-35 -top-6 dark:bg-gray-900 blur-[1px] h-8'>
                        </div>
                            <div className='sticky top-2'>
                                <input
                                    type="text"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search your notes..."
                                    className="w-full px-4 py-1.5 rounded-md border bg-white   border-gray-300 dark:border-gray-700 
                                   dark:bg-gray-800 
                                     focus:outline-none 
                                     focus:ring-1 focus:ring-blue-300"
                                    autoFocus
                                />
                            </div>
                            <div className='w-full h-full p-1 '>
                                {notes?.map((each) => {
                                    return (
                                        <Link href={`/dashboard/u/${each.id}`} key={each.id} className='p-1 border-b z-30 line-clamp-2 hover:dark:bg-white/15 hover:bg-black/15 hover:cursor-pointer '>

                                            <span>{each.title}</span>
                                        </Link>
                                    )
                                })}

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>


    )
}
