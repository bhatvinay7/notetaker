import axiosPublic from '../lib/axios'
interface llmResponse{
        title:string,
        content:string,
        topic:string
}
export async function createNote(sessionId:string,body:{userPromt:strimg}):Promise<llmResponse>{
        const response= await axiosPublic.post(`/api/create_note/${encodeURIComponent(sessionId)}`,body)
     return  response.data as llmResponse
}