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

const saveNote = async(c: Context){
    try{
        const user: z.infer<typeof userSchema>=c.get("user")
const result = userSchema.safeParse(user);
if (!result.success) {
    c.state(400)
    return c.json({ message: "user is unauthenticated" })
} else {
    const id = c.req.params("Id")
    const body = await c.req.json();
    if (!id || !body.summary!) {
        c.status(400)
        return c.json({ message: "session id or input is not provided" })
    }
    const session = await prisma.noteSession.findFirst({ where: { userId: user.userId } })
    if (!session) {
        c.status(400)
        return c.json({ message: "provided sessionId not belongs to this user" })
    }
    const newNote = await prisma.noteSession.create({
        data: {
            title: body.title!,
            summary: body.summary!,
            noteId: session.Id
        }
    })
}
    }
    catch (error: any) {
    c.status(500)
    return c.json({ message: "Unexpected Error Occured" })
}
}

export default saveNote