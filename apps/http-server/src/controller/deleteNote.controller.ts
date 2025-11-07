import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
import { connectedUsers } from './llm_response_event.controller.js'
const userSchema = z.object({
    username: z.string().min(3)
email: z.email()
userId: z.string()
picture?: z.string().optional() 
isVerified: z.boolean()
})

const deleteNote = async(c: Context){
    try{
        const user: z.infer<typeof userSchema>=c.get("user")
const result = userSchema.safeParse(user);
if (!result.success) {
    c.state(400)
    return c.json({ message: "user is unauthenticated" })
} else {
    const { sessionId, noteId } = c.req.params();

    if (!sessionId! || !noteId) {
        c.status(400)
        return c.json({ message: "session id or noteIdt is not provided" })
    }
    const session = await prisma.noteSession.findFirst({ where: {id:sessionId,userId: user.userId } })
    if (!session) {
        c.status(400)
        return c.json({ message: "provided sessionId not belongs to this user" })
    }
    try {
        const result = await prisma.note.update({
            where: {
                id: noteId,
                sessionId: session.id,
            },
            data: {
                delete: true
            },
        })
    }
    catch (error: any) {
        c.status(400)
        c.json({ message: "Error while deleting the note!" })
    }
}
c.status(200)
return c.json({ message: "note is sucessfully deleated" })
}
    catch (error: any) {
    c.status(500)
    return c.json({ message: "Unexpected Error Occured" })
}
}

export default deleteNote