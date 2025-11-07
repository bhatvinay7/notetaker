import { Context } from "hono";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI!;
async function getData(c: Context) {
  const { code } = c.req?.query;

  if (!code || typeof code !== "string") {
    c.status(400);
    return c.json({ message: "Missing code parameter" });
  }
  // Exchange code for access token
  const data = new URLSearchParams({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    redirect_uri: REDIRECT_URI,
    grant_type: "authorization_code",
  }).toString(); // URLSearchParams automatically sets the correct Content-Type header

  const tokenResponse = await axios.post(
    "https://oauth2.googleapis.com/token",
    data, // Pass the URL-encoded string as the body
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded", // Explicitly set the header (though URLSearchParams might handle this)
      },
    }
  );

  const { access_token, id_token } = tokenResponse.data;

  const userResponse = await axios.get(
    "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
    {
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  return userResponse.data;
}

export default getData;
