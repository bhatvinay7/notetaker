'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { useState, useEffect,useRef } from 'react'
import ChatWindow from '../../../../components/ui/chat_window'
import ChatInput from '../../../../components/ui/chat_input'
import { createNote } from '../../../../utils/createNote'
import Toggle_dark_mode from '../../../../components/ui/toggle_dark_mode'
const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!

export default function Page() {
  const params=useParams<{id:string}>()
  const [response,setResponse]=useState<string[]>("")
  const [isLoader ,setLoader]=useState<boolean>(false)
async function sendText(text:string){
  try{
  setLoader(true)
  const response=await createNote(params.id,{userPromt:text})
  const data=JSON.parse(response)
   setResponse((priv)=>([...priv,data.content]))
   setLoader(false)
  }
  catch(error:any){
  }
}
    return (
    <div className=" flex h-[calc(100%-72px)] sm:h-screen flex-col relative z-30  overflow-y-auto space-y-5  bg-gray-200 dark:bg-gray-900">
      <div className='w-full h-16 bg-gray-200 dark:bg-gray-800 p-3 hidden sm:block sticky top-0'>
       <div className='w-fit absolute right-2 '>
      <Toggle_dark_mode/>
       </div>
      </div>
      <ChatWindow
      response={response}
      isLoading={isLoader}
      />
      <ChatInput
      sendText={sendText}
      />
    </div>
    )
  }