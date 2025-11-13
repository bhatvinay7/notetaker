import { Context } from 'hono'
const connectedUsers = new Map<string, ReadableStreamDefaultController<string>>()

const storeUserConnection = async (c: Context) => {
  const user = c.get('user')

  if (!user?.userId) {
    return c.json({ message: 'User ID not available' }, 400)
  }

  const stream = new ReadableStream({
    start(controller: ReadableStreamDefaultController<string>) {
      connectedUsers.set(user.userId, controller)

      // Handle disconnects
      c.req.raw.signal.addEventListener('abort', () => {
        console.log(`User ${user.userId} disconnected`)
        connectedUsers.delete(user.userId)
        controller.close()
      })
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}

export default storeUserConnection
export { connectedUsers }
