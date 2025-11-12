import { Hono } from 'hono';
import   callbackHandler from '../controller/createUserRedirect.controller.js'
import googleauth  from '../controller/user_Auth_Redirect.controller.js'
const apiRouter = new Hono()
apiRouter.get("/callback/google",callbackHandler);
apiRouter.get("/googleAuth",googleauth);
export default apiRouter;
