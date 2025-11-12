import { Hono } from 'hono';
import   deleteNote from '../controller/deleteNote.controller.js'  
import   {getNotes,getAllNotes,getNote} from  '../controller/getNotes.controller.js'
import   saveNote from '../controller/saveNote.controller.js'
import   searchNote from '../controller/searchNote.controller.js'
const apiRouter = new Hono();
apiRouter.post("/deleteNote/sessionid/:noteId", deleteNote);
apiRouter.post("/saveNote/:Id", saveNote);
apiRouter.get("/searchNote", searchNote);
apiRouter.get("/getNote/:noteId",getNote)
apiRouter.get("/getNotes", getAllNotes);
export default apiRouter;