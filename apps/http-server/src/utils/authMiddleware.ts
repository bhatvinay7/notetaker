import { getCookie } from "hono/cookie";
import { Context, Next } from "hono";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { userCredentials } from 'types'
dotenv.config();

const JWT_SECRET = process.env.secret_key!
const authMiddleware = async (c:Context, next: Next) => {
  try {
    if (c.req.path.startsWith('*/api/auth/*')) {
    await next();
  }
    const authHeader = c.req.header("Authorization");
    const cookieToken = await getCookie(c, "token");
    if ((!authHeader || !authHeader.startsWith("Bearer")) && !cookieToken) {
      return c.json({ message: "Unauthorized: Token missing" },401);
    }

    const token = authHeader?.split(" ")[1] || cookieToken as string;
    if(!token){
      return c.json({message:"Token is not set"},401)
    }
    let decoded: any;
    try {
      decoded = jwt.verify(token!, JWT_SECRET) as JwtPayload;
    } catch (error: any) {
      console.error("JWT decode failed:", error);
      return c.json({ message: "Invalid or expired token" },403);
    }

    const user:  userCredentials = {
      userId: decoded.userId,
      username: decoded.username,
      picture: decoded.picture,
      token,
      email: decoded.email,
      isVerified: true,
    };
    c.set("user", user);

    await next();
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    if (error.name === "TokenExpiredError") {
      return c.json({ message: "Token expired" },401);
    }
    return c.json({ message: "Invalid token" },403);
  }
};

export default authMiddleware;
