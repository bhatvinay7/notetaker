import axiosPublic from '../lib/axios'
export async function deleteNote(sessionId:string,noteId:string):Promise<any>{
     const response= await axiosPublic.post(`/api/deleteNote/${encodeURIComponent(sessionId)}/${encodeURIComponent(noteId)}`)
     return response
}