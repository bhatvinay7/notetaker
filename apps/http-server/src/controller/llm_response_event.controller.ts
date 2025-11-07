import {Context} from 'hono'
import prisma from 'prisma'
import { streamSSE, type SSEStream } from 'hono/streaming';
const connectedUsers = new Map<string,SSEStream >();

const storeUserConnection=async(c:Context){
            try{
        return streamSSE(c, async (stream) => {
        connectedUsers.set(userId, stream);
        })
    }
    catch(error:any){
        return c.json({message:"Connection error"})
    }
}
export default storeUserConnection
export {connectedUsers}







