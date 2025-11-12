import jwt from "jsonwebtoken";
import {Context} from 'hono'
import getUserdata from "../utils/googleAuthData.js";
import { setCookie } from 'hono/cookie';
import prisma from 'prisma'
const SECRET_KEY = process.env.secret_key!;
const ACCESS_KEY = process.env.access_key!;
const callbackHandler = async (c:Context) => {
  try {
    const user = await getUserdata(c);
    if (!user?.email) {
      return c.json({ message: "Invalid user data" },400);
    }
    let new_user: any
    new_user = await prisma.user.findFirst({
     where:{
     email: user.email
     } });
  if (!new_user) {
  new_user = await prisma.user.create({
    data: {
      name: user.name,
      email: user.email,
      refreshToken: ""
    },
  });
  }
      const refreshToken = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: new_user.id!,
        picture: user.picture,
        isVerified: true,
      },
      SECRET_KEY,
      { expiresIn: "24d" }
    );
    const acces_token = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: new_user.id!,
        picture: user.picture,
        isVerified: true,
      },
      ACCESS_KEY,
      { expiresIn: "7d" }
    );

  const updateUser=await prisma.user.update({
    where:{
      id:new_user.id!
    },
    data:{
      refreshToken:refreshToken
    }
  })  
  setCookie(c,"token",refreshToken, {
  httpOnly: true,
  secure: true,
  sameSite: "None",
  maxAge: 6*24*60*60,
  path:"/"
});
  return c.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL!}`);
  } catch (error: any) {
    console.error("OAuth Error:", error.message);
    return c.json({ message: "OAuth error", error: error.message },500);
  }
};

export default callbackHandler;
