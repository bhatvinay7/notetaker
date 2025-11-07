import { Hono } from 'hono';
import   deleteNote from '../controller/deleteNote.controller.js'  
import   getNote from  '../controller/getNotes.controller.js'
import   saveNote from '../controller/saveNote.controller.js'
import   searchNote from '../controller/searchNote.controller.js'
const apiRouter = new Hono();
apiRouter.post("/deleteNote", deleteNote);
apiRouter.post("/getNote", getNote);
apiRouter.post("/saveNote", saveNote);
apiRouter.get("/seachNote", searchNote);
export default apiRouter;