import axiosPublic from '../lib/axios'
interface  response{
     message:string
}
export async function deleteNote(sessionId:string,noteId:string):Promise<response>{
     const response= await axiosPublic.post(`/api/deleteNote/${encodeURIComponent(sessionId)}/${encodeURIComponent(noteId)}`)
     return response.data as response
}