import axiosPublic from '../lib/axios'
import { userCredentials } from 'types'
export async function getUserData():Promise<userCredentials> {
    const response=await axiosPublic.get(`/api/analytics/getAdmindata`)
    return response.data as userCredentials
}