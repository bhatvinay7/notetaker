import axiosPublic from '../lib/axios'
export async function createSession():Promise<{url:message}>{
     const response= await axiosPublic.get('/api/create_session')
     return  (response.data as {url:string}).url 
}