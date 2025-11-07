import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
const userSchema = z.object({
username: z.string().min(3)
email: z.email()
userId: z.string()
picture?: z.string().optional() 
isVerified: z.boolean()
})
const searchNote = async (c: Context){
    try {
        const sessionId=c.req.params("sessionId")
        const userInput=c.req.body
        const session = await prisma.noteSession.findFirst({ where: { id:sessionId, userId: user.userId } })
        if (!session) {
            c.status(400)
            c.json({ message: "session not exists!" })
        }
        const results = await prisma.noteSession.findMany({
            where: {
                id: sessionId
                note: {
                    some: {
                        title: {
                            contains: userInput,
                            mode: 'insensitive',
                        },
                        deleted: false,
                    },
                },
            },
            take: 5,
            include: {
                note: true,
            },
        })
        c.status(200)
        return c.json(results)
    }
    catch (error: any) {
        c.status(500)
        return c.json({ message: "Error occured!" })
    }
}

export default searchNote











