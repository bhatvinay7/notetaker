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
  }, [response,isLoading])

  return (
    <div className="flex-1 max-h-[75vh]  relative inset-0 top-0 flex flex-col items-center overflow-y-auto custom-scrollbar bg-gray-100 dark:bg-[hsl(210,3%,15%)] p-4 shadow-inner">
      {response && response.length > 0 ? (
        response.map((each, i) => (
          <div
            key={i}
            className="w-full max-w-2xl bg-gray-300/45 dark:bg-[hsl(210,3%,15%)] rounded-md p-4 mb-2"
          >
            <div className=" text-gray-800 dark:text-gray-300/75">
              <ReactMarkdown remarkPlugins={[remarkGfm]}
                      components={{
      ul: ({...props}) => <ul className="list-disc ml-6" {...props} />,
      ol: ({...props}) => <ol className="list-decimal ml-6" {...props} />,
      p:  ({...props}) => <p className=" text-base md:text-lg mb-2" {...props} />,
      li: ({...props}) => <li className="mb-1 leading-snug" {...props} />,
    }}
        skipHtml={false}>
                {each.replace(/\\n\\n/g, "\n") .replace(/\n{2,}/g, "\n\n")}
              </ReactMarkdown>
            </div>
          </div>
        ))
      ) :<></>}
      
       {isLoading ? (
        <div  className='h-auto w-full relative  max-w-2xl flex justify-start '> 

        <div className=" relative  left-0 top-0 p-2 max-w-sm h-15 flex justify-start items-center">
          <Loader className="animate-spin  w-5 h-5 mr-2" />
          <span className="text-black dark:text-gray-300">Processing...</span>
        </div>
        </div>
      ) : null}
      <div ref={bottomRef} />
    </div>
  )
}
