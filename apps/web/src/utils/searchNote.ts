import axiosPublic from '../lib/axios'
export async function searchNote(text):Promise<>{
     const response= await axiosPublic.get(`/api/searchNote?search=${text}`)
     return  response.data
}