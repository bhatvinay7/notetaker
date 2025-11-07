import { Hono } from 'hono';
import   storeUserConnection from '../controller/deleteNote.controller.js'  
const apiRouter = new Hono()
apiRouter.get("/eventStream", storeUserConnection);
export default apiRouter;