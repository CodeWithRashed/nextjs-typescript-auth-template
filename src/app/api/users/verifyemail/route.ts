import User from "@/models/userModels";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const user = await User.findOne({verifyToken: reqBody.token, verifyTokenExpiry: {$gt: Date.now()}})
    if(!user){
        return NextResponse.json({message: "Invalid Token"}, {status: 400})
    }


  } catch (err: any) {
    return NextResponse.json(
      {
        error: err.message,
      },
      { status: 500 }
    );
  }
}
