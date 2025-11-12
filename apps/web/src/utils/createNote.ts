import axiosPublic from '../lib/axios'

export async function createNote(sessionId:string,body:{userPromt:strimg}):Promise<any>{
        const response= await axiosPublic.post(`/api/create_note/${encodeURIComponent(sessionId)}`,body)
     return  response.data
}