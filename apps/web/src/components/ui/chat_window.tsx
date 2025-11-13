'use client'
import React, { useRef, useEffect } from 'react'
import { Loader } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ChatWindowProps {
  response: string[]
  isLoading: boolean
}

export default function ChatWindow({ response, isLoading }: ChatWindowProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [response])

  return (
    <div className="flex-1 max-h-[75vh] relative inset-0 top-0 flex flex-col items-center custom-scrollbar bg-gray-100 dark:bg-gray-900 p-4 shadow-inner">
      {response && response.length > 0 ? (
        response.map((each, i) => (
          <div
            key={i}
            className="w-full max-w-2xl bg-gray-300/45 dark:bg-gray-700/25 rounded-md p-4 mb-2"
          >
            <div className="whitespace-pre-wrap text-gray-800 dark:text-gray-300/75">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {each}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) :<></>}
      
       {isLoading ? (
        <div className=" stickt self-start left-0 top-0 p-2 max-w-sm flex justify-center items-center">
          <Loader className="animate-spin w-5 h-5 mr-2" />
          <span className="text-black dark:text-gray-200">Processing...</span>
        </div>
      ) : null}
      <div ref={bottomRef} />
    </div>
  )
}
