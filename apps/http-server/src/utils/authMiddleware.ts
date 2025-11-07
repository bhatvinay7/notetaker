import { getCookie } from 'hono/cookie';
import {Context,Next} from 'hono'
import jwt, { JwtPayload } from "jsonwebtoken";
import { userCredentials } from "types";
import dotenv from 'dotenv'
dotenv.config()
const JWT_SECRET = process.env.secret_key!;
export interface Auth extends Context{
  user?:
    | {
        userId: string;
        username: string;
        picture: string;
        token: string;
        isVerified: boolean;
      }
    | JwtPayload;
}
export const authMiddleware = async (c:Auth, next: Next) => {
  try {
    const authHeader = c.req.header('Authorization');
    const cookieToken = getCookie(c, 'token');
    if ((!authHeader || !authHeader.startsWith("Bearer")) && !cookieToken) {
      c.status(401)  
      return c.json({ message: "Unauthorized: Token missing" });
    }
    const token = authHeader?.split(" ")[1] || cookieToken;
    const decoded = jwt.verify(token!, JWT_SECRET) as userCredentials;
    catch(error:any){
      console.log(error)
      c.status(403)
     return c.json({message:"some user credentials are missing"})
    }
    const user = {
        userId: decoded?.userId,
        username: decoded?.username,
        picture: decoded?.picture,
        token: token,
        email: decoded.email,
        isVerified: true,
    };
   c.set('user', user); 
    
    next();  
  } 
  catch (error: any) {
    console.error("JWT verification failed:", error.message);

    if (error.name === "TokenExpiredError") {
        c.status(401)
      return c.json({ message: "Token expired" });
    }
     c.status(403)
    return c.json({ message: "Invalid token" });
  }
}