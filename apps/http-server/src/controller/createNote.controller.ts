import { Context } from 'hono'
import prisma from 'prisma'
import * as z from 'zod'
import llmCall from '../agent/agentCall.js'
import { connectedUsers } from './makedNotes.js'
import { userCredentials } from 'types'
const userSchema = z.object({
  username: z.string().min(3),
email: z.email(),
userId: z.string(),
picture: z.string(),
isVerified: z.boolean()
})
 interface response {
  title: string,
  topic: string,
  content: string,
}
async function sleep(ms:number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const createNote = async(c: Context)=>{
  try{
    const user: z.infer<typeof userSchema>=c.get("user") as userCredentials
const result = userSchema.safeParse(user);
if (!result?.success) {
  return c.json({ message: "user is unauthenticated" },400)
} else {
  const sessionId = decodeURIComponent(c.req.param("sessionId"))
  const body:{userPromt:string} =await c.req.json()
  const llmResponse:string= await llmCall(body.userPromt!)
  const message:response=JSON.parse(llmResponse ? llmResponse: `{}`)
  if(!message.title && !message.content && !message.topic){
  return c.json({message:"Error occured"},500)
}

  if (!sessionId && !body.userPromt!) {
  
    return c.json({ message: "session id or input is not provided" },400)
  }
  const session = await prisma.noteSession.findFirst({ where: { id: sessionId, userId: user.userId } })
  if (!session) {
    return c.json({ message: "provided sessionId not belongs to this user" },400)
  }
  if (!session.topic) {
    const newSession = await prisma.noteSession.update({
      where:{
        userId: user.userId,
        id:session.id
      },
      data: {
        topic: message.topic
      }
    })
  }
  const newNote = await prisma.note.create({
    data: {
      title: message.title,
      summary: message.content,
      sessionId: session.id
    }
  })
  return  c.json(llmResponse,201)
}

    }
    catch (error: any) {
      console.log(error)
  return c.json({ message: "Unexpected Error Occured" },500)
}
  }

export default createNote