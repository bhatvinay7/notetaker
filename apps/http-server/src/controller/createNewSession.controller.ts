import {Context} from 'hono'
import prisma from 'prisma'
import dotenv from 'dotenv'
import { userCredentials } from 'types'
dotenv.config();
import { JwtPayload } from "jsonwebtoken";
const host=process.env.NEXT_PUBLIC_FRONTEND_URL!
const createSession=async(c:Context)=>{
    try{
        const user=c.get("user") as  userCredentials
        if(!user.userId){
            return c.json({message:"authenticated"},401)
        }
        const newSession=await prisma.noteSession.create({
            data:{
                topic:"",
                userId:user.userId
            }
        })
    return c.json({url:`${host}/dashboard/n/${newSession.id}`},201)
    }
    catch(error:any){
        console.log(error)
        return c.json({message:"Unexpected Error Occured"},500)
    }
}

export default createSession