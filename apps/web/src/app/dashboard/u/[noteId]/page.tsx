'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import dayjs from 'dayjs'
import {getNote} from '../../../../utils/getNote'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Loader } from 'lucide-react'
import Dash_board_header from "../../../../components/ui/dash_board_header"
dayjs.extend(relativeTime)

interface Note {
  id: string
  title: string
  summary: string
  createdAt: string
}

export default function NotePage() {
  const { noteId } = useParams<{noteId:string|null}>(null)
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!noteId) return

    const fetchNote = async () => {
      try {
        const response=await getNote(noteId)
      
        setNote(response)
      } catch (err) {
        console.error('Error fetching note:', err)
      } finally {
        setLoading(false)
      }
    }
    if(noteId){
        fetchNote()
    }
  }, [noteId])

  if (loading)
    return (
      <div className=" h-screen flex flex-col relative  items-center ">
          <Dash_board_header
          isVisible={false}
  />
       <div className='flex space-x-3 relative my-auto items-center justify-center w-full h-full'>
        <Loader className=" animate-spin w-8 h-8 text-gray-700 dark:text-gray-200" /><span>Loading...</span>

       </div>
      </div>
    )

  if (!note)
    return (
      <div className="h-screen flex flex-col items-center text-gray-600 dark:text-gray-300">
        <Dash_board_header
        isVisible={false}
        />
        Note not found or deleted.
      </div>
    )

  return (
    <div  className='w-full relative z-30 h-[calc(100%-72px)] sm:h-screen  overflow-y-auto flex flex-col items-center'>
    <Dash_board_header
    isVisible={false}
    />  
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-2">
        {note.title}
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Created {dayjs(note.createdAt).fromNow()}
      </p>
      <div className="prose dark:prose-invert max-w-none text-gray-800 dark:text-gray-200">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {note.summary}
        </ReactMarkdown>
      </div>
    </div>
    </div>
  )
}
