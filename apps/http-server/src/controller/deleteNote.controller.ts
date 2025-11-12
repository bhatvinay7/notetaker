import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
import { userCredentials } from 'types'
import { connectedUsers } from './makedNotes.js'
const userSchema = z.object({
    username: z.string().min(3),
email: z.email(),
userId: z.string(),
picture: z.string(),
isVerified: z.boolean()
})

const deleteNote = async(c: Context)=>{
    try{
        const user: z.infer<typeof userSchema>=c.get("user") as userCredentials
const result = userSchema.safeParse(user);
if (!result.success) {
    return c.json({ message: "user is unauthenticated" },400)
} else {
    const { sessionId, noteId } = c.req.param();

    if (!sessionId! || !noteId) {
        return c.json({ message: "session id or noteIdt is not provided" },400)
    }
    const session = await prisma.noteSession.findFirst({ where: {id:decodeURIComponent(sessionId),userId: decodeURIComponent(user.userId) } })
    if (!session) {
        return c.json({ message: "provided sessionId not belongs to this user" },400)
    }
    try {
        const result = await prisma.note.update({
            where: {
                id: noteId,
                sessionId: session.id,
            },
            data: {
                deleated: true
            },
        })
    }
    catch (error: any) {
        c.json({ message: "Error while deleting the note!" },400)
    }
}
return c.json({ message: "note is sucessfully deleated" },200)
}
    catch (error: any) {
    return c.json({ message: "Unexpected Error Occured" },500)
}
}

export default deleteNote