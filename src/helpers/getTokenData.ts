import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getTokenData = async (request: NextRequest) => {
  try {
    const rawToken = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(rawToken, process.env.TOKEN_SECRET!);
    return decodedToken;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
