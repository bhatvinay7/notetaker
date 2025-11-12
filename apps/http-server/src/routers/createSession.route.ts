import { Hono } from 'hono';
import   createSession from '../controller/createNewSession.controller.js'  
import   createNote from  '../controller/createNote.controller.js'
const apiRouter = new Hono();
apiRouter.get("/create_session", createSession);
apiRouter.post("/create_note/:sessionId", createNote);
export default apiRouter;