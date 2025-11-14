import axiosPublic from '../lib/axios'
interface searchNotes{
     id:string,
     title:string,
}
export async function searchNote(text):Promise<searchNotes[]>{
     const response= await axiosPublic.get(`/api/searchNote?search=${text}`)
     return  response.data as searchNotes[]
}