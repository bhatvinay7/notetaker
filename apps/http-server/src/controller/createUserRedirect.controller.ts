import jwt from "jsonwebtoken";
import getUserdata from "../utils/getUserdata.js";
import prisma from "prisma";
const SECRET_KEY = process.env.secret_key!;
const ACCESS_KEY = process.env.access_key!;
const callbackHandler = async (c) => {
  try {
    const data = await getUserdata(c);
    if (!data?.email) {
      c.status(400);
      return c.json({ message: "Invalid user data" });
    }
    let user: any;
    const refreshToken = jwt.sign(
      {
        username: user.name!,
        email: user.email!,
        userId: user.id,
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
        userId: user.id,
        picture: user.picture,
        isVerified: true,
      },
      ACCESS_KEY,
      { expiresIn: "7d" }
    );

    user = await prisma.user.findFirst({ email: email });
    if (!user) {
      user = await prisma.User.create({
        data: {
          name: data.name,
          email: data.email,
          refreshToken: refreshToken
        },
      });
    }

    c.cookie("token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    res.redirect(`${process.env.NEXT_PUBLIC_FRONTEND_URL}`);
  } catch (error: any) {
    console.error("OAuth Error:", error.message);
    c.status(500);
    return c.json({ message: "OAuth error", error: error.message });
  }
};

export default callbackHandler;
