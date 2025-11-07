import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { prettyJSON } from 'hono/pretty-json'
import { serve } from '@hono/node-server'
import sessionRouter from './routers/createSession.route.js'
import eventRouter from './routers/eventController.route.js'
import noteOperationRouter from './routers/noteOperation.route.js'
import authRouter from  './routers/userAuth.route.js' 
import middleware from './utils/authMiddleware.js'
const app = new Hono()
app.use(
  '*',
  cors({
    origin: (origin) => {
      const allowed = ['http://localhost:3000']
      if (origin && allowed.includes(origin)) return origin
    },
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
)

app.use('*', prettyJSON())
app.route('/api', authRouter)
app.route(middleware)
app.route('/api', sessionRouter)
app.route('/api', eventRouter)
app.route('/api', noteOperationRouter)

const port = 3001
console.log(`Server running on port ${port}`)
serve({ fetch: app.fetch, port })
