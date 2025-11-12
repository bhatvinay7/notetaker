import axiosPublic from '../lib/axios'
export async function saveNote(body,sessionId:string):Promise<>{
     const response= await axiosPublic.post(`/api/saveNote/${encodeURIComponent(sessionId)}`,body)
     return  response
}