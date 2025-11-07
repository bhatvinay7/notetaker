import {Context} from 'hono'
import prisma from 'prisma'
import dotenv from 'dotenv'
dotenv.config();
const host=process.env.NEXT_PUBLIC_FRONTEND_URL!
const createSession=async(c:Context){
    try{
        const user=c.get("user")
        if(!user){
            c.status(401)
            return createSession.json({message:"authenticated"})
        }
        const newSession=await prisma.noteSession.create({
            data:{
                topic:"",
                userId:user.userId
            }
        })
    c.status(302)
    c.redirect(`${host}/n/${newSession.id}`)
    }
    catch(error:any){
        c.status(500)
        return c.json({message:"Unexpected Error Occured"})
    }
}

export default createSession