import { Contex } from 'hono'
import z from 'zod'
const userSchema = z.object({
    username: z.string().min(3)
email: z.email()
userId: z.string()
picture?: z.string().optional() 
isVerified: z.boolean()
})

const getNote = async (c: Context) => {
    try {
        const user: z.infer<typeof userSchema> = c.get("user")
        const noteId = c.req.query.get("noteId")
        const sessionId = c.req.params("sessionId")

        if (!noteId || !sessionId || !user) {
            c.status(400)
            return c.json({ message: "note id not found!" })
        }

        const note = await prisma.noteSession.findFirst({
            where: {
                id: sessionId,
                userId: user.userId,
                note: {
                    some: {
                        id: noteId
                        deleted: false
                    },
                },
            },
            include: {
                note: true
            }
        })
    }
    catch (error: any) {
        c.status(500)
        return c.json({ message: "Unexpected Error Occured" })
    }

}

export default getNote