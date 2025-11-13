'use client'
import React, { useRef, useState, useEffect } from 'react'
import { SendHorizonal } from 'lucide-react'
import {createNote} from '../../utils/createNote'
import {callLoader,loaderState} from '../../lib/redux/featuresSlice/loaderSlice'
import {useDispatch} from 'react-redux'
export default function ChatInput({sendText}:{sendText: (text: string) => Promise<void>}) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [text, setText] = useState('')
  const dispatch =useDispatch()
  useEffect(() => {
    if (textareaRef.current ) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [text])
  
  return (
    <div className=" max-h-[10vh]  relative bottom-3 sm:bottom-8 dark:bg-gray-900  w-full flex items-center justify-center p-4 sm:p-3 md:px-4">
      <div className=" w-full bg-gray-300 dark:bg-gray-700 md:w-3/5 flex border focus:ring-2 focus:ring-blue-400 rounded-md transition-all p-4 border-black/10 dark:border-white/20 items-center gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none p-3 rounded-sm bg-black/5 dark:bg-gray-700 text-gray-900 dark:text-white/60 focus:outline-none max-h-[120px] overflow-y-auto"
          rows={1}
        />
        <button
          aria-label='send'
          onClick={()=>{sendText(text.trim()),setText("")}}
          className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 transition-colors text-white"
        >
          <SendHorizonal className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
