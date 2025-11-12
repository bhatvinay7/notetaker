import { Hono } from 'hono';
import   storeUserConnection from '../controller/makedNotes.js'  
const apiRouter = new Hono()
apiRouter.get("/stream", storeUserConnection);
export default apiRouter;