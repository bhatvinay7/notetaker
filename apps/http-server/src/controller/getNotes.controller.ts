import { Context } from 'hono'
import z from 'zod'
import prisma from "prisma"
import { userCredentials } from 'types'
const userSchema = z.object({
    username: z.string().min(3),
email: z.email(),
userId: z.string(),
picture: z.string(),
isVerified: z.boolean()
})

const getNotes = async (c: Context) => {
    try {
        const user: z.infer<typeof userSchema> = c.get("user") as userCredentials 
        const noteId = decodeURIComponent(c.req.query("noteId")!)
        const sessionId = decodeURIComponent(c.req.param("sessionId"))

        if (!noteId || !sessionId || !user) {
            return c.json({ message: "note id not found!" },400)
        }

        const note = await prisma.noteSession.findFirst({
            where: {
                id: sessionId,
                userId: user.userId,
                note: {
                    some: {
                        id: noteId,
                        deleated: false
                    },
                },
            },
            include: {
                note: true
            }
        })
    }
    catch (error: any) {
        return c.json({ message: "Unexpected Error Occured" },500)
    }

}



const getAllNotes =async(c:Context)=>{
    try{
        const user=c.get("user")
        if(!user.userId){
            return c.json({message:"userId is not provided "})
        }
        const userNotes = await prisma.noteSession.findMany({
            where: {
                userId: user.userId,
                note: {
                some: { deleated: false },
                },
            },
            include: {
                note: {
                    where:{
                        deleated: false
                    },
                    select: {
                        id: true,
                        title: true,
                        createdAt: true,
                        summary: false,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        
        const notes = userNotes.map((session) => session.note);
        
        if (!notes || notes.length === 0) {
            return c.json([] , 200);
    }
    
    return c.json(notes?.[0], 200);
}

catch(error:any){
    return c.json({message:"sever error"},500)
}

}

const getNote=async(c:Context)=>{
    try{
    const user=c.get("user")
    if(!user.userId){
     return c.json({message:"userId is not provided "})
    }
    const noteId=decodeURIComponent(c.req.param("noteId"))
    if(!noteId){
       return  c.json({message:"noteId is not provide"})
    }
    const note=await prisma.note.findFirst({
        where:{
            id:noteId,
        },
        select:{
            id:true,
            summary:true,
            title:true,
            createdAt:true
        }
    })
  return c.json(note, 200);
    }
    catch(error){
      return  c.json({message:"server error"},500)
    }
}
export {getNotes,getAllNotes,getNote}