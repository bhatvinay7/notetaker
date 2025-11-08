import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
import llmCall from '../agent/agentCall.js'
import { connectedUsers } from './llm_response_event.controller.js'
const userSchema = z.object({
  username: z.string().min(3)
email: z.email()
userId: z.string()
picture?: z.string().optional() 
isVerified: z.boolean()
})


async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}


const createNote = async(c: Context){
  try{
    const user: z.infer<typeof userSchema>=c.get("user")
const result = userSchema.safeParse(user);
if (!result.success) {
  c.state(400)
  return c.json({ message: "user is unauthenticated" })
} else {
  const sessionId = c.req.params("sessionId")
  const body = await c.req.json();
  if (!sessionId || !body.userPromt!) {
    c.status(400)
    return c.json({ message: "session id or input is not provided" })
  }
  const session = await prisma.noteSession.findFirst({ where: { id: sessionId, userId: user.userId } })
  if (!session) {
    c.status(400)
    return c.json({ message: "provided sessionId not belongs to this user" })
  }
  const message = await llmCall(body.userPromt!)
  if (!session.topic) {
    const newSession = await prisma.noteSession.update({
      data: {
        topic: message.topic,
        userId: user.userId
      }
    })
  }
  const newNote = await prisma.noteSession.create({
    data: {
      title: message.title,
      summary: message.summary,
      noteId: session.Id
    }
  })
  
  try {
    await connectedUsers.get(user.userId!).writeSSE({ data: message.summary, event: 'connection-established' });
    while (true) {
      await sleep(1000 * 60);
      const stream = connectedUsers.get(user.userId!);
      if (!stream) {
      console.log(`User ${user.userId} disconnected`);
      break;
    }
    }
  } catch (error) {
    connectedUsers.delete(userId);

  }
}
    }
    catch (error: any) {
  c.status(500)
  return c.json({ message: "Unexpected Error Occured" })
}
}

export default createNote