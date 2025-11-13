import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
import { userCredentials } from 'types'
const userSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    userId: z.string(),
    picture: z.string(),
    isVerified: z.boolean()
})
const searchNote = async (c: Context) => {
    try {
        const user = c.get("user") as userCredentials
        const userInput = c.req.query("search")
        if (!user.userId || !userInput) {
            c.status(400)
            c.json({ message: "session ID or input is not provided " })
        }
        const results = await prisma.noteSession.findMany({
            where: {
                userId: user.userId,
                note: {
                    some: {
                        title: {
                            contains: userInput,
                            mode: 'insensitive',
                        },
                        deleated: false,
                    },
                },
            },
            take: 5,
            select: {
                note: {
                    where: {
                        title: {
                            contains: userInput,
                            mode: 'insensitive',
                        },
                        deleated: false,
                    },
                    select: {
                        id: true,
                        title: true
                    },
                },
            },
        })
        return c.json(results?.[0]?.note ?? [], 200)
    }
    catch (error: any) {
        return c.json({ message: "Error occured!" }, 500)
    }
}

export default searchNote