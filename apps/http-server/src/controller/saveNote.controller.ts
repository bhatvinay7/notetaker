import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
import { connectedUsers } from './makedNotes.js'
import { userCredentials } from 'types'
const userSchema = z.object({
    username: z.string().min(3),
email: z.email(),
userId: z.string(),
picture: z.string(),
isVerified: z.boolean()
})

const saveNote = async(c: Context)=>{
    try{
        const user: z.infer<typeof userSchema>=c.get("user") as userCredentials
const result = userSchema.safeParse(user);
if (!result.success) {
    return c.json({ message: "user is unauthenticated" },400)
} else {
    const id = c.req.param("Id")
    const body = await c.req.json();
    if (!id || !body.summary!) {
        return c.json({ message: "session id or input is not provided" },400)
    }
    const session = await prisma.noteSession.findFirst({ where: { id:id,userId: user.userId } })
    if (!session) {
        return c.json({ message: "provided sessionId not belongs to this user" },400)
    }
    const newNote = await prisma.note.create({
        data: {
            title: body.title!,
            summary: body.summary!,
            sessionId: session.id
        }
    })
}
    }
    catch (error: any) {
    return c.json({ message: "Unexpected Error Occured" },500)
}
}

export default saveNote