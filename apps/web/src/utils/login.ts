import axiosPublic from '../lib/axios'
export async function userLogin():Promise<>{
     const response= await axiosPublic.get('/api/auth/googleAuth')
     return response 
}