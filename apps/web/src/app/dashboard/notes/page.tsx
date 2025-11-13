'use client'
import moment from "moment"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { NotebookPen } from 'lucide-react'
import { getAllNotes} from '../../../utils/getNote'
import Dash_board_header from "../../../components/ui/dash_board_header"
export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])

  useEffect(() => {
    async function fetchNotes() {
      const data = await getAllNotes()
      setNotes(data)
    }
    fetchNotes()
  }, [])

  return (
    <div className=" relative z-30 h-[calc(100%-72px)] sm:h-screen overflow-y-auto flex flex-col items-center bg-gray-100 dark:bg-gray-900  ">
        <Dash_board_header
        isVisible={false}
        />
      <h1 className="text-2xl px-2 self-start font-semibold text-gray-800 dark:text-white mb-6">
        My Notes
      </h1>

      <div className=" w-full p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {notes?.map((note) => (
          <Link
            key={note.id}
            href={`/dashboard/u/${note.id}`}
            className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all p-6 flex flex-col items-center justify-center cursor-pointer"
          >
            <NotebookPen className="w-8 h-8 self-start text-blue-500 mb-3 group-hover:scale-110 transition-transform" />
            <h2 className="text-center text-base text-gray-700 line-clamp-1 dark:text-gray-200 font-medium">
              {note.title}
            </h2>
            <span className="absolute bottom-2 right-3 text-xs text-gray-400">
              {moment(note.createdAt).fromNow()}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
